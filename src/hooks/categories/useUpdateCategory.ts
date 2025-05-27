import type { UpdateCategoryDto } from "@/types/dto";
import type { IMutateFunction } from "@/types/frontend";
import { useUpdateCategoryMutation } from "@/api/categories";

import { useAppDispatch } from "../common";
import { success } from "@/store/reducers";

import { SUMMARY, TEXT } from "@/utils/text";

export const useUpdateCategory = () => {
  const dispatch = useAppDispatch();

  const [updateCategory, result] = useUpdateCategoryMutation();

  const handleUpdate = (value: UpdateCategoryDto, onSuccess?: () => void) =>
    updateCategory(value)
      .unwrap()
      .then(() => {
        onSuccess();
        dispatch(success({ message: SUMMARY.successfully(TEXT.update) }));
      });

  const res: [IMutateFunction<UpdateCategoryDto>, typeof result] = [
    handleUpdate,
    result,
  ];
  return res;
};
