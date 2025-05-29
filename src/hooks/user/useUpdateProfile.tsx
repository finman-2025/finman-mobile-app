import { router } from "expo-router";
import { useUpdateProfileMutation } from "@/api/user";

import type { IMutateFunction } from "@/types/frontend";
import type { UpdateUserDto } from "@/types/dto";

import { useAppDispatch } from "../common";
import { success } from "@/store/reducers";

import { SUMMARY, TEXT } from "@/utils/text";

export const useUpdateProfile = () => {
  const dispatch = useAppDispatch();

  const [updateProfile, result] = useUpdateProfileMutation();

  const handleUpdate = (data: UpdateUserDto) =>
    updateProfile(data)
      .unwrap()
      .then(() => {
        dispatch(success({ message: SUMMARY.successfully(TEXT.update) }));
        router.back();
      });

  const res: [IMutateFunction<UpdateUserDto>, typeof result] = [
    handleUpdate,
    result,
  ];
  return res;
};
