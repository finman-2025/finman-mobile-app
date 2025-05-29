import { useExportReportMutation } from "@/api/reports";

import type { IExportReport, IMutateFunction } from "@/types/frontend";

import { useAppDispatch } from "../common";
import { success } from "@/store/reducers";

import { SUMMARY, TEXT } from "@/utils/text";
import { DATE_FORMAT_DTO } from "@/constants";
import { toDateString } from "@/utils/common";

export const useExportReport = () => {
  const dispatch = useAppDispatch();

  const [exportReport, result] = useExportReportMutation();

  const handleExport = (value: IExportReport) =>
    exportReport({
      startDate: toDateString(value.startDate, DATE_FORMAT_DTO),
      endDate: toDateString(value.endDate, DATE_FORMAT_DTO),
      fileType: value.fileType,
    })
      .unwrap()
      .then(() =>
        dispatch(success({ message: SUMMARY.successfully(TEXT.exportReport) }))
      );

  const res: [IMutateFunction<IExportReport>, typeof result] = [
    handleExport,
    result,
  ];
  return res;
};
