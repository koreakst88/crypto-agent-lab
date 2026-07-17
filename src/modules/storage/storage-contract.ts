import type { StorageRequest } from "./storage-request";
import type { StorageRetrieveRequest } from "./storage-retrieve-request";
import type { StorageRetrieveResult } from "./storage-retrieve-result";
import type {
  StorageFailureReason,
  StorageResult,
} from "./storage-result";

export interface StorageContract<
  TValidatedMarketData,
  TQualityStatus,
  TSourceContext extends object,
  TDomainContext extends object,
  TProvenance extends object,
  TPreservationRequest extends object,
  TPreservationResult,
  TRetrievalReference,
  TConflictResult,
  THistoricalStatus,
  TFailureReason = StorageFailureReason,
  TRetrievalContext extends object = object,
  TRetrievedDomainInformation = TValidatedMarketData,
> {
  readonly preserve: (
    request: StorageRequest<
      TValidatedMarketData,
      TQualityStatus,
      TSourceContext,
      TDomainContext,
      TProvenance,
      TPreservationRequest
    >,
  ) => StorageResult<
    TPreservationResult,
    TRetrievalReference,
    TConflictResult,
    THistoricalStatus,
    TFailureReason
  >;

  readonly retrieve: (
    request: StorageRetrieveRequest<TRetrievalContext>,
  ) => StorageRetrieveResult<
    TRetrievedDomainInformation,
    TQualityStatus,
    TSourceContext,
    TDomainContext,
    TProvenance,
    THistoricalStatus,
    TFailureReason
  >;
}
