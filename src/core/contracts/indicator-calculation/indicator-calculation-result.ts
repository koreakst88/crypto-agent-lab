import type { Indicator } from "../../domain";
import type { CompleteResult } from "../../result";
import type { IndicatorCalculationError } from "./indicator-calculation-error";

export type IndicatorCalculationResult = CompleteResult<
  Indicator,
  IndicatorCalculationError
>;
