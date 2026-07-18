import type { OhlcvCandle } from "./candle";
import type { Timeframe } from "./timeframe";
import type { TradingInstrument } from "./trading-instrument";

export type MarketDataSeries = {
  readonly instrument: TradingInstrument;
  readonly timeframe: Timeframe;
  readonly candles: readonly OhlcvCandle[];
};
