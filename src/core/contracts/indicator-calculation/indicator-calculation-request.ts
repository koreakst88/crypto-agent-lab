import type { MarketDataset } from "../../domain";

export type IndicatorCalculationRequest<
  TParameters extends object,
> = {
  readonly dataset: MarketDataset;
  readonly parameters: Readonly<TParameters>;
};
