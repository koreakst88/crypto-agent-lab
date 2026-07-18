import type { Timeframe, TradingInstrument } from "../market-data";
import type { DatasetId } from "./dataset-id";

export type DatasetSummary = {
  readonly datasetId: DatasetId;
  readonly instrument: TradingInstrument;
  readonly timeframe: Timeframe;
  readonly candleCount: number;
};
