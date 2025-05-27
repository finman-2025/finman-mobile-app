import type { ExpenseType, CategoryDto } from ".";

export type ExpenseDto = {
  id: number;
  type: ExpenseType;
  value: number;
  description?: string;
  date: string;
  category?: Pick<CategoryDto, "id" | "name">;
};

export type CreateExpenseDto = {
  type: ExpenseType;
  value: number;
  date: Date;
  description?: string;
  categoryId?: number;
};

export type UpdateExpenseDto = Partial<CreateExpenseDto> &
  Pick<ExpenseDto, "id">;

export type GetExpensesDto = Partial<{
  categoryId: number;
  date: string;
}>;

export type ExpenseValueDto = {
  spent: number;
  earned: number;
};

export type GetTotalExpenseValueDto = {
  startDate?: string;
  endDate?: string;
  categoryId?: number;
};
