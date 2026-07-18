export type ValidationRule =
  | "empty-series"
  | "duplicate-timestamp"
  | "gap"
  | "overlap"
  | "invalid-timeframe"
  | "invalid-candle-boundary"
  | "invalid-decimal"
  | "invalid-ohlc"
  | "invalid-volume"
  | "inconsistent-instrument";
