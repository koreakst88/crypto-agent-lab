import type { IndicatorDefinition } from "./indicator-definition";
import type { IndicatorInput } from "./indicator-input";
import type { IndicatorParameters } from "./indicator-parameters";
import type { IndicatorUnavailabilityReason } from "./indicator-availability";
import type { IndicatorSeries } from "./indicator-series";

type IndicatorBase = {
  readonly definition: IndicatorDefinition;
  readonly parameters: IndicatorParameters;
  readonly input: IndicatorInput;
};

export type Indicator =
  | (IndicatorBase & {
      readonly availability: "available";
      readonly series: IndicatorSeries;
    })
  | (IndicatorBase & {
      readonly availability: "unavailable";
      readonly reason: IndicatorUnavailabilityReason;
    });
