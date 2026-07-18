import type { MarketTimestamp } from "../market-data";
import type { ValidationRule } from "./validation-rule";
import type { ValidationSeverity } from "./validation-severity";

export type ValidationFinding = {
  readonly rule: ValidationRule;
  readonly severity: ValidationSeverity;
  readonly message: string;
  readonly candleIndex?: number;
  readonly timestamp?: MarketTimestamp;
};
