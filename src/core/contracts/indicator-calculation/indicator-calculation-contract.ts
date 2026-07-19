import type { IndicatorDefinition } from "../../domain";
import type { IndicatorCalculationRequest } from "./indicator-calculation-request";
import type { IndicatorCalculationResult } from "./indicator-calculation-result";

export interface IndicatorCalculationContract<
  TParameters extends object,
> {
  readonly definition: IndicatorDefinition;
  readonly calculate: (
    request: IndicatorCalculationRequest<TParameters>,
  ) => IndicatorCalculationResult;
}
