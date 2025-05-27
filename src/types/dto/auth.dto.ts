export type RegisterDto = {
  username: string;
  password: string;
  confirmPassword?: string;
  email: string;
  name: string;
};

export type LoginReqDto = {
  username: string;
  password: string;
};

export type LoginResDto = {
  accessToken: string;
  refreshToken: string;
};
