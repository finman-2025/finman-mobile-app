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
      const tokenName =
        url === "/auth/refresh"
          ? TOKEN_NAME.REFRESH_TOKEN
          : TOKEN_NAME.ACCESS_TOKEN;

      const token = await getItem(tokenName);
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
              { url: "/auth/refresh", method: "POST" },
              api,
              extraOptions
            );
            if (refreshResult.data) {
              const tokens = refreshResult.data as LoginResDto;
              await Promise.all([
                setItem(TOKEN_NAME.ACCESS_TOKEN, tokens.accessToken),
                setItem(TOKEN_NAME.REFRESH_TOKEN, tokens.refreshToken),
              ]);
              result = await baseQuery(args, api, extraOptions);
            } else
              api.dispatch(
                error({
                  message: TEXT.sessionExpired,
                  onOk: async () => {
                    await Promise.all([
                      removeItem(TOKEN_NAME.ACCESS_TOKEN),
                      removeItem(TOKEN_NAME.REFRESH_TOKEN),
                    ]);
                    router.replace(PATH.LOGIN);
                  },
                })
              );
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
      api.dispatch(error({ message: errorData?.message }));
    }
  }
  return result;
};

const API = createApi({
  tagTypes: [QUERY_TAG.USERS, QUERY_TAG.CATEGORIES],
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

export default API;
