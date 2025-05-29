import type { ExportReportDto, ReportFileDto } from "@/types/dto";
import API from "./base";

import { QUERY_TAG } from "@/constants";
import _ from "lodash";

const reportApi = API.injectEndpoints({
  endpoints: (build) => ({
    getExportedReports: build.query<ReportFileDto[], void>({
      query: () => "/exported_data_file",
      providesTags: [QUERY_TAG.REPORTS],
    }),
    exportReport: build.mutation<any, ExportReportDto>({
      query: (body) => ({
        url: "/exported_data_file/export_expenses",
        method: "POST",
        body,
      }),
      invalidatesTags: [QUERY_TAG.REPORTS],
    }),
  }),
  overrideExisting: true,
});

export const { useGetExportedReportsQuery, useExportReportMutation } =
  reportApi;
