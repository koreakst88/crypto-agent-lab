import type { Asset } from "./asset";
import type { MarketVenue } from "./market-venue";

export type TradingInstrumentId = string;

export type TradingInstrument = {
  readonly id: TradingInstrumentId;
  readonly baseAsset: Asset;
  readonly quoteAsset: Asset;
  readonly venue: MarketVenue;
  readonly venueSymbol: string;
};
