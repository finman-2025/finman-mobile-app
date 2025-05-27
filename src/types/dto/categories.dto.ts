import { ExpenseType, ExpenseValueDto } from ".";

export type CategoryDto = {
  id: number;
  name: string;
  image?: string;
  limit?: number;
  type?: ExpenseType;
};

export type CategoryWithExpenseValueDto = Pick<
  CategoryDto,
  "id" | "name" | "limit" | "type"
> & {
  expenseValue: ExpenseValueDto;
};

export type CreateCategoryDto = {
  name: string;
  limit: number;
  image?: string;
  type: ExpenseType;
};

export type UpdateCategoryDto = Partial<Omit<CreateCategoryDto, "type">> & {
  id: number;
};

export type GetCategoriesWithSpentDto = {
  startDate: string;
  endDate: string;
};
