import type { CollectionContract } from "./collection-contract";
import type { CollectionRequest } from "./collection-request";
import type { CollectionResult } from "./collection-result";

export class UnavailableCollection<
  TAsset,
  TTimeframe,
  TTimePoint,
  TSourceContext extends object,
  TProvenance extends object,
  TMarketData,
  TSourceLimitation,
> implements
    CollectionContract<
      TAsset,
      TTimeframe,
      TTimePoint,
      TSourceContext,
      TProvenance,
      TMarketData,
      TSourceLimitation
    >
{
  readonly collect = (
    _request: CollectionRequest<
      TAsset,
      TTimeframe,
      TTimePoint,
      TSourceContext
    >,
  ): CollectionResult<
    TMarketData,
    TSourceContext,
    TProvenance,
    TSourceLimitation
  > => ({
    outcome: "failure",
    valueState: "absent",
    reason: { kind: "source-unavailable" },
  });
}
