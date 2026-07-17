const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");

const buildDirectory =
  process.env.CRYPTO_AGENT_LAB_BUILD_DIR ??
  path.resolve(__dirname, "../dist");

const { CollectionValidationStoragePipeline } = require(
  path.join(buildDirectory, "app/index.js"),
);

class ControlledCollection {
  constructor(result, order) {
    this.result = result;
    this.order = order;
    this.callCount = 0;
    this.lastRequest = undefined;
  }

  collect(request) {
    this.callCount += 1;
    this.lastRequest = request;
    this.order.push("collection");
    return this.result;
  }
}

class ControlledValidation {
  constructor(result, order) {
    this.result = result;
    this.order = order;
    this.callCount = 0;
    this.lastRequest = undefined;
  }

  validate(request) {
    this.callCount += 1;
    this.lastRequest = request;
    this.order.push("validation");
    return this.result;
  }
}

class ControlledStorage {
  constructor(result, order) {
    this.result = result;
    this.order = order;
    this.callCount = 0;
    this.lastRequest = undefined;
  }

  preserve(request) {
    this.callCount += 1;
    this.lastRequest = request;
    this.order.push("storage");
    return this.result;
  }
}

const sourceContext = Object.freeze({ source: "controlled-source" });
const collectedMarketData = Object.freeze({ observations: "collected" });
const sourceLimitations = Object.freeze(["declared-limitation"]);
const validatedMarketData = Object.freeze({ observations: "validated" });
const rejectedObservations = Object.freeze([]);
const validationFindings = Object.freeze(["controlled-finding"]);
const normalizationRecord = Object.freeze({ normalized: false });
const qualityStatus = Object.freeze({ status: "accepted" });
const domainContext = Object.freeze({ domain: "controlled-domain" });
const provenance = Object.freeze({ origin: "controlled-origin" });
const preservationRequest = Object.freeze({ mode: "preserve" });

const collectionOutput = Object.freeze({
  marketData: collectedMarketData,
  sourceContext,
  provenance,
  status: "complete",
  sourceLimitations,
});

const validationOutput = Object.freeze({
  validatedMarketData,
  sourceContext,
  provenance,
  rejectedObservations,
  validationFindings,
  normalizationRecord,
  qualityStatus,
});

const storageOutput = Object.freeze({
  preservationResult: Object.freeze({ preserved: true }),
  retrievalReference: Object.freeze({ reference: "controlled-reference" }),
  conflictResult: Object.freeze({ conflict: false }),
  historicalStatus: Object.freeze({ status: "preserved" }),
});

const successfulCollectionResult = Object.freeze({
  outcome: "success",
  valueState: "present",
  value: collectionOutput,
});

const successfulValidationResult = Object.freeze({
  outcome: "success",
  valueState: "present",
  value: validationOutput,
});

const successfulStorageResult = Object.freeze({
  outcome: "success",
  valueState: "present",
  value: storageOutput,
});

const validationRules = Object.freeze(["controlled-rule"]);

const pipelineRequest = Object.freeze({
  collectionRequest: Object.freeze({
    assetScope: Object.freeze(["controlled-asset"]),
    timeframeScope: Object.freeze(["controlled-timeframe"]),
    timeRange: Object.freeze({ start: 1, end: 2 }),
    sourceContext,
  }),
  validationContext: Object.freeze({
    expectedAsset: "controlled-asset",
    expectedTimeframe: "controlled-timeframe",
    validationRules,
  }),
  storageContext: Object.freeze({
    domainContext,
    preservationRequest,
  }),
});

function createFixture({
  collectionResult,
  validationResult,
  storageResult,
}) {
  const order = [];
  const collection = new ControlledCollection(collectionResult, order);
  const validation = new ControlledValidation(validationResult, order);
  const storage = new ControlledStorage(storageResult, order);
  const pipeline = new CollectionValidationStoragePipeline(
    collection,
    validation,
    storage,
  );

  return { collection, order, pipeline, storage, validation };
}

test("stops after Collection failure and preserves its reason", () => {
  const reason = Object.freeze({ kind: "source-unavailable" });
  const fixture = createFixture({
    collectionResult: Object.freeze({
      outcome: "failure",
      valueState: "absent",
      reason,
    }),
    validationResult: successfulValidationResult,
    storageResult: successfulStorageResult,
  });

  const result = fixture.pipeline.execute(pipelineRequest);

  assert.equal(result.outcome, "failure");
  assert.equal(result.stage, "collection");
  assert.strictEqual(result.reason, reason);
  assert.equal(fixture.collection.callCount, 1);
  assert.equal(fixture.validation.callCount, 0);
  assert.equal(fixture.storage.callCount, 0);
  assert.deepEqual(fixture.order, ["collection"]);
});

