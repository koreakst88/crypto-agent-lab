import type { InvalidMarketValidationReport } from "../../core/domain";

export type DatasetBuildError = {
  readonly kind: "validation-failed";
  readonly validationReport: InvalidMarketValidationReport;
};
