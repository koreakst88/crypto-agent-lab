import type {
  DatasetId,
  MarketDataSeries,
  MarketValidationReport,
} from "../../domain";

export type DatasetPreparationRequest = {
  readonly datasetId: DatasetId;
  readonly series: MarketDataSeries;
  readonly validationReport: MarketValidationReport;
};
