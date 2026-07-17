import type { Result } from "../../core/result";
import type { Provenance, SourceContext } from "../../core/domain";
import type { StorageFailureReason } from "./storage-result";

export type StorageRetrieveOutput<
  TRetrievedDomainInformation,
  TQualityStatus,
  TSourceContext extends object,
  TDomainContext extends object,
  TProvenance extends object,
  THistoricalStatus,
> = {
  readonly retrievedDomainInformation: TRetrievedDomainInformation;
  readonly qualityStatus: TQualityStatus;
  readonly sourceContext: SourceContext<TSourceContext>;
  readonly domainContext: Readonly<TDomainContext>;
  readonly provenance: Provenance<TProvenance>;
  readonly historicalStatus: THistoricalStatus;
};

export type StorageRetrieveResult<
  TRetrievedDomainInformation,
  TQualityStatus,
  TSourceContext extends object,
  TDomainContext extends object,
  TProvenance extends object,
  THistoricalStatus,
  TFailureReason = StorageFailureReason,
> = Result<
  StorageRetrieveOutput<
    TRetrievedDomainInformation,
    TQualityStatus,
    TSourceContext,
    TDomainContext,
    TProvenance,
    THistoricalStatus
  >,
  TFailureReason,
  StorageRetrieveOutput<
    TRetrievedDomainInformation,
    TQualityStatus,
    TSourceContext,
    TDomainContext,
    TProvenance,
    THistoricalStatus
  >
>;
