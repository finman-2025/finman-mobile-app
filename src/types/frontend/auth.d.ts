import type { ChangePasswordDto, RegisterDto } from "../dto";

export type IRegister = RegisterDto & {
  confirmPassword: string;
};

export type IChangePassword = ChangePasswordDto & {
  confirmNewPassword: string;
};
