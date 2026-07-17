import type {
  AssetScope,
  SourceContext,
  TimeframeScope,
  TimeRange,
} from "../../core/domain";

export type CollectionRequest<
  TAsset,
  TTimeframe,
  TTimePoint,
  TSourceContext extends object,
> = {
  readonly assetScope: AssetScope<TAsset>;
  readonly timeframeScope: TimeframeScope<TTimeframe>;
  readonly timeRange: TimeRange<TTimePoint>;
  readonly sourceContext: SourceContext<TSourceContext>;
};
