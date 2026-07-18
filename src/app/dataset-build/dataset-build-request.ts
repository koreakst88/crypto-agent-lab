import type { DatasetId, MarketDataSeries } from "../../core/domain";

export type DatasetBuildRequest = {
  readonly datasetId: DatasetId;
  readonly series: MarketDataSeries;
};
