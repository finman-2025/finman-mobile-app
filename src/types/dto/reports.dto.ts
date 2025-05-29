import type { ReportFileType } from ".";

export type ReportFileDto = {
  fileName: string;
  url: string;
  createdAt: string;
};

export type ExportReportDto = {
  startDate: string;
  endDate: string;
  fileType: ReportFileType;
};
