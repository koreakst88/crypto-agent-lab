import type { MarketDataset } from "../../domain";
import type { CompleteResult } from "../../result";
import type { DatasetPreparationError } from "./dataset-preparation-error";

export type DatasetPreparationResult = CompleteResult<
  MarketDataset,
  DatasetPreparationError
>;
