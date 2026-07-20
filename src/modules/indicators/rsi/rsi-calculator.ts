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
import { rsiDefinition } from "./rsi-definition";
import type { RsiParameters } from "./rsi-parameters";

const isValidPeriod = (period: number): boolean =>
  Number.isSafeInteger(period) && period > 0;

type LocalDecimal = {
  readonly coefficient: bigint;
  readonly scale: number;
};

type RsiState = {
  readonly averageGain: LocalDecimal;
  readonly averageLoss: LocalDecimal;
};

const RSI_SIGNIFICANT_DIGITS = 34;

const zeroDecimal = (): LocalDecimal => ({ coefficient: 0n, scale: 0 });

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

const subtractDecimals = (
  left: LocalDecimal,
  right: LocalDecimal,
): LocalDecimal =>
  addDecimals(left, {
    coefficient: -right.coefficient,
    scale: right.scale,
  });

const multiplyDecimal = (
  value: LocalDecimal,
  multiplier: bigint,
): LocalDecimal => ({
  coefficient: value.coefficient * multiplier,
  scale: value.scale,
});

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

const roundRatio = (numerator: bigint, denominator: bigint): LocalDecimal => {
  if (numerator === 0n) {
    return zeroDecimal();
  }

  const negative = (numerator < 0n) !== (denominator < 0n);
  const absoluteNumerator = numerator < 0n ? -numerator : numerator;
  const absoluteDenominator = denominator < 0n ? -denominator : denominator;
  const order = decimalOrder(absoluteNumerator, absoluteDenominator);
  const outputScale = RSI_SIGNIFICANT_DIGITS - 1 - order;
  const roundedCoefficient =
    outputScale >= 0
      ? roundHalfEven(
          absoluteNumerator * powerOfTen(outputScale),
          absoluteDenominator,
        )
      : roundHalfEven(
          absoluteNumerator,
          absoluteDenominator * powerOfTen(-outputScale),
        ) * powerOfTen(-outputScale);

  return {
    coefficient: negative ? -roundedCoefficient : roundedCoefficient,
    scale: outputScale >= 0 ? outputScale : 0,
  };
};

const divideByInteger = (
  value: LocalDecimal,
  divisor: bigint,
): LocalDecimal =>
  roundRatio(value.coefficient, divisor * powerOfTen(value.scale));

const divideDecimals = (
  numerator: LocalDecimal,
  denominator: LocalDecimal,
): LocalDecimal =>
  roundRatio(
    numerator.coefficient * powerOfTen(denominator.scale),
    denominator.coefficient * powerOfTen(numerator.scale),
  );

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

const separateChange = (
  currentClose: string,
  previousClose: string,
): { readonly gain: LocalDecimal; readonly loss: LocalDecimal } => {
  const change = subtractDecimals(
    parseDecimal(currentClose),
    parseDecimal(previousClose),
  );

  if (change.coefficient > 0n) {
    return { gain: change, loss: zeroDecimal() };
  }

  if (change.coefficient < 0n) {
    return {
      gain: zeroDecimal(),
      loss: { coefficient: -change.coefficient, scale: change.scale },
    };
  }

  return { gain: zeroDecimal(), loss: zeroDecimal() };
};

const calculateSeed = (
  candles: readonly OhlcvCandle[],
  period: number,
): RsiState => {
  let gainSum = zeroDecimal();
  let lossSum = zeroDecimal();

  for (let index = 1; index <= period; index += 1) {
    const { gain, loss } = separateChange(
      candles[index].close,
      candles[index - 1].close,
    );
    gainSum = addDecimals(gainSum, gain);
    lossSum = addDecimals(lossSum, loss);
  }

  const divisor = BigInt(period);

  return {
    averageGain: divideByInteger(gainSum, divisor),
    averageLoss: divideByInteger(lossSum, divisor),
  };
};

const calculateNextState = (
  previous: RsiState,
  currentClose: string,
  previousClose: string,
  period: bigint,
): RsiState => {
  const { gain, loss } = separateChange(currentClose, previousClose);
  const previousWeight = period - 1n;

  return {
    averageGain: divideByInteger(
      addDecimals(
        multiplyDecimal(previous.averageGain, previousWeight),
        gain,
      ),
      period,
    ),
    averageLoss: divideByInteger(
      addDecimals(
        multiplyDecimal(previous.averageLoss, previousWeight),
        loss,
      ),
      period,
    ),
  };
};

const calculateRsiValue = (state: RsiState): string | null => {
  const gainIsZero = state.averageGain.coefficient === 0n;
  const lossIsZero = state.averageLoss.coefficient === 0n;

  if (gainIsZero && lossIsZero) {
    return null;
  }

  if (lossIsZero) {
    return "100";
  }

  if (gainIsZero) {
    return "0";
  }

  const denominator = addDecimals(state.averageGain, state.averageLoss);
  const percentageGain = multiplyDecimal(state.averageGain, 100n);

  return formatDecimal(divideDecimals(percentageGain, denominator));
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
  parameters: RsiParameters,
): Indicator => {
  const candles = dataset.series.candles;
  const period = BigInt(parameters.period);
  let state = calculateSeed(candles, parameters.period);
  let hasAvailableMeasurement = false;
  const measurements: IndicatorMeasurement[] = candles.map((candle, index) => {
    if (index < parameters.period) {
      return {
        availability: "unavailable",
        timestamp: candle.closeTime,
        reason: "insufficient-history",
      };
    }

    if (index > parameters.period) {
      state = calculateNextState(
        state,
        candle.close,
        candles[index - 1].close,
        period,
      );
    }

    const value = calculateRsiValue(state);

    if (value === null) {
      return {
        availability: "unavailable",
        timestamp: candle.closeTime,
        reason: "undefined-value",
      };
    }

    hasAvailableMeasurement = true;

    return {
      availability: "available",
      timestamp: candle.closeTime,
      value: { kind: "numeric", value },
    };
  });

  if (!hasAvailableMeasurement) {
    return {
      definition: rsiDefinition,
      parameters: { period: parameters.period },
      input: createInput(dataset),
      availability: "unavailable",
      reason: "undefined-value",
    };
  }

  return {
    definition: rsiDefinition,
    parameters: { period: parameters.period },
    input: createInput(dataset),
    availability: "available",
    series: measurements,
  };
};

const calculate = ({
  dataset,
  parameters,
}: IndicatorCalculationRequest<RsiParameters>): IndicatorCalculationResult => {
  if (!isValidPeriod(parameters.period)) {
    return {
      outcome: "failure",
      valueState: "absent",
      reason: { kind: "invalid-parameters" },
    };
  }

  const canonicalParameters = { period: parameters.period };

  if (dataset.series.candles.length <= canonicalParameters.period) {
    return {
      outcome: "success",
      valueState: "present",
      value: {
        definition: rsiDefinition,
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

export const rsiCalculator: IndicatorCalculationContract<RsiParameters> =
  Object.freeze({
    definition: rsiDefinition,
    calculate,
  });
