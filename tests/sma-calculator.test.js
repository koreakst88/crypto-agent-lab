const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");

const buildDirectory =
  process.env.CRYPTO_AGENT_LAB_BUILD_DIR ??
  path.resolve(__dirname, "../dist");

const { smaCalculator, smaDefinition } = require(
  path.join(buildDirectory, "modules/indicators/index.js"),
);

const deepFreeze = (value) => {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);

    for (const nestedValue of Object.values(value)) {
      deepFreeze(nestedValue);
    }
  }

  return value;
};

const createDataset = (closes) =>
  deepFreeze({
    datasetId: "dataset-sma-reference",
    series: {
      instrument: {
        id: "instrument-reference",
        baseAsset: { id: "base-reference", symbol: "BASE" },
        quoteAsset: { id: "quote-reference", symbol: "QUOTE" },
        venue: { id: "venue-reference", code: "REFERENCE" },
        venueSymbol: "BASEQUOTE",
      },
      timeframe: { unit: "minute", value: 1 },
      candles: closes.map((close, index) => ({
        openTime: index * 60_000,
        closeTime: (index + 1) * 60_000,
        open: close,
        high: close,
        low: close,
        close,
        volume: "1",
      })),
    },
    validationReport: {
      summary: { status: "valid", warningCount: 0, errorCount: 0 },
      checkedRules: [],
      findings: [],
    },
  });

const calculate = (closes, period) => {
  const dataset = createDataset(closes);
  const parameters = deepFreeze({ period });
  const request = deepFreeze({ dataset, parameters });
  const before = JSON.stringify(request);
  const result = smaCalculator.calculate(request);

  assert.equal(JSON.stringify(request), before);

  return { dataset, parameters, result };
};

test("exposes the immutable SMA Close v1 definition", () => {
  assert.deepEqual(smaDefinition, {
    definitionId: "sma-close",
    version: "1",
    outputKind: "numeric",
  });
  assert.strictEqual(smaCalculator.definition, smaDefinition);
  assert.equal(Object.isFrozen(smaDefinition), true);
  assert.equal(Object.isFrozen(smaCalculator), true);
});

test("calculates SMA measurements with explicit warm-up", () => {
  const { dataset, parameters, result } = calculate(["1", "2", "3", "4"], 3);

  assert.equal(result.outcome, "success");
  assert.equal(result.valueState, "present");
  assert.equal(result.value.availability, "available");
  assert.strictEqual(result.value.definition, smaDefinition);
  assert.deepEqual(result.value.parameters, { period: 3 });
  assert.notStrictEqual(result.value.parameters, parameters);
  assert.equal(result.value.input.datasetId, dataset.datasetId);
  assert.deepEqual(result.value.input.usedRange, {
    start: 0,
    end: 240_000,
  });
  assert.deepEqual(result.value.series, [
    {
      availability: "unavailable",
      timestamp: 60_000,
      reason: "insufficient-history",
    },
    {
      availability: "unavailable",
      timestamp: 120_000,
      reason: "insufficient-history",
    },
    {
      availability: "available",
      timestamp: 180_000,
      value: { kind: "numeric", value: "2" },
    },
    {
      availability: "available",
      timestamp: 240_000,
      value: { kind: "numeric", value: "3" },
    },
  ]);
});

test("period one produces one available measurement per candle", () => {
  const { result } = calculate(["1.5", "2.5", "3.5"], 1);

  assert.equal(result.outcome, "success");
  assert.equal(result.value.availability, "available");
  assert.deepEqual(
    result.value.series.map((measurement) => measurement.value.value),
    ["1.5", "2.5", "3.5"],
  );
});

test("returns a successful unavailable Indicator for insufficient history", () => {
  const { result } = calculate(["10", "20"], 3);

  assert.equal(result.outcome, "success");
  assert.equal(result.valueState, "present");
  assert.equal(result.value.availability, "unavailable");
  assert.equal(result.value.reason, "insufficient-history");
  assert.deepEqual(result.value.parameters, { period: 3 });
  assert.deepEqual(result.value.input.usedRange, {
    start: 0,
    end: 120_000,
  });
  assert.equal("series" in result.value, false);
});

for (const [label, period] of [
  ["zero", 0],
  ["negative", -1],
  ["fractional", 1.5],
  ["NaN", Number.NaN],
  ["positive infinity", Number.POSITIVE_INFINITY],
  ["negative infinity", Number.NEGATIVE_INFINITY],
  ["unsafe integer", Number.MAX_SAFE_INTEGER + 1],
]) {
  test(`rejects ${label} period`, () => {
    const { result } = calculate(["1", "2", "3"], period);

    assert.deepEqual(result, {
      outcome: "failure",
      valueState: "absent",
      reason: { kind: "invalid-parameters" },
    });
  });
}

test("formats finite scientific notation as a plain numeric string", () => {
  const { result } = calculate(["0.0000001"], 1);

  assert.equal(result.outcome, "success");
  assert.equal(result.value.availability, "available");
  assert.equal(result.value.series[0].value.value, "0.0000001");
  assert.doesNotMatch(result.value.series[0].value.value, /e|NaN|Infinity/i);
});

test("calculates values near the Number range without overflow", () => {
  const close = `1${"0".repeat(308)}`;
  const { result } = calculate([close, close], 2);

  assert.equal(result.outcome, "success");
  assert.equal(result.value.availability, "available");
  assert.equal(result.value.series[1].availability, "available");
  assert.equal(result.value.series[1].value.value, close);
  assert.doesNotMatch(result.value.series[1].value.value, /e|NaN|Infinity/i);
});

test("calculates canonical decimals beyond Number MAX_VALUE", () => {
  const close = `2${"0".repeat(308)}`;
  const { result } = calculate([close], 1);

  assert.equal(result.outcome, "success");
  assert.equal(result.value.availability, "available");
  assert.equal(result.value.series[0].value.value, close);
});

test("sums decimal values without floating-point artifacts", () => {
  const { result } = calculate(["0.1", "0.2"], 2);

  assert.equal(result.outcome, "success");
  assert.equal(result.value.series[1].value.value, "0.15");
});

test("limits a repeating decimal to 34 significant digits", () => {
  const { result } = calculate(["0", "0", "1"], 3);

  assert.equal(result.outcome, "success");
  assert.equal(
    result.value.series[2].value.value,
    `0.${"3".repeat(34)}`,
  );
});

test("uses round-half-even at the 34 significant digit boundary", () => {
  const evenResult = calculate(
    ["1.2345678901234567890123456789012345"],
    1,
  ).result;
  const oddResult = calculate(
    ["1.2345678901234567890123456789012355"],
    1,
  ).result;

  assert.equal(evenResult.outcome, "success");
  assert.equal(
    evenResult.value.series[0].value.value,
    "1.234567890123456789012345678901234",
  );
  assert.equal(oddResult.outcome, "success");
  assert.equal(
    oddResult.value.series[0].value.value,
    "1.234567890123456789012345678901236",
  );
});

test("removes insignificant trailing zeros", () => {
  const { result } = calculate(["1.2000", "1.4000"], 2);

  assert.equal(result.outcome, "success");
  assert.equal(result.value.series[1].value.value, "1.3");
});

test("supports negative decimals and never produces negative zero", () => {
  const negativeResult = calculate(["-0.1", "-0.2"], 2).result;
  const zeroResult = calculate(["-0.1", "0.1"], 2).result;

  assert.equal(negativeResult.outcome, "success");
  assert.equal(negativeResult.value.series[1].value.value, "-0.15");
  assert.equal(zeroResult.outcome, "success");
  assert.equal(zeroResult.value.series[1].value.value, "0");
});
