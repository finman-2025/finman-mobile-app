import { useCreateCategoryMutation } from "@/api/categories";

import type { CreateCategoryDto } from "@/types/dto";
import type { IMutateFunction } from "@/types/frontend";
import { useAppDispatch } from "../common";
import { success } from "@/store/reducers";

import { SUMMARY, TEXT } from "@/utils/text";

export const useCreateCategory = () => {
  const dispatch = useAppDispatch();

  const [createCategory, result] = useCreateCategoryMutation();

  const handleCreate = (value: CreateCategoryDto, onSuccess?: () => void) =>
    createCategory(value)
      .unwrap()
      .then(() => {
        onSuccess();
        dispatch(success({ message: SUMMARY.successfully(TEXT.create) }));
      });

  const res: [IMutateFunction<CreateCategoryDto>, typeof result] = [
    handleCreate,
    result,
  ];
  return res;
};
