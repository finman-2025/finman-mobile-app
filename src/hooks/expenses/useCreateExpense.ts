import { useCreateExpenseMutation } from "@/api/expenses";

import type { CreateExpenseDto, GetExpensesDto } from "@/types/dto";
import type { IMutateFunction } from "@/types/frontend";

import { useAppDispatch } from "../common";
import { success } from "@/store/reducers";

import { SUMMARY, TEXT } from "@/utils/text";

export const useCreateExpense = () => {
  const dispatch = useAppDispatch();

  const [createExpense, result] = useCreateExpenseMutation();

  const handleCreate = (
    value: CreateExpenseDto & { invalidateArg: GetExpensesDto },
    onSuccess?: () => void
  ) =>
    createExpense(value)
      .unwrap()
      .then(() => {
        onSuccess();
        dispatch(success({ message: SUMMARY.successfully(TEXT.create) }));
      });

  const res: [
    IMutateFunction<CreateExpenseDto & { invalidateArg: GetExpensesDto }>,
    typeof result
  ] = [handleCreate, result];
  return res;
};
