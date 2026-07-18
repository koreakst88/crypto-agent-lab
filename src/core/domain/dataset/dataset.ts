import type { MarketDataSeries } from "../market-data";
import type { ValidMarketValidationReport } from "../market-validation";
import type { DatasetId } from "./dataset-id";

export type MarketDataset = {
  readonly datasetId: DatasetId;
  readonly series: MarketDataSeries;
  readonly validationReport: ValidMarketValidationReport;
};
