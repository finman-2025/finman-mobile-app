import { router } from "expo-router";

import type { LoginReqDto } from "@/types/dto";
import type { IMutateFunction } from "@/types/frontend";
import { useLoginMutation } from "@/api/auth";
import { useAppDispatch } from "../common";
import { success } from "@/store/reducers";

import { PATH, TOKEN_NAME } from "@/constants";
import { SUMMARY, TEXT } from "@/utils/text";
import { setItem } from "@/utils/store-actions";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const [login, result] = useLoginMutation();

  const handleLogin = (value: LoginReqDto) =>
    login(value)
      .unwrap()
      .then(async ({ accessToken, refreshToken }) => {
        dispatch(success({ message: SUMMARY.successfully(TEXT.login) }));
        await Promise.all([
          setItem(TOKEN_NAME.ACCESS_TOKEN, accessToken),
          setItem(TOKEN_NAME.REFRESH_TOKEN, refreshToken),
        ]);
        router.replace(PATH.HOME);
      });

  const res: [IMutateFunction<LoginReqDto>, typeof result] = [
    handleLogin,
    result,
  ];
  return res;
};
