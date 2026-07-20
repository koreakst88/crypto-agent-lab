const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");

const buildDirectory =
  process.env.CRYPTO_AGENT_LAB_BUILD_DIR ??
  path.resolve(__dirname, "../dist");

const { rsiCalculator, rsiDefinition } = require(
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
    datasetId: "dataset-rsi-reference",
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
  const result = rsiCalculator.calculate(request);

  assert.equal(JSON.stringify(request), before);

  return { dataset, parameters, request, result };
};

const measurementValues = (result) =>
  result.value.series.map((measurement) =>
    measurement.availability === "available"
      ? measurement.value.value
      : measurement.reason,
  );

const assertCanonicalRsi = (value) => {
  assert.match(value, /^(?:0|[1-9]\d*)(?:\.\d+)?$/);
  assert.doesNotMatch(value, /e|NaN|Infinity/i);
  assert.notEqual(value, "-0");

  const integerPart = value.split(".")[0];
  const integerValue = BigInt(integerPart);
  assert.equal(integerValue >= 0n, true);
  assert.equal(integerValue <= 100n, true);

  if (integerValue === 100n) {
    assert.equal(value, "100");
  }
};

test("exposes the immutable RSI Close v1 definition", () => {
  assert.deepEqual(rsiDefinition, {
    definitionId: "rsi-close",
    version: "1",
    outputKind: "numeric",
  });
  assert.strictEqual(rsiCalculator.definition, rsiDefinition);
  assert.equal(Object.isFrozen(rsiDefinition), true);
  assert.equal(Object.isFrozen(rsiCalculator), true);
});

test("calculates the mixed gain-loss seed at candle index period", () => {
  const { dataset, parameters, result } = calculate(["1", "2", "1"], 2);

  assert.equal(result.outcome, "success");
  assert.equal(result.valueState, "present");
  assert.equal(result.value.availability, "available");
  assert.strictEqual(result.value.definition, rsiDefinition);
  assert.deepEqual(result.value.parameters, { period: 2 });
  assert.notStrictEqual(result.value.parameters, parameters);
  assert.equal(result.value.input.datasetId, dataset.datasetId);
  assert.deepEqual(result.value.input.usedRange, {
    start: 0,
    end: 180_000,
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
      value: { kind: "numeric", value: "50" },
    },
  ]);
});

test("uses Wilder recurrence rather than rolling SMA or EMA alpha", () => {
  const { result } = calculate(["1", "2", "1", "3", "2", "5"], 2);

  assert.equal(result.outcome, "success");
  assert.deepEqual(measurementValues(result), [
    "insufficient-history",
    "insufficient-history",
    "50",
    "83.33333333333333333333333333333333",
    "50",
    "85.29411764705882352941176470588235",
  ]);
});

