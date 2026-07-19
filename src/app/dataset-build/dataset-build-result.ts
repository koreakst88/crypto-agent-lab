import type { MarketDataset } from "../../core/domain";
import type { CompleteResult } from "../../core/result";
import type { DatasetBuildError } from "./dataset-build-error";

export type DatasetBuildResult = CompleteResult<
  MarketDataset,
  DatasetBuildError
>;
