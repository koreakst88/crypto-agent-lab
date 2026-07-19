import type {
  IndicatorCalculationContract,
  IndicatorCalculationRequest,
  IndicatorCalculationResult,
} from "../../../core/contracts";
import type {
  Indicator,
  IndicatorMeasurement,
  MarketDataset,
  OhlcvCandle,
} from "../../../core/domain";
import { smaDefinition } from "./sma-definition";
import type { SmaParameters } from "./sma-parameters";

const isValidPeriod = (period: number): boolean =>
  Number.isSafeInteger(period) && period > 0;

type LocalDecimal = {
  readonly coefficient: bigint;
  readonly scale: number;
};

const SMA_SIGNIFICANT_DIGITS = 34;

const powerOfTen = (exponent: number): bigint => 10n ** BigInt(exponent);

const parseDecimal = (value: string): LocalDecimal => {
  const negative = value.startsWith("-");
  const unsignedValue = negative ? value.slice(1) : value;
  const decimalPoint = unsignedValue.indexOf(".");
  const integerPart =
    decimalPoint === -1 ? unsignedValue : unsignedValue.slice(0, decimalPoint);
  const fractionalPart =
    decimalPoint === -1 ? "" : unsignedValue.slice(decimalPoint + 1);
  const coefficient = BigInt(`${integerPart}${fractionalPart}`);

  return {
    coefficient: negative ? -coefficient : coefficient,
    scale: fractionalPart.length,
  };
};

const addDecimals = (
  left: LocalDecimal,
  right: LocalDecimal,
): LocalDecimal => {
  const scale = Math.max(left.scale, right.scale);
  const leftCoefficient =
    left.coefficient * powerOfTen(scale - left.scale);
  const rightCoefficient =
    right.coefficient * powerOfTen(scale - right.scale);

  return {
    coefficient: leftCoefficient + rightCoefficient,
    scale,
  };
};

const decimalOrder = (numerator: bigint, denominator: bigint): number => {
  const numeratorDigits = numerator.toString().length;
  const denominatorDigits = denominator.toString().length;
  const candidate = numeratorDigits - denominatorDigits;
  const belowCandidatePower =
    candidate >= 0
      ? numerator < denominator * powerOfTen(candidate)
      : numerator * powerOfTen(-candidate) < denominator;

  return belowCandidatePower ? candidate - 1 : candidate;
};

const roundHalfEven = (numerator: bigint, denominator: bigint): bigint => {
  const quotient = numerator / denominator;
  const remainder = numerator % denominator;
  const comparison = remainder * 2n - denominator;

  if (comparison > 0n || (comparison === 0n && quotient % 2n !== 0n)) {
    return quotient + 1n;
  }

  return quotient;
};

const divideDecimal = (value: LocalDecimal, divisor: bigint): LocalDecimal => {
  if (value.coefficient === 0n) {
    return { coefficient: 0n, scale: 0 };
  }

  const negative = value.coefficient < 0n;
  const numerator = negative ? -value.coefficient : value.coefficient;
  const denominator = divisor * powerOfTen(value.scale);
  const order = decimalOrder(numerator, denominator);
  const outputScale = SMA_SIGNIFICANT_DIGITS - 1 - order;
  const roundedCoefficient =
    outputScale >= 0
      ? roundHalfEven(
          numerator * powerOfTen(outputScale),
          denominator,
        )
      : roundHalfEven(
          numerator,
          denominator * powerOfTen(-outputScale),
        ) * powerOfTen(-outputScale);

  return {
    coefficient: negative ? -roundedCoefficient : roundedCoefficient,
    scale: outputScale >= 0 ? outputScale : 0,
  };
};

const formatDecimal = ({ coefficient, scale }: LocalDecimal): string => {
  if (coefficient === 0n) {
    return "0";
  }

  const negative = coefficient < 0n;
  const digits = (negative ? -coefficient : coefficient).toString();
  const sign = negative ? "-" : "";

  if (scale === 0) {
    return `${sign}${digits}`;
  }

  const paddedDigits = digits.padStart(scale + 1, "0");
  const decimalPoint = paddedDigits.length - scale;
  const integerPart = paddedDigits.slice(0, decimalPoint);
  const fractionalPart = paddedDigits
    .slice(decimalPoint)
    .replace(/0+$/, "");

  return fractionalPart.length === 0
    ? `${sign}${integerPart}`
    : `${sign}${integerPart}.${fractionalPart}`;
};

const calculateAverage = (
  candles: readonly OhlcvCandle[],
  endIndex: number,
  period: number,
): string => {
  let sum: LocalDecimal = { coefficient: 0n, scale: 0 };
  const startIndex = endIndex - period + 1;

  for (let index = startIndex; index <= endIndex; index += 1) {
    sum = addDecimals(sum, parseDecimal(candles[index].close));
  }

  return formatDecimal(divideDecimal(sum, BigInt(period)));
};

const createInput = (dataset: MarketDataset) => ({
  datasetId: dataset.datasetId,
  usedRange: {
    start: dataset.series.candles[0].openTime,
    end: dataset.series.candles[dataset.series.candles.length - 1].closeTime,
  },
});

const createCalculatedIndicator = (
  dataset: MarketDataset,
  parameters: SmaParameters,
): Indicator => {
  const measurements: IndicatorMeasurement[] = dataset.series.candles.map(
    (candle, index) => {
      if (index < parameters.period - 1) {
        return {
          availability: "unavailable",
          timestamp: candle.closeTime,
          reason: "insufficient-history",
        };
      }

      return {
        availability: "available",
        timestamp: candle.closeTime,
        value: {
          kind: "numeric",
          value: calculateAverage(
            dataset.series.candles,
            index,
            parameters.period,
          ),
        },
      };
    },
  );

  return {
    definition: smaDefinition,
    parameters: { period: parameters.period },
    input: createInput(dataset),
    availability: "available",
    series: measurements,
  };
};

const calculate = ({
  dataset,
  parameters,
}: IndicatorCalculationRequest<SmaParameters>): IndicatorCalculationResult => {
  if (!isValidPeriod(parameters.period)) {
    return {
      outcome: "failure",
      valueState: "absent",
      reason: { kind: "invalid-parameters" },
    };
  }

  const canonicalParameters = { period: parameters.period };

  if (dataset.series.candles.length < canonicalParameters.period) {
    return {
      outcome: "success",
      valueState: "present",
      value: {
        definition: smaDefinition,
        parameters: canonicalParameters,
        input: createInput(dataset),
        availability: "unavailable",
        reason: "insufficient-history",
      },
    };
  }

  return {
    outcome: "success",
    valueState: "present",
    value: createCalculatedIndicator(dataset, canonicalParameters),
  };
};

export const smaCalculator: IndicatorCalculationContract<SmaParameters> =
  Object.freeze({
    definition: smaDefinition,
    calculate,
  });
