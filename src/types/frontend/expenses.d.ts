import type { ExpenseType } from "../dto";

export type ICreateExpense = {
  type: ExpenseType;
  value: string;
  description?: string;
  categoryId?: number;
  date?: Date;
};
