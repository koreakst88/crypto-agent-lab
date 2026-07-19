import type { MarketTimestamp } from "../market-data";
import type { IndicatorUnavailabilityReason } from "./indicator-availability";
import type { IndicatorValue } from "./indicator-value";

export type IndicatorMeasurement =
  | {
      readonly availability: "available";
      readonly timestamp: MarketTimestamp;
      readonly value: IndicatorValue;
    }
  | {
      readonly availability: "unavailable";
      readonly timestamp: MarketTimestamp;
      readonly reason: IndicatorUnavailabilityReason;
    };
