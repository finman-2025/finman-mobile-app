import type { ExpenseType } from "../dto";

export type ICreateCategory = {
  name: string;
  image?: string;
  limit?: string;
  type?: ExpenseType;
};
