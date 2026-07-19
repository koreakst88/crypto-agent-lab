export type IndicatorParameterValue =
  | string
  | number
  | boolean
  | null
  | readonly IndicatorParameterValue[]
  | { readonly [name: string]: IndicatorParameterValue };

export type IndicatorParameters = Readonly<
  Record<string, IndicatorParameterValue>
>;
