import type {
  CategoryDto,
  CategoryWithExpenseValueDto,
  GetCategoriesWithSpentDto,
  UpdateCategoryDto,
} from "@/types/dto";
import API from "./base";

import { QUERY_TAG } from "@/constants";
import _ from "lodash";

const categoryApi = API.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<CategoryDto[], void>({
      query: () => "/categories",
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: QUERY_TAG.CATEGORIES, id }))
          : [QUERY_TAG.CATEGORIES],
    }),

    getCategoriesWithExpenseValue: build.query<
      CategoryWithExpenseValueDto[],
      GetCategoriesWithSpentDto
    >({
      query: (params) => ({
        url: "/categories/analytics",
        method: "GET",
        params,
      }),
      providesTags: (res, err, params) => [
        { type: QUERY_TAG.ANALYTICS, params },
      ],
    }),

    getCategory: build.query<CategoryDto, number>({
      query: (id) => `/categories/${id}`,
      providesTags: (res, err, id) => [{ type: QUERY_TAG.CATEGORIES, id }],
    }),

    createCategory: build.mutation<any, Partial<CategoryDto>>({
      query: (data) => {
        const body = new FormData();
        _.keysIn(data).forEach(
          (item) => data[item] && body.append(item, data[item])
        );
        return {
          url: "/categories",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [QUERY_TAG.CATEGORIES],
    }),

    updateCategory: build.mutation<any, UpdateCategoryDto>({
      query: ({ id, ...body }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (res, err, { id }) => [
        { type: QUERY_TAG.CATEGORIES, id },
      ],
    }),

    deleteCategory: build.mutation<any, number>({
      query: (id: number) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, err, id) => [{ type: QUERY_TAG.CATEGORIES, id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesWithExpenseValueQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
