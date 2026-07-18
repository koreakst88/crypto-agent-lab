import type { InvalidMarketValidationReport } from "../../domain";

export type DatasetPreparationError = {
  readonly kind: "validation-failed";
  readonly validationReport: InvalidMarketValidationReport;
};
