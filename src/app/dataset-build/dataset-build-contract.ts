import type { DatasetBuildRequest } from "./dataset-build-request";
import type { DatasetBuildResult } from "./dataset-build-result";

export interface DatasetBuildContract {
  readonly build: (request: DatasetBuildRequest) => DatasetBuildResult;
}
