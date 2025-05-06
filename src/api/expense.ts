import type { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { router } from "expo-router";

import { CONFIG } from "@/config";
import { HTTP_STATUS, PATH, QUERY_TAG } from "@/constants";
import { CategoryDto } from "@/types/dto";

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

const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: [QUERY_TAG.CATEGORIES],
  baseQuery: baseQueryWithInterceptor,
  endpoints: (build) => ({
    getCategories: build.query<CategoryDto[], void>({
      query: () => "/categories",
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: QUERY_TAG.CATEGORIES, id }))
          : [QUERY_TAG.CATEGORIES],
    }),

    getCategory: build.query<CategoryDto, number>({
      query: (id) => `/categories/${id}`,
      providesTags: (res, err, id) => [{ type: QUERY_TAG.CATEGORIES, id }],
    }),

    createCategory: build.mutation<any, Partial<CategoryDto>>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: [QUERY_TAG.CATEGORIES],
    }),

    updateCategory: build.mutation<
      any,
      Partial<CategoryDto> & Pick<CategoryDto, "id">
    >({
      query: ({ id, ...body }) => ({
        url: `/categories/${id}`,
        method: "PATH",
        body,
      }),
      invalidatesTags: (res, err, { id }) => [
        { type: QUERY_TAG.CATEGORIES, id },
      ],
    }),

    deleteCategory: build.mutation<
      any,
      Partial<CategoryDto> & Pick<CategoryDto, "id">
    >({
      query: ({ id, ...body }) => ({
        url: `/categories/${id}`,
        method: "PATH",
        body,
      }),
      invalidatesTags: (res, err, { id }) => [
        { type: QUERY_TAG.CATEGORIES, id },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
