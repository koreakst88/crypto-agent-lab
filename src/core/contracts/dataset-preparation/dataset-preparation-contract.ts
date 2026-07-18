import type { DatasetPreparationRequest } from "./dataset-preparation-request";
import type { DatasetPreparationResult } from "./dataset-preparation-result";

export interface DatasetPreparationContract {
  readonly prepare: (
    request: DatasetPreparationRequest,
  ) => DatasetPreparationResult;
}
