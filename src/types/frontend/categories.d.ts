import type { ExpenseType } from "../dto";
import type { IImageFile } from "./common";

export type ICreateCategory = {
  name: string;
  image?: IImageFile;
  limit?: string;
  type?: ExpenseType;
};
