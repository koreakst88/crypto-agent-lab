import type { DatasetId } from "../dataset";
import type { MarketTimestamp } from "../market-data";
import type { TimeRange } from "../time-range";

export type IndicatorInput = {
  readonly datasetId: DatasetId;
  readonly usedRange: TimeRange<MarketTimestamp>;
};
