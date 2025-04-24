import type { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { router } from "expo-router";

import { CONFIG } from "@/config";
import { HTTP_STATUS, PATH, QUERY_TAG } from "@/constants";

const baseQuery = fetchBaseQuery({ baseUrl: CONFIG.API_URL });

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === HTTP_STATUS.UNAUTHORIZED) {
    router.replace(PATH.LOGIN);
  }
  return result;
};

const API = createApi({
  tagTypes: [QUERY_TAG.USERS, QUERY_TAG.CATEGORIES],
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

export default API;
