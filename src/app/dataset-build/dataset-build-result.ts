import type { MarketDataset } from "../../core/domain";
import type { Result } from "../../core/result";
import type { DatasetBuildError } from "./dataset-build-error";

export type DatasetBuildResult = Result<MarketDataset, DatasetBuildError, never> &
  (
    | { readonly outcome: "success"; readonly valueState: "present" }
    | { readonly outcome: "failure"; readonly valueState: "absent" }
  );
