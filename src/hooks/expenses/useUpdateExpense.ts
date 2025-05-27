import { useUpdateExpenseMutation } from "@/api/expenses";

import type { UpdateExpenseDto } from "@/types/dto";
import type { IMutateFunction } from "@/types/frontend";

import { useAppDispatch } from "../common";
import { success } from "@/store/reducers";

import { SUMMARY, TEXT } from "@/utils/text";

export const useUpdateExpense = () => {
  const dispatch = useAppDispatch();

  const [createExpense, result] = useUpdateExpenseMutation();

  const handleCreate = (data: UpdateExpenseDto, onSuccess?: () => void) =>
    createExpense(data)
      .unwrap()
      .then(() => {
        onSuccess();
        dispatch(success({ message: SUMMARY.successfully(TEXT.create) }));
      });

  const res: [IMutateFunction<UpdateExpenseDto>, typeof result] = [
    handleCreate,
    result,
  ];
  return res;
};
