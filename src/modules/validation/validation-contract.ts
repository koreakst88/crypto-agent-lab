import type { ValidationRequest } from "./validation-request";
import type {
  ValidationFailureReason,
  ValidationResult,
} from "./validation-result";

export interface ValidationContract<
  TMarketData,
  TSourceContext extends object,
  TProvenance extends object,
  TSourceLimitation,
  TAsset,
  TTimeframe,
  TValidationRule,
  TValidatedMarketData,
  TRejectedObservation,
  TValidationFinding,
  TNormalizationRecord,
  TQualityStatus,
  TFailureReason = ValidationFailureReason,
> {
  readonly validate: (
    request: ValidationRequest<
      TMarketData,
      TSourceContext,
      TProvenance,
      TSourceLimitation,
      TAsset,
      TTimeframe,
      TValidationRule
    >,
  ) => ValidationResult<
    TValidatedMarketData,
    TSourceContext,
    TProvenance,
    TRejectedObservation,
    TValidationFinding,
    TNormalizationRecord,
    TQualityStatus,
    TFailureReason
  >;
}
