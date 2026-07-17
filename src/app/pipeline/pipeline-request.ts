import type { CollectionRequest } from "../../modules/collection";
import type { ValidationRules } from "../../modules/validation";

export type PipelineRequest<
  TAsset,
  TTimeframe,
  TTimePoint,
  TSourceContext extends object,
  TValidationRule,
  TDomainContext extends object,
  TPreservationRequest extends object,
> = {
  readonly collectionRequest: CollectionRequest<
    TAsset,
    TTimeframe,
    TTimePoint,
    TSourceContext
  >;
  readonly validationContext: {
    readonly expectedAsset: TAsset;
    readonly expectedTimeframe: TTimeframe;
    readonly validationRules: ValidationRules<TValidationRule>;
  };
  readonly storageContext: {
    readonly domainContext: Readonly<TDomainContext>;
    readonly preservationRequest: Readonly<TPreservationRequest>;
  };
};
