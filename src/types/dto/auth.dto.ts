export type LoginReqDto = {
  username: string;
  password: string;
};

export type LoginResDto = {
  accessToken: string;
  refreshToken: string;
};
