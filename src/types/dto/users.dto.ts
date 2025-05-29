import type { Gender } from ".";

export type UserDto = {
  id: number;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  sex?: Gender;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
};

export type UpdateUserDto = Partial<
  Pick<
    UserDto,
    "name" | "email" | "sex" | "phoneNumber" | "dateOfBirth" | "address"
  >
>;
