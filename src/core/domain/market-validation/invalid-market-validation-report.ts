import type { MarketValidationReport } from "./validation-result";

export type InvalidMarketValidationReport = MarketValidationReport & {
  readonly summary: MarketValidationReport["summary"] & {
    readonly status: "invalid";
  };
};
