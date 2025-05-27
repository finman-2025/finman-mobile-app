import type { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { router } from "expo-router";
import { Mutex } from "async-mutex";

import type { ExceptionDto, LoginResDto } from "@/types/dto";
import { error } from "@/store/reducers";

import { CONFIG } from "@/config";
import { HTTP_STATUS, PATH, QUERY_TAG, TOKEN_NAME } from "@/constants";
import { getItem, removeItem, setItem } from "@/utils/store-actions";
import { TEXT } from "@/utils/text";

const baseQuery = fetchBaseQuery({
  baseUrl: CONFIG.API_URL,
  prepareHeaders: async (headers, { arg }) => {
    const url: string = typeof arg === "string" ? arg : arg.url;

    if (url !== "/auth/login" && url !== "/auth/register") {
      const token = await getItem(TOKEN_NAME.ACCESS_TOKEN);
      if (token) headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const mutex = new Mutex();
const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    console.log(result.error);

    if (result.error.status === HTTP_STATUS.UNAUTHORIZED) {
      const refreshToken = await getItem(TOKEN_NAME.REFRESH_TOKEN);
      if (refreshToken) {
        if (!mutex.isLocked()) {
          const release = await mutex.acquire();
          try {
            const refreshResult = await baseQuery(
              { url: "/auth/refresh", method: "POST", body: { refreshToken } },
              api,
              extraOptions
            );
            if (refreshResult.error) {
              api.dispatch(
                error({
                  message: TEXT.sessionExpired,
                  onOk: async () => {
                    await Promise.all([
                      removeItem(TOKEN_NAME.ACCESS_TOKEN),
                      removeItem(TOKEN_NAME.REFRESH_TOKEN),
                    ]);
                    api.dispatch({ type: "RESET_STATES" });
                    router.replace(PATH.LOGIN);
                  },
                })
              );
            } else if (refreshResult.data) {
              const tokens = refreshResult.data as LoginResDto;
              await Promise.all([
                setItem(TOKEN_NAME.ACCESS_TOKEN, tokens.accessToken),
                setItem(TOKEN_NAME.REFRESH_TOKEN, tokens.refreshToken),
              ]);
              result = await baseQuery(args, api, extraOptions);
            }
          } finally {
            release();
          }
        } else {
          await mutex.waitForUnlock();
          result = await baseQuery(args, api, extraOptions);
        }
      } else router.replace(PATH.LOGIN);
    } else {
      const errorData = result.error.data as ExceptionDto;
      api.dispatch(error({ message: errorData?.message ?? TEXT.networkError }));
    }
  }
  return result;
};

const API = createApi({
  tagTypes: [
    QUERY_TAG.PROFILE,
    QUERY_TAG.CATEGORIES,
    QUERY_TAG.ANALYTICS,
    QUERY_TAG.EXPENSES,
    QUERY_TAG.TOTAL_EXPENSE,
    QUERY_TAG.FINANCIAL_TIPS,
  ],
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

export default API;
