export type IndicatorDefinitionId = string;

export type IndicatorDefinitionVersion = string;

export type IndicatorOutputKind = "numeric" | "categorical";

export type IndicatorDefinition = {
  readonly definitionId: IndicatorDefinitionId;
  readonly version: IndicatorDefinitionVersion;
  readonly outputKind: IndicatorOutputKind;
};
