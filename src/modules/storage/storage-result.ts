import type { Result } from "../../core/result";

export type StorageOutput<
  TPreservationResult,
  TRetrievalReference,
  TConflictResult,
  THistoricalStatus,
> = {
  readonly preservationResult: TPreservationResult;
  readonly retrievalReference: TRetrievalReference;
  readonly conflictResult: TConflictResult;
  readonly historicalStatus: THistoricalStatus;
};

export type StorageFailureReason =
  | { readonly kind: "preservation-unavailable" }
  | { readonly kind: "conflict" }
  | { readonly kind: "integrity-failure" }
  | { readonly kind: "retrieval-failure" }
  | { readonly kind: "inconsistent-historical-state" }
  | { readonly kind: "storage-not-implemented" };

export type StorageResult<
  TPreservationResult,
  TRetrievalReference,
  TConflictResult,
  THistoricalStatus,
  TFailureReason = StorageFailureReason,
> = Result<
  StorageOutput<
    TPreservationResult,
    TRetrievalReference,
    TConflictResult,
    THistoricalStatus
  >,
  TFailureReason,
  StorageOutput<
    TPreservationResult,
    TRetrievalReference,
    TConflictResult,
    THistoricalStatus
  >
>;
