import type { CollectionRequest } from "./collection-request";
import type {
  CollectionFailureReason,
  CollectionResult,
} from "./collection-result";

export interface CollectionContract<
  TAsset,
  TTimeframe,
  TTimePoint,
  TSourceContext extends object,
  TProvenance extends object,
  TMarketData,
  TSourceLimitation,
  TFailureReason = CollectionFailureReason,
> {
  readonly collect: (
    request: CollectionRequest<
      TAsset,
      TTimeframe,
      TTimePoint,
      TSourceContext
    >,
  ) => CollectionResult<
    TMarketData,
    TSourceContext,
    TProvenance,
    TSourceLimitation,
    TFailureReason
  >;
}
