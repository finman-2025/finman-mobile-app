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
