import { router } from "expo-router";

import type { IMutateFunction } from "@/types/frontend";
import { useLogoutMutation } from "@/api/auth";

import { PATH, TOKEN_NAME } from "@/constants";
import { removeItem } from "@/utils/store-actions";

export const useLogout = () => {
  const [logout, result] = useLogoutMutation();

  const handleLogout = () =>
    logout()
      .unwrap()
      .then(async () => {
        await Promise.all([
          removeItem(TOKEN_NAME.ACCESS_TOKEN),
          removeItem(TOKEN_NAME.REFRESH_TOKEN),
        ]);
        router.replace(PATH.LOGIN);
      });

  const res: [IMutateFunction<void>, typeof result] = [handleLogout, result];
  return res;
};
