export type ResponseDto<T> = {
  message: string;
  data: T;
};

export type ExceptionDto = {
  status: number;
  message: string;
};
