import type { MarketValidationReport } from "./validation-result";

export type ValidMarketValidationReport = MarketValidationReport & {
  readonly summary: MarketValidationReport["summary"] & {
    readonly status: "valid";
  };
};
