import type { ValidationStatus } from "./validation-status";

export type ValidationSummary = {
  readonly status: ValidationStatus;
  readonly warningCount: number;
  readonly errorCount: number;
};
