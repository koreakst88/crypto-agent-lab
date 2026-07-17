import type {
  FailureResult,
  SuccessResult,
} from "../../core/result";

export type PipelineStage = "collection" | "validation" | "storage";

export type PipelineValueAbsenceReason = {
  readonly kind: "successful-result-without-value";
};

export type PipelineResult<
  TCollectionOutput,
  TCollectionFailureReason,
  TValidationOutput,
  TValidationFailureReason,
  TStorageOutput,
  TStorageFailureReason,
> =
  | (FailureResult<TCollectionFailureReason, TCollectionOutput> & {
      readonly stage: "collection";
    })
  | (FailureResult<PipelineValueAbsenceReason> & {
      readonly stage: "collection";
    })
  | (FailureResult<TValidationFailureReason, TValidationOutput> & {
      readonly stage: "validation";
    })
  | (FailureResult<PipelineValueAbsenceReason> & {
      readonly stage: "validation";
    })
  | (FailureResult<TStorageFailureReason, TStorageOutput> & {
      readonly stage: "storage";
    })
  | (SuccessResult<TStorageOutput> & {
      readonly stage: "storage";
    });
