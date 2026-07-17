import type { Result } from "../../core/result";
import type { Provenance, SourceContext } from "../../core/domain";

export type RejectedObservations<TRejectedObservation> =
  readonly TRejectedObservation[];

export type ValidationFindings<TValidationFinding> =
  readonly TValidationFinding[];

export type ValidationOutput<
  TValidatedMarketData,
  TSourceContext extends object,
  TProvenance extends object,
  TRejectedObservation,
  TValidationFinding,
  TNormalizationRecord,
  TQualityStatus,
> = {
  readonly validatedMarketData: TValidatedMarketData;
  readonly sourceContext: SourceContext<TSourceContext>;
  readonly provenance: Provenance<TProvenance>;
  readonly rejectedObservations: RejectedObservations<TRejectedObservation>;
  readonly validationFindings: ValidationFindings<TValidationFinding>;
  readonly normalizationRecord: TNormalizationRecord;
  readonly qualityStatus: TQualityStatus;
};

export type ValidationFailureReason =
  | { readonly kind: "invalid-structure" }
  | { readonly kind: "impossible-value" }
  | { readonly kind: "temporal-inconsistency" }
  | { readonly kind: "identity-mismatch" }
  | { readonly kind: "duplicate-conflict" }
  | { readonly kind: "missing-required-context" }
  | { readonly kind: "validation-not-implemented" };

export type ValidationResult<
  TValidatedMarketData,
  TSourceContext extends object,
  TProvenance extends object,
  TRejectedObservation,
  TValidationFinding,
  TNormalizationRecord,
  TQualityStatus,
  TFailureReason = ValidationFailureReason,
> = Result<
  ValidationOutput<
    TValidatedMarketData,
    TSourceContext,
    TProvenance,
    TRejectedObservation,
    TValidationFinding,
    TNormalizationRecord,
    TQualityStatus
  >,
  TFailureReason,
  ValidationOutput<
    TValidatedMarketData,
    TSourceContext,
    TProvenance,
    TRejectedObservation,
    TValidationFinding,
    TNormalizationRecord,
    TQualityStatus
  >
>;
