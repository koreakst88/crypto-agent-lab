/** Fixed duration units: day is 24 hours and week is 7 days; no calendar alignment. */
export type TimeframeUnit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week";

/** One candle interval; TimeframeScope represents a collection of intervals. */
export type Timeframe = {
  readonly unit: TimeframeUnit;
  readonly value: number;
};
