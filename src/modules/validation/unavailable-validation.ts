import type { ValidationContract } from "./validation-contract";
import type { ValidationRequest } from "./validation-request";
import type { ValidationResult } from "./validation-result";

export class UnavailableValidation<
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
> implements
    ValidationContract<
      TMarketData,
      TSourceContext,
      TProvenance,
      TSourceLimitation,
      TAsset,
      TTimeframe,
      TValidationRule,
      TValidatedMarketData,
      TRejectedObservation,
      TValidationFinding,
      TNormalizationRecord,
      TQualityStatus
    >
{
  readonly validate = (
    _request: ValidationRequest<
      TMarketData,
      TSourceContext,
      TProvenance,
      TSourceLimitation,
      TAsset,
      TTimeframe,
      TValidationRule
    >,
  ): ValidationResult<
    TValidatedMarketData,
    TSourceContext,
    TProvenance,
    TRejectedObservation,
    TValidationFinding,
    TNormalizationRecord,
    TQualityStatus
  > => ({
    outcome: "failure",
    valueState: "absent",
    reason: { kind: "validation-not-implemented" },
  });
}
