export interface PipelineContract<
  TRequest extends object,
  TResult,
> {
  readonly execute: (request: TRequest) => TResult;
}