test("stops after Validation failure and preserves its reason", () => {
  const reason = Object.freeze({ kind: "invalid-structure" });
  const fixture = createFixture({
    collectionResult: successfulCollectionResult,
    validationResult: Object.freeze({
      outcome: "failure",
      valueState: "absent",
      reason,
    }),
    storageResult: successfulStorageResult,
  });

  const result = fixture.pipeline.execute(pipelineRequest);

  assert.equal(result.outcome, "failure");
  assert.equal(result.stage, "validation");
  assert.strictEqual(result.reason, reason);
  assert.equal(fixture.collection.callCount, 1);
  assert.equal(fixture.validation.callCount, 1);
  assert.equal(fixture.storage.callCount, 0);
  assert.deepEqual(fixture.order, ["collection", "validation"]);
});

test("returns Storage failure after invoking every stage once", () => {
  const reason = Object.freeze({ kind: "preservation-unavailable" });
  const fixture = createFixture({
    collectionResult: successfulCollectionResult,
    validationResult: successfulValidationResult,
    storageResult: Object.freeze({
      outcome: "failure",
      valueState: "absent",
      reason,
    }),
  });

  const result = fixture.pipeline.execute(pipelineRequest);

  assert.equal(result.outcome, "failure");
  assert.equal(result.stage, "storage");
  assert.strictEqual(result.reason, reason);
  assert.equal(fixture.collection.callCount, 1);
  assert.equal(fixture.validation.callCount, 1);
  assert.equal(fixture.storage.callCount, 1);
  assert.deepEqual(fixture.order, ["collection", "validation", "storage"]);
});

test("stops after Collection partial failure and preserves its value", () => {
  const reason = Object.freeze({ kind: "collection-interrupted" });
  const partialValue = Object.freeze({
    ...collectionOutput,
    status: "partial",
  });
  const fixture = createFixture({
    collectionResult: Object.freeze({
      outcome: "failure",
      valueState: "partial",
      reason,
      value: partialValue,
    }),
    validationResult: successfulValidationResult,
    storageResult: successfulStorageResult,
  });

  const result = fixture.pipeline.execute(pipelineRequest);

  assert.equal(result.outcome, "failure");
  assert.equal(result.valueState, "partial");
  assert.equal(result.stage, "collection");
  assert.strictEqual(result.reason, reason);
  assert.strictEqual(result.value, partialValue);
  assert.equal(fixture.collection.callCount, 1);
  assert.equal(fixture.validation.callCount, 0);
  assert.equal(fixture.storage.callCount, 0);
  assert.deepEqual(fixture.order, ["collection"]);
});

test("stops after Validation partial failure and preserves traceability", () => {
  const reason = Object.freeze({ kind: "invalid-structure" });
  const partialValue = Object.freeze({
    ...validationOutput,
    qualityStatus: Object.freeze({ status: "partial" }),
  });
  const fixture = createFixture({
    collectionResult: successfulCollectionResult,
    validationResult: Object.freeze({
      outcome: "failure",
      valueState: "partial",
      reason,
      value: partialValue,
    }),
    storageResult: successfulStorageResult,
  });

  const result = fixture.pipeline.execute(pipelineRequest);

  assert.equal(result.outcome, "failure");
  assert.equal(result.valueState, "partial");
  assert.equal(result.stage, "validation");
  assert.strictEqual(result.reason, reason);
  assert.strictEqual(result.value, partialValue);
  assert.strictEqual(result.value.sourceContext, sourceContext);
  assert.strictEqual(result.value.provenance, provenance);
  assert.equal(fixture.collection.callCount, 1);
  assert.equal(fixture.validation.callCount, 1);
  assert.equal(fixture.storage.callCount, 0);
  assert.deepEqual(fixture.order, ["collection", "validation"]);
});