test("returns insufficient history when fewer than period plus one candles exist", () => {
  const { result } = calculate(["10", "20", "30"], 3);

  assert.deepEqual(result, {
    outcome: "success",
    valueState: "present",
    value: {
      definition: rsiDefinition,
      parameters: { period: 3 },
      input: {
        datasetId: "dataset-rsi-reference",
        usedRange: { start: 0, end: 180_000 },
      },
      availability: "unavailable",
      reason: "insufficient-history",
    },
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

test("accepts period one with explicit endpoint and undefined semantics", () => {
  const rising = calculate(["1", "2"], 1).result;
  const falling = calculate(["2", "1"], 1).result;
  const flat = calculate(["1", "1"], 1).result;

  assert.deepEqual(measurementValues(rising), ["insufficient-history", "100"]);
  assert.deepEqual(measurementValues(falling), ["insufficient-history", "0"]);
  assert.equal(flat.value.availability, "unavailable");
  assert.equal(flat.value.reason, "undefined-value");
  assert.equal("series" in flat.value, false);
});

test("returns canonical endpoints for continuously directional markets", () => {
  const rising = calculate(["1", "2", "3", "4", "5"], 2).result;
  const falling = calculate(["5", "4", "3", "2", "1"], 2).result;

  assert.deepEqual(measurementValues(rising), [
    "insufficient-history",
    "insufficient-history",
    "100",
    "100",
    "100",
  ]);
  assert.deepEqual(measurementValues(falling), [
    "insufficient-history",
    "insufficient-history",
    "0",
    "0",
    "0",
  ]);
});

test("returns top-level undefined-value for an entirely flat calculated range", () => {
  const { result } = calculate(["1", "1", "1", "1"], 2);

  assert.equal(result.outcome, "success");
  assert.equal(result.value.availability, "unavailable");
  assert.equal(result.value.reason, "undefined-value");
  assert.deepEqual(result.value.parameters, { period: 2 });
  assert.deepEqual(result.value.input.usedRange, {
    start: 0,
    end: 240_000,
  });
  assert.equal("series" in result.value, false);
});

test("preserves undefined candidates before a later rising value", () => {
  const { result } = calculate(["1", "1", "1", "2"], 2);

  assert.equal(result.value.availability, "available");
  assert.deepEqual(measurementValues(result), [
    "insufficient-history",
    "insufficient-history",
    "undefined-value",
    "100",
  ]);
});

test("preserves undefined candidates before a later falling value", () => {
  const { result } = calculate(["1", "1", "1", "0"], 2);

  assert.equal(result.value.availability, "available");
  assert.deepEqual(measurementValues(result), [
    "insufficient-history",
    "insufficient-history",
    "undefined-value",
    "0",
  ]);
});

test("calculates decimal changes without floating-point artifacts", () => {
  const { result } = calculate(["0.1", "0.3", "0.2", "0.4"], 2);

  assert.deepEqual(measurementValues(result), [
    "insufficient-history",
    "insufficient-history",
    "66.66666666666666666666666666666667",
    "85.71428571428571428571428571428571",
  ]);
});

test("calculates values near and beyond the Number range", () => {
  const nearLimit = `1${"0".repeat(308)}`;
  const beyondLimit = `2${"0".repeat(308)}`;
  const { result } = calculate([nearLimit, beyondLimit, nearLimit], 2);

  assert.equal(result.value.availability, "available");
  assert.equal(result.value.series[2].value.value, "50");
  assertCanonicalRsi(result.value.series[2].value.value);
});

test("preserves very small non-zero changes", () => {
  const first = `0.${"0".repeat(307)}1`;
  const second = `0.${"0".repeat(307)}3`;
  const third = `0.${"0".repeat(307)}2`;
  const { result } = calculate([first, second, third], 2);

  assert.equal(
    result.value.series[2].value.value,
    "66.66666666666666666666666666666667",
  );
});

test("applies the approved 34-digit round-half-even boundaries", () => {
  const fixtures = [
    {
      closes: [
        "0",
        "1.2345678901234567890123456789012344",
        "-97.5308642197530864219753086421975312",
      ],
      expected: "1.234567890123456789012345678901234",
    },
    {
      closes: [
        "0",
        "1.2345678901234567890123456789012345",
        "-97.5308642197530864219753086421975310",
      ],
      expected: "1.234567890123456789012345678901234",
    },
    {
      closes: [
        "0",
        "1.2345678901234567890123456789012346",
        "-97.5308642197530864219753086421975308",
      ],
      expected: "1.234567890123456789012345678901235",
    },
    {
      closes: [
        "0",
        "1.2345678901234567890123456789012355",
        "-97.5308642197530864219753086421975290",
      ],
      expected: "1.234567890123456789012345678901236",
    },
    {
      closes: [
        "0",
        "9.9999999999999999999999999999999995",
        "-80.0000000000000000000000000000000010",
      ],
      expected: "10",
    },
  ];

  for (const { closes, expected } of fixtures) {
    const { result } = calculate(closes, 2);
    assert.equal(result.value.series[2].value.value, expected);
  }
});

test("produces only canonical bounded numeric output", () => {
  const { result } = calculate(
    ["1.2000", "2.4000", "1.8000", "3.0000", "2.1000", "4.5000"],
    2,
  );

  assert.equal(result.value.availability, "available");

  for (const measurement of result.value.series) {
    if (measurement.availability === "available") {
      assertCanonicalRsi(measurement.value.value);
      assert.doesNotMatch(measurement.value.value, /\.\d*0$/);
    }
  }
});

test("matches independent golden values across a long irregular sequence", () => {
  const closes = [
    "10",
    "11",
    "10",
    "12",
    "9",
    "13",
    "12",
    "14",
    "8",
    "15",
    "14",
    "16",
    "10",
    "17",
    "16",
    "18",
    "11",
    "19",
    "18",
    "20",
    "12",
    "21",
    "20",
    "22",
    "13",
    "23",
    "22",
    "24",
    "14",
    "25",
  ];
  const firstResult = calculate(closes, 5).result;
  const secondResult = calculate(closes, 5).result;
  const expected = new Map([
    [5, "63.63636363636363636363636363636364"],
    [6, "57.14285714285714285714285714285714"],
    [7, "65.85365853658536585365853658536585"],
    [8, "37.37024221453287197231833910034602"],
    [10, "57.61541483181376501478219520767434"],
    [15, "62.92763386049867004032174126718567"],
    [20, "40.15559563294394182934083362943391"],
    [25, "59.64936014075673551441913226373928"],
    [29, "59.27993833941605641306152772433243"],
  ]);

  assert.equal(firstResult.outcome, "success");
  assert.equal(firstResult.value.availability, "available");
  assert.equal(firstResult.value.series.length, closes.length);

  for (const [index, expectedValue] of expected) {
    assert.equal(firstResult.value.series[index].value.value, expectedValue);
  }

  assert.deepEqual(firstResult, secondResult);
});
