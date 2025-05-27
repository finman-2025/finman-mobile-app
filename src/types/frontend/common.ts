export type IMutateFunction<T> = (
  value: T,
  onSuccess?: () => void,
  onError?: () => void
) => Promise<any>;

export type IOption = {
  value: number | string;
  label?: string;
};

export type IImageFile = { uri?: string; name?: string; type?: string };
