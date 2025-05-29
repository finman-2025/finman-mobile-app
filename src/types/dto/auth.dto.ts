export type RegisterDto = {
  username: string;
  password: string;
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

export type ChangePasswordDto = {
  oldPassword: string;
  newPassword: string;
};
