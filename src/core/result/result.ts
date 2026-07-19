export type ResultOutcome = "success" | "failure";

export type ResultValueState = "present" | "absent" | "partial";

export type ResultBase<
  TOutcome extends ResultOutcome,
  TValueState extends ResultValueState,
> = {
  readonly outcome: TOutcome;
  readonly valueState: TValueState;
};

export type SuccessResult<TValue = never> =
  | (ResultBase<"success", "absent"> & {
      readonly value?: never;
    })
  | ([TValue] extends [never]
      ? never
      :
          | (ResultBase<"success", "present"> & {
              readonly value: TValue;
            })
          | (ResultBase<"success", "partial"> & {
              readonly value: TValue;
            }));

export type FailureResult<TReason = string, TPartialValue = never> =
  | (ResultBase<"failure", "absent"> & {
      readonly reason: TReason;
      readonly value?: never;
    })
  | ([TPartialValue] extends [never]
      ? never
      : ResultBase<"failure", "partial"> & {
          readonly reason: TReason;
          readonly value: TPartialValue;
        });

export type Result<
  TValue = never,
  TReason = string,
  TPartialValue = TValue,
> = SuccessResult<TValue> | FailureResult<TReason, TPartialValue>;

export type CompleteResult<TValue, TReason = string> = Extract<
  Result<TValue, TReason, never>,
  | { readonly outcome: "success"; readonly valueState: "present" }
  | { readonly outcome: "failure"; readonly valueState: "absent" }
>;
