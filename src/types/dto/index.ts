import { EXPENSE_TYPE, GENDER, REPORT_FILE_TYPE } from "@/constants";

export type Gender = `${GENDER}`;
export type ExpenseType = `${EXPENSE_TYPE}`;
export type ReportFileType = `${REPORT_FILE_TYPE}`;

export * from "./auth.dto";
export * from "./users.dto";
export * from "./categories.dto";
export * from "./expenses.dto";
export * from "./financial-tips.dto";
export * from "./receipt.dto";
export * from "./reports.dto";

export * from "./common/response.dto";
