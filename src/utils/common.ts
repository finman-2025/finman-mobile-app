import _ from "lodash";

export const arr = (length: number, from: number = 0) =>
  _.range(from, from + length);
