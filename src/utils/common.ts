import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import { DATE_FORMAT_DISPLAY, NUMBER_REGEX } from "@/constants";

import _ from "lodash";

export const arr = (length: number, from: number = 0) =>
  _.range(from, from + length);

export const checkNumber = (value: string) => NUMBER_REGEX.test(value);

export const toDateString = (
  date: Date | Dayjs | string,
  format?: string
): string => dayjs(date).format(format ?? DATE_FORMAT_DISPLAY);

export const toNumberString = (value: number): string => value.toLocaleString();

export const toMonthYearString = (date: Date): string =>
  `Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;

export const compareDay = (date1: Date, date2: Date): boolean =>
  dayjs(date1).isSame(dayjs(date2), "day");

export const getStartOfDay = (date: Date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
};

export const getEndOfDay = (date: Date) => {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
};

export const getFirstDateOfMonth = (date?: Dayjs | Date | string): Date =>
  dayjs(date ?? new Date())
    .startOf("month")
    .toDate();

export const getLastDateOfMonth = (date?: Dayjs | Date | string): Date =>
  dayjs(date ?? new Date())
    .endOf("month")
    .toDate();

export const getFirstDateNextMonth = (date?: Dayjs | Date | string): Date =>
  dayjs(date ?? new Date())
    .add(1, "month")
    .startOf("month")
    .toDate();

export const getFirstDatePrevMonth = (date?: Dayjs | Date | string): Date =>
  dayjs(date ?? new Date())
    .subtract(1, "month")
    .startOf("month")
    .toDate();

export const getAllDatesOfMonth = (date: Date): Date[] => {
  const daysInMonth = dayjs(date).daysInMonth();
  return _.range(1, daysInMonth + 1).map((day) =>
    dayjs(date).date(day).toDate()
  );
};

export const getNextDate = (offset: number): Date =>
  new Date(Date.now() + offset * 86400000);

export function removeEmpty(obj: any) {
  Object.keys(obj).forEach(
    (key) => (obj[key] === undefined || obj[key] === null) && delete obj[key]
  );
  return obj;
}
