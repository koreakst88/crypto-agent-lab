import type { MarketDataset } from "../../domain";
import type { Result } from "../../result";
import type { DatasetPreparationError } from "./dataset-preparation-error";

export type DatasetPreparationResult = Result<
  MarketDataset,
  DatasetPreparationError,
  never
> &
  (
    | { readonly outcome: "success"; readonly valueState: "present" }
    | { readonly outcome: "failure"; readonly valueState: "absent" }
  );
