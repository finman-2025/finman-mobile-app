import type { Gender } from ".";

export type UserDto = {
  id: number;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  gender?: Gender;
  birthday?: string;
  phone?: string;
  address?: string;
};
