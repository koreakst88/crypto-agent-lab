import type { Result } from "../../core/result";
import type { Provenance, SourceContext } from "../../core/domain";

export type CollectionStatus = "complete" | "partial";

export type SourceLimitations<TSourceLimitation> =
  readonly TSourceLimitation[];

export type CollectionOutput<
  TMarketData,
  TSourceContext extends object,
  TProvenance extends object,
  TSourceLimitation,
> = {
  readonly marketData: TMarketData;
  readonly sourceContext: SourceContext<TSourceContext>;
  readonly provenance: Provenance<TProvenance>;
  readonly status: CollectionStatus;
  readonly sourceLimitations: SourceLimitations<TSourceLimitation>;
};

export type CollectionFailureReason =
  | { readonly kind: "source-unavailable" }
  | { readonly kind: "incomplete-result" }
  | { readonly kind: "unsupported-scope" }
  | { readonly kind: "inconsistent-source-response" }
  | { readonly kind: "collection-interrupted" };

export type CollectionResult<
  TMarketData,
  TSourceContext extends object,
  TProvenance extends object,
  TSourceLimitation,
  TFailureReason = CollectionFailureReason,
> = Result<
  CollectionOutput<
    TMarketData,
    TSourceContext,
    TProvenance,
    TSourceLimitation
  >,
  TFailureReason,
  CollectionOutput<
    TMarketData,
    TSourceContext,
    TProvenance,
    TSourceLimitation
  >
>;
