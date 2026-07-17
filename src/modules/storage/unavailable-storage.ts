import type { StorageContract } from "./storage-contract";
import type { StorageRequest } from "./storage-request";
import type { StorageRetrieveRequest } from "./storage-retrieve-request";
import type { StorageRetrieveResult } from "./storage-retrieve-result";
import type {
  StorageFailureReason,
  StorageResult,
} from "./storage-result";

export class UnavailableStorage<
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
  TRetrievalContext extends object = object,
  TRetrievedDomainInformation = TValidatedMarketData,
> implements
    StorageContract<
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
      StorageFailureReason,
      TRetrievalContext,
      TRetrievedDomainInformation
    >
{
  readonly preserve = (
    _request: StorageRequest<
      TValidatedMarketData,
      TQualityStatus,
      TSourceContext,
      TDomainContext,
      TProvenance,
      TPreservationRequest
    >,
  ): StorageResult<
    TPreservationResult,
    TRetrievalReference,
    TConflictResult,
    THistoricalStatus
  > => ({
    outcome: "failure",
    valueState: "absent",
    reason: { kind: "storage-not-implemented" },
  });

  readonly retrieve = (
    _request: StorageRetrieveRequest<TRetrievalContext>,
  ): StorageRetrieveResult<
    TRetrievedDomainInformation,
    TQualityStatus,
    TSourceContext,
    TDomainContext,
    TProvenance,
    THistoricalStatus
  > => ({
    outcome: "failure",
    valueState: "absent",
    reason: { kind: "storage-not-implemented" },
  });
}