test("returns Storage partial failure without losing its value", () => {
  const reason = Object.freeze({ kind: "conflict" });
  const partialValue = Object.freeze({
    preservationResult: Object.freeze({ preserved: false }),
    retrievalReference: Object.freeze({ reference: "partial-reference" }),
    conflictResult: Object.freeze({ conflict: true }),
    historicalStatus: Object.freeze({ status: "unchanged" }),
  });
  const fixture = createFixture({
    collectionResult: successfulCollectionResult,
    validationResult: successfulValidationResult,
    storageResult: Object.freeze({
      outcome: "failure",
      valueState: "partial",
      reason,
      value: partialValue,
    }),
  });

  const result = fixture.pipeline.execute(pipelineRequest);

  assert.equal(result.outcome, "failure");
  assert.equal(result.valueState, "partial");
  assert.equal(result.stage, "storage");
  assert.strictEqual(result.reason, reason);
  assert.strictEqual(result.value, partialValue);
  assert.equal(fixture.collection.callCount, 1);
  assert.equal(fixture.validation.callCount, 1);
  assert.equal(fixture.storage.callCount, 1);
  assert.deepEqual(fixture.order, ["collection", "validation", "storage"]);
});

test("returns the final Storage value and forwards only contract inputs", () => {
  const fixture = createFixture({
    collectionResult: successfulCollectionResult,
    validationResult: successfulValidationResult,
    storageResult: successfulStorageResult,
  });

  const result = fixture.pipeline.execute(pipelineRequest);

  assert.equal(result.outcome, "success");
  assert.equal(result.stage, "storage");
  assert.equal(result.valueState, "present");
  assert.strictEqual(result.value, storageOutput);
  assert.equal(fixture.collection.callCount, 1);
  assert.equal(fixture.validation.callCount, 1);
  assert.equal(fixture.storage.callCount, 1);
  assert.deepEqual(fixture.order, ["collection", "validation", "storage"]);

  assert.deepEqual(fixture.validation.lastRequest, {
    marketData: collectedMarketData,
    sourceContext,
    provenance,
    collectionStatus: "complete",
    sourceLimitations,
    expectedAsset: "controlled-asset",
    expectedTimeframe: "controlled-timeframe",
    validationRules,
  });
  assert.strictEqual(
    fixture.validation.lastRequest.marketData,
    collectedMarketData,
  );
  assert.strictEqual(fixture.validation.lastRequest.sourceContext, sourceContext);
  assert.strictEqual(fixture.validation.lastRequest.provenance, provenance);
  assert.equal("outcome" in fixture.validation.lastRequest, false);

  assert.deepEqual(fixture.storage.lastRequest, {
    validatedMarketData,
    qualityStatus,
    sourceContext,
    domainContext,
    provenance,
    preservationRequest,
  });
  assert.strictEqual(
    fixture.storage.lastRequest.validatedMarketData,
    validatedMarketData,
  );
  assert.strictEqual(fixture.storage.lastRequest.qualityStatus, qualityStatus);
  assert.strictEqual(fixture.storage.lastRequest.sourceContext, sourceContext);
  assert.strictEqual(fixture.storage.lastRequest.domainContext, domainContext);
  assert.strictEqual(fixture.storage.lastRequest.provenance, provenance);
  assert.strictEqual(
    fixture.storage.lastRequest.preservationRequest,
    preservationRequest,
  );
  assert.equal("provenance" in pipelineRequest.storageContext, false);
  assert.equal("outcome" in fixture.storage.lastRequest, false);
});

test("rejects Collection success without value and skips later stages", () => {
  const fixture = createFixture({
    collectionResult: Object.freeze({
      outcome: "success",
      valueState: "absent",
    }),
    validationResult: successfulValidationResult,
    storageResult: successfulStorageResult,
  });

  const result = fixture.pipeline.execute(pipelineRequest);

  assert.equal(result.outcome, "failure");
  assert.equal(result.stage, "collection");
  assert.equal(result.reason.kind, "successful-result-without-value");
  assert.equal(fixture.collection.callCount, 1);
  assert.equal(fixture.validation.callCount, 0);
  assert.equal(fixture.storage.callCount, 0);
  assert.deepEqual(fixture.order, ["collection"]);
});

test("rejects Validation success without value and skips Storage", () => {
  const fixture = createFixture({
    collectionResult: successfulCollectionResult,
    validationResult: Object.freeze({
      outcome: "success",
      valueState: "absent",
    }),
    storageResult: successfulStorageResult,
  });

  const result = fixture.pipeline.execute(pipelineRequest);

  assert.equal(result.outcome, "failure");
  assert.equal(result.stage, "validation");
  assert.equal(result.reason.kind, "successful-result-without-value");
  assert.equal(fixture.collection.callCount, 1);
  assert.equal(fixture.validation.callCount, 1);
  assert.equal(fixture.storage.callCount, 0);
  assert.deepEqual(fixture.order, ["collection", "validation"]);
});
