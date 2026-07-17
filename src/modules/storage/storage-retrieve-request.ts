export type StorageRetrieveRequest<TRetrievalContext extends object> = {
  readonly retrievalContext: Readonly<TRetrievalContext>;
};
