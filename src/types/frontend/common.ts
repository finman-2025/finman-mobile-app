export type IMutateFunction<T> = (
  value: T,
  onSuccess?: () => void,
  onError?: () => void
) => Promise<any>;
