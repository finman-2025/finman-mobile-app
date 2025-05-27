import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import { DATE_FORMAT_DISPLAY } from "@/constants";

import _ from "lodash";

export const nameRegex =
  /^[A-Za-zÀÁÃẢẠÂẦẤẪẨẬĂẮẰẴẲẶĐÉÈẼẺẸÊẾỀỄỂỆÍÌĨỈỊÓÒÕỌÔỐỒỖỔỘƠỚỜỠỞỢÊẾỀỄỂỆÚÙŨỦỤƯỨỪỮỬỰÝỲỸỶỴàáãảạâầấẩậăắằẵẳặđéèẽẻẹêếềễểệíìĩỉịóòõỏọôốồỗổộơớờỡởợêếềễểệúùũủụưứừữửựýỳỹỷỵ\s]+$/;

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const arr = (length: number, from: number = 0) =>
  _.range(from, from + length);

export const checkNumber = (value: string) =>
  /^-?(0|[1-9]\d*)?\.?\d{0,9}$/.test(value);

export const toDateString = (
  date: Date | Dayjs | string,
  format?: string
): string => dayjs(date).format(format ?? DATE_FORMAT_DISPLAY);

export const toNumberString = (value: number): string => value.toLocaleString();

export const toMonthYearString = (date: Date): string =>
  `Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;

export const compareDate = (date1: Date, date2: Date): boolean =>
  dayjs(date1).isSame(dayjs(date2), "day");

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
