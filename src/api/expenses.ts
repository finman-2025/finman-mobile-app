import type {
  CreateExpenseDto,
  ExpenseDto,
  ExpenseValueDto,
  GetExpensesDto,
  GetTotalExpenseValueDto,
  UpdateExpenseDto,
} from "@/types/dto";
import API from "./base";

import { QUERY_TAG } from "@/constants";
import { getFirstDateOfMonth, toDateString } from "@/utils/common";

const expenseApi = API.injectEndpoints({
  endpoints: (build) => ({
    getExpenses: build.query<ExpenseDto[], GetExpensesDto | void>({
      query: (params: GetExpensesDto = {}) => ({
        url: "/expenses",
        method: "GET",
        params,
      }),
      providesTags: (result, err, params) =>
        result
          ? result.map(({ id }) => ({ type: QUERY_TAG.EXPENSES, id }))
          : [{ type: QUERY_TAG.EXPENSES, params }],
    }),

    getTotalExpenseValue: build.query<
      ExpenseValueDto,
      GetTotalExpenseValueDto | void
    >({
      query: (params: GetTotalExpenseValueDto = {}) => ({
        url: "/expenses/total",
        method: "GET",
        params,
      }),
      providesTags: (res, err, params) => [
        { type: QUERY_TAG.TOTAL_EXPENSE, params },
      ],
    }),

    getExpense: build.query<ExpenseDto, number>({
      query: (id) => `/expenses/${id}`,
      providesTags: (res, err, id) => [{ type: QUERY_TAG.EXPENSES, id }],
    }),

    createExpense: build.mutation<
      any,
      CreateExpenseDto & { invalidateArg: GetExpensesDto }
    >({
      query: ({ invalidateArg, ...body }) => ({
        url: "/expenses",
        method: "POST",
        body,
      }),
      invalidatesTags: (res, err, { invalidateArg }) => {
        const startDate = toDateString(getFirstDateOfMonth(invalidateArg.date));
        const endDate = toDateString(getFirstDateOfMonth(invalidateArg.date));
        return [
          { type: QUERY_TAG.EXPENSES, invalidateArg },
          {
            type: QUERY_TAG.TOTAL_EXPENSE,
            params: { ...invalidateArg, startDate, endDate },
          },
          { type: QUERY_TAG.ANALYTICS, params: { startDate, endDate } },
        ];
      },
    }),

    updateExpense: build.mutation<any, UpdateExpenseDto>({
      query: ({ id, ...body }) => ({
        url: `/expenses/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (res, err, { id }) => [{ type: QUERY_TAG.EXPENSES, id }],
    }),

    deleteExpense: build.mutation<
      any,
      { id: number; invalidateArg: GetExpensesDto }
    >({
      query: ({ id }) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, err, { invalidateArg }) => {
        const startDate = toDateString(getFirstDateOfMonth(invalidateArg.date));
        const endDate = toDateString(getFirstDateOfMonth(invalidateArg.date));
        return [
          { type: QUERY_TAG.EXPENSES, invalidateArg },
          {
            type: QUERY_TAG.TOTAL_EXPENSE,
            params: { ...invalidateArg, startDate, endDate },
          },
          { type: QUERY_TAG.ANALYTICS, params: { startDate, endDate } },
        ];
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetExpensesQuery,
  useGetTotalExpenseValueQuery,
  useGetExpenseQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
