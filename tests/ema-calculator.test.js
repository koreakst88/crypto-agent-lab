const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");

const buildDirectory =
  process.env.CRYPTO_AGENT_LAB_BUILD_DIR ??
  path.resolve(__dirname, "../dist");

const { emaCalculator, emaDefinition } = require(
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
    datasetId: "dataset-ema-reference",
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
  const result = emaCalculator.calculate(request);

  assert.equal(JSON.stringify(request), before);

  return { dataset, parameters, result };
};

test("exposes the immutable EMA Close v1 definition", () => {
  assert.deepEqual(emaDefinition, {
    definitionId: "ema-close",
    version: "1",
    outputKind: "numeric",
  });
  assert.strictEqual(emaCalculator.definition, emaDefinition);
  assert.equal(Object.isFrozen(emaDefinition), true);
  assert.equal(Object.isFrozen(emaCalculator), true);
});

test("calculates EMA with an arithmetic-mean seed and explicit warm-up", () => {
  const { dataset, parameters, result } = calculate(
    ["1", "2", "3", "4", "5"],
    3,
  );

  assert.equal(result.outcome, "success");
  assert.equal(result.valueState, "present");
  assert.equal(result.value.availability, "available");
  assert.strictEqual(result.value.definition, emaDefinition);
  assert.deepEqual(result.value.parameters, { period: 3 });
  assert.notStrictEqual(result.value.parameters, parameters);
  assert.equal(result.value.input.datasetId, dataset.datasetId);
  assert.deepEqual(result.value.input.usedRange, {
    start: 0,
    end: 300_000,
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
    {
      availability: "available",
      timestamp: 300_000,
      value: { kind: "numeric", value: "4" },
    },
  ]);
});

test("period one produces the close value for every candle", () => {
  const { result } = calculate(["1.5", "2.5", "3.5"], 1);

  assert.equal(result.outcome, "success");
  assert.equal(result.value.availability, "available");
  assert.deepEqual(
    result.value.series.map((measurement) => measurement.value.value),
    ["1.5", "2.5", "3.5"],
  );
});

test("uses exact rational alpha for recursive EMA", () => {
  const { result } = calculate(["1", "2", "4"], 2);

  assert.equal(result.outcome, "success");
  assert.deepEqual(
    result.value.series.map((measurement) =>
      measurement.availability === "available"
        ? measurement.value.value
        : measurement.reason,
    ),
    [
      "insufficient-history",
      "1.5",
      "3.166666666666666666666666666666667",
    ],
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

test("calculates exact decimal seed and recurrence", () => {
  const { result } = calculate(["0.1", "0.2", "0.3"], 2);

  assert.equal(result.outcome, "success");
  assert.deepEqual(
    result.value.series.map((measurement) =>
      measurement.availability === "available"
        ? measurement.value.value
        : measurement.reason,
    ),
    ["insufficient-history", "0.15", "0.25"],
  );
});

test("calculates canonical values near and beyond the Number range", () => {
  const nearLimit = `1${"0".repeat(308)}`;
  const beyondLimit = `2${"0".repeat(308)}`;
  const nearResult = calculate([nearLimit, nearLimit, nearLimit], 2).result;
  const beyondResult = calculate(
    [beyondLimit, beyondLimit, beyondLimit],
    2,
  ).result;

  assert.equal(nearResult.outcome, "success");
  assert.equal(nearResult.value.series[2].value.value, nearLimit);
  assert.equal(beyondResult.outcome, "success");
  assert.equal(beyondResult.value.availability, "available");
  assert.equal(beyondResult.value.series[1].value.value, beyondLimit);
  assert.equal(beyondResult.value.series[2].value.value, beyondLimit);
  assert.doesNotMatch(
    beyondResult.value.series[2].value.value,
    /e|NaN|Infinity/i,
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

  assert.equal(
    evenResult.value.series[0].value.value,
    "1.234567890123456789012345678901234",
  );
  assert.equal(
    oddResult.value.series[0].value.value,
    "1.234567890123456789012345678901236",
  );
});

test("produces canonical decimal formatting", () => {
  const trailingZeroResult = calculate(["1.2000", "1.4000"], 2).result;
  const smallResult = calculate(["0.0000001"], 1).result;
  const zeroResult = calculate(["-0.1", "0.1"], 2).result;

  assert.equal(trailingZeroResult.value.series[1].value.value, "1.3");
  assert.equal(smallResult.value.series[0].value.value, "0.0000001");
  assert.equal(zeroResult.value.series[1].value.value, "0");

  for (const value of [
    trailingZeroResult.value.series[1].value.value,
    smallResult.value.series[0].value.value,
    zeroResult.value.series[1].value.value,
  ]) {
    assert.doesNotMatch(value, /e|NaN|Infinity/i);
    assert.notEqual(value, "-0");
  }
});

test("matches independent golden values across a long recursive sequence", () => {
  const pattern = ["0.1", "1.7", "3.3", "2.2", "9.9", "4.4", "8.8"];
  const closes = Array.from(
    { length: 50 },
    (_, index) => pattern[index % pattern.length],
  );
  const firstResult = calculate(closes, 6).result;
  const secondResult = calculate(closes, 6).result;
  const expected = new Map([
    [5, "3.6"],
    [6, "5.085714285714285714285714285714286"],
    [10, "2.884119712024751591598738620812756"],
    [20, "5.984317032189753781796671438083676"],
    [30, "3.487938457282245157965532475776439"],
    [40, "4.869458384288022790169333218584947"],
    [49, "4.308911842919334187698499391703664"],
  ]);

  assert.equal(firstResult.outcome, "success");
  assert.equal(firstResult.value.series.length, closes.length);

  for (const [index, value] of expected) {
    assert.equal(firstResult.value.series[index].value.value, value);
  }

  assert.deepEqual(firstResult, secondResult);
});
