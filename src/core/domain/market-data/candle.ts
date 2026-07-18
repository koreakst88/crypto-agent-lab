/** Milliseconds elapsed since the Unix epoch, interpreted in UTC. */
export type MarketTimestamp = number;

/** Base-10 decimal text that preserves the value's source precision. */
export type DecimalValue = string;

export type OhlcvCandle = {
  /** Inclusive lower boundary in UTC epoch milliseconds. */
  readonly openTime: MarketTimestamp;
  /** Exclusive upper boundary in UTC epoch milliseconds; the candle spans [openTime, closeTime). */
  readonly closeTime: MarketTimestamp;
  readonly open: DecimalValue;
  readonly high: DecimalValue;
  readonly low: DecimalValue;
  readonly close: DecimalValue;
  readonly volume: DecimalValue;
};
