import { ExpenseType, ExpenseValueDto } from ".";
import { IImageFile } from "../frontend";

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
  image?: IImageFile;
  type: ExpenseType;
};

export type UpdateCategoryDto = Partial<Omit<CreateCategoryDto, "type">> & {
  id: number;
};

export type GetCategoriesWithSpentDto = {
  startDate: string;
  endDate: string;
};
