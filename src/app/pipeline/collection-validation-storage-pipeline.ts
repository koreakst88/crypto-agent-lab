import type {
  CollectionContract,
  CollectionOutput,
} from "../../modules/collection";
import type {
  ValidationContract,
  ValidationOutput,
} from "../../modules/validation";
import type {
  StorageContract,
  StorageOutput,
} from "../../modules/storage";
import type { PipelineContract } from "./pipeline-contract";
import type { PipelineRequest } from "./pipeline-request";
import type { PipelineResult } from "./pipeline-result";

export class CollectionValidationStoragePipeline<
  TAsset,
  TTimeframe,
  TTimePoint,
  TSourceContext extends object,
  TCollectedMarketData,
  TSourceLimitation,
  TCollectionFailureReason,
  TValidationRule,
  TValidatedMarketData,
  TRejectedObservation,
  TValidationFinding,
  TNormalizationRecord,
  TQualityStatus,
  TValidationFailureReason,
  TDomainContext extends object,
  TProvenance extends object,
  TPreservationRequest extends object,
  TPreservationResult,
  TRetrievalReference,
  TConflictResult,
  THistoricalStatus,
  TStorageFailureReason,
> implements
    PipelineContract<
      PipelineRequest<
        TAsset,
        TTimeframe,
        TTimePoint,
        TSourceContext,
        TValidationRule,
        TDomainContext,
        TPreservationRequest
      >,
      PipelineResult<
        CollectionOutput<
          TCollectedMarketData,
          TSourceContext,
          TProvenance,
          TSourceLimitation
        >,
        TCollectionFailureReason,
        ValidationOutput<
          TValidatedMarketData,
          TSourceContext,
          TProvenance,
          TRejectedObservation,
          TValidationFinding,
          TNormalizationRecord,
          TQualityStatus
        >,
        TValidationFailureReason,
        StorageOutput<
          TPreservationResult,
          TRetrievalReference,
          TConflictResult,
          THistoricalStatus
        >,
        TStorageFailureReason
      >
    >
{
  constructor(
    private readonly collection: CollectionContract<
      TAsset,
      TTimeframe,
      TTimePoint,
      TSourceContext,
      TProvenance,
      TCollectedMarketData,
      TSourceLimitation,
      TCollectionFailureReason
    >,
    private readonly validation: ValidationContract<
      TCollectedMarketData,
      TSourceContext,
      TProvenance,
      TSourceLimitation,
      TAsset,
      TTimeframe,
      TValidationRule,
      TValidatedMarketData,
      TRejectedObservation,
      TValidationFinding,
      TNormalizationRecord,
      TQualityStatus,
      TValidationFailureReason
    >,
    private readonly storage: StorageContract<
      TValidatedMarketData,
      TQualityStatus,
      TSourceContext,
      TDomainContext,
      TProvenance,
      TPreservationRequest,
      TPreservationResult,
      TRetrievalReference,
      TConflictResult,
      THistoricalStatus,
      TStorageFailureReason
    >,
  ) {}

  readonly execute = (
    request: PipelineRequest<
      TAsset,
      TTimeframe,
      TTimePoint,
      TSourceContext,
      TValidationRule,
      TDomainContext,
      TPreservationRequest
    >,
  ): PipelineResult<
    CollectionOutput<
      TCollectedMarketData,
      TSourceContext,
      TProvenance,
      TSourceLimitation
    >,
    TCollectionFailureReason,
    ValidationOutput<
      TValidatedMarketData,
      TSourceContext,
      TProvenance,
      TRejectedObservation,
      TValidationFinding,
      TNormalizationRecord,
      TQualityStatus
    >,
    TValidationFailureReason,
    StorageOutput<
      TPreservationResult,
      TRetrievalReference,
      TConflictResult,
      THistoricalStatus
    >,
    TStorageFailureReason
  > => {
    const collectionResult = this.collection.collect(
      request.collectionRequest,
    );

    if (collectionResult.outcome === "failure") {
      return { ...collectionResult, stage: "collection" };
    }

    if (collectionResult.valueState === "absent") {
      return {
        outcome: "failure",
        valueState: "absent",
        stage: "collection",
        reason: { kind: "successful-result-without-value" },
      };
    }

    const collectionOutput = collectionResult.value;
    const validationResult = this.validation.validate({
      marketData: collectionOutput.marketData,
      sourceContext: collectionOutput.sourceContext,
      provenance: collectionOutput.provenance,
      collectionStatus: collectionOutput.status,
      sourceLimitations: collectionOutput.sourceLimitations,
      expectedAsset: request.validationContext.expectedAsset,
      expectedTimeframe: request.validationContext.expectedTimeframe,
      validationRules: request.validationContext.validationRules,
    });

    if (validationResult.outcome === "failure") {
      return { ...validationResult, stage: "validation" };
    }

    if (validationResult.valueState === "absent") {
      return {
        outcome: "failure",
        valueState: "absent",
        stage: "validation",
        reason: { kind: "successful-result-without-value" },
      };
    }

    const validationOutput = validationResult.value;
    const storageResult = this.storage.preserve({
      validatedMarketData: validationOutput.validatedMarketData,
      qualityStatus: validationOutput.qualityStatus,
      sourceContext: validationOutput.sourceContext,
      domainContext: request.storageContext.domainContext,
      provenance: validationOutput.provenance,
      preservationRequest: request.storageContext.preservationRequest,
    });

    if (storageResult.outcome === "failure") {
      return { ...storageResult, stage: "storage" };
    }

    return { ...storageResult, stage: "storage" };
  };
}
