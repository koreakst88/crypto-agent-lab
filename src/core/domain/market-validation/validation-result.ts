import type { ValidationFinding } from "./validation-finding";
import type { ValidationRule } from "./validation-rule";
import type { ValidationSummary } from "./validation-summary";

export type MarketValidationReport = {
  readonly summary: ValidationSummary;
  readonly checkedRules: readonly ValidationRule[];
  readonly findings: readonly ValidationFinding[];
};
