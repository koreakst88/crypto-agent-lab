import type { Provenance, SourceContext } from "../../core/domain";
import type {
  CollectionStatus,
  SourceLimitations,
} from "../collection";

export type ValidationRules<TValidationRule> =
  readonly TValidationRule[];

export type ValidationRequest<
  TMarketData,
  TSourceContext extends object,
  TProvenance extends object,
  TSourceLimitation,
  TAsset,
  TTimeframe,
  TValidationRule,
> = {
  readonly marketData: TMarketData;
  readonly sourceContext: SourceContext<TSourceContext>;
  readonly provenance: Provenance<TProvenance>;
  readonly collectionStatus: CollectionStatus;
  readonly sourceLimitations: SourceLimitations<TSourceLimitation>;
  readonly expectedAsset: TAsset;
  readonly expectedTimeframe: TTimeframe;
  readonly validationRules: ValidationRules<TValidationRule>;
};
