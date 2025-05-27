import type { ExpenseDto, FinancialTipDto } from "@/types/dto";
import API from "./base";

import { QUERY_TAG } from "@/constants";

const financialTipsApi = API.injectEndpoints({
  endpoints: (build) => ({
    getFinancialTips: build.query<FinancialTipDto[], void>({
      query: () => "/financial-tips",
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: QUERY_TAG.FINANCIAL_TIPS, id }))
          : [QUERY_TAG.FINANCIAL_TIPS],
    }),

    getFinancialTip: build.query<FinancialTipDto, number>({
      query: (id) => `/financial-tips/${id}`,
      providesTags: (res, err, id) => [{ type: QUERY_TAG.FINANCIAL_TIPS, id }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetFinancialTipsQuery, useGetFinancialTipQuery } =
  financialTipsApi;
