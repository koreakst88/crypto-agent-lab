export type IndicatorNumericValue = string;

export type IndicatorValue =
  | {
      readonly kind: "numeric";
      readonly value: IndicatorNumericValue;
    }
  | {
      readonly kind: "categorical";
      readonly value: string;
    };
