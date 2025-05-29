import { router } from "expo-router";
import type { ChangePasswordDto } from "@/types/dto";
import type { IMutateFunction } from "@/types/frontend";
import { useChangePasswordMutation } from "@/api/auth";

import { useAppDispatch } from "../common";
import { success } from "@/store/reducers";

import { SUMMARY, TEXT } from "@/utils/text";

export const useChangePassword = () => {
  const dispatch = useAppDispatch();

  const [changePassword, result] = useChangePasswordMutation();

  const handleChangePassword = (value: ChangePasswordDto) =>
    changePassword(value)
      .unwrap()
      .then(() => {
        dispatch(
          success({
            message: SUMMARY.successfully(SUMMARY.change(TEXT.password)),
          })
        );
        router.back();
      });

  const res: [IMutateFunction<ChangePasswordDto>, typeof result] = [
    handleChangePassword,
    result,
  ];
  return res;
};
