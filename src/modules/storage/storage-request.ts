import type { Provenance, SourceContext } from "../../core/domain";

export type StorageRequest<
  TValidatedMarketData,
  TQualityStatus,
  TSourceContext extends object,
  TDomainContext extends object,
  TProvenance extends object,
  TPreservationRequest extends object,
> = {
  readonly validatedMarketData: TValidatedMarketData;
  readonly qualityStatus: TQualityStatus;
  readonly sourceContext: SourceContext<TSourceContext>;
  readonly domainContext: Readonly<TDomainContext>;
  readonly provenance: Provenance<TProvenance>;
  readonly preservationRequest: Readonly<TPreservationRequest>;
};
