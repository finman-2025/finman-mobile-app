import { router } from "expo-router";

import type { RegisterDto } from "@/types/dto";
import type { IMutateFunction } from "@/types/frontend";
import { useRegisterMutation } from "@/api/auth";
import { useAppDispatch } from "../common";
import { success } from "@/store/reducers";

import { PATH } from "@/constants";
import { SUMMARY, TEXT } from "@/utils/text";

export const useRegister = () => {
  const dispatch = useAppDispatch();

  const [register, result] = useRegisterMutation();

  const handleRegister = (value: RegisterDto) =>
    register(value)
      .unwrap()
      .then(() => {
        dispatch(success({ message: SUMMARY.successfully(TEXT.register) }));
        router.replace(PATH.LOGIN);
      });

  const res: [IMutateFunction<RegisterDto>, typeof result] = [
    handleRegister,
    result,
  ];
  return res;
};
