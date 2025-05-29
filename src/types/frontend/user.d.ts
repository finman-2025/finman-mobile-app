import type { UpdateUserDto } from "../dto";

export type IUpdateUser = Omit<UpdateUserDto, "dateOfBirth"> & {
  dateOfBirth?: Date;
};
