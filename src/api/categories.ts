import type { CategoryDto } from "@/types/dto";
import API from "./base";

import { QUERY_TAG } from "@/constants";

const userApi = API.injectEndpoints({
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
  overrideExisting: true,
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = userApi;
