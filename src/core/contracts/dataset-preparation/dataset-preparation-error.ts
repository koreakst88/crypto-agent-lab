import type { MarketValidationReport } from "../../domain";

export type DatasetPreparationError = {
  readonly kind: "validation-failed";
  readonly validationReport: MarketValidationReport & {
    readonly summary: MarketValidationReport["summary"] & {
      readonly status: "invalid";
    };
  };
};
