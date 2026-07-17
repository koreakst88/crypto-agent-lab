import type { Result } from "../../core/result";
import type { Provenance } from "../../core/domain";
import type { StorageFailureReason } from "./storage-result";

export type StorageRetrieveOutput<
  TRetrievedDomainInformation,
  TDomainContext extends object,
  TProvenance extends object,
  THistoricalStatus,
> = {
  readonly retrievedDomainInformation: TRetrievedDomainInformation;
  readonly domainContext: Readonly<TDomainContext>;
  readonly provenance: Provenance<TProvenance>;
  readonly historicalStatus: THistoricalStatus;
};

export type StorageRetrieveResult<
  TRetrievedDomainInformation,
  TDomainContext extends object,
  TProvenance extends object,
  THistoricalStatus,
  TFailureReason = StorageFailureReason,
> = Result<
  StorageRetrieveOutput<
    TRetrievedDomainInformation,
    TDomainContext,
    TProvenance,
    THistoricalStatus
  >,
  TFailureReason,
  StorageRetrieveOutput<
    TRetrievedDomainInformation,
    TDomainContext,
    TProvenance,
    THistoricalStatus
  >
>;
