export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const SECOND_1 = 1;
export const SECOND_5 = 5;
export const SECOND_10 = 10;
export const SECOND_20 = 20;
export const SECOND_30 = 30;
export const MINUTE_1 = 60;
export const MINUTE_5 = 5 * MINUTE_1;
export const MINUTE_10 = 10 * MINUTE_1;
export const MINUTE_20 = 20 * MINUTE_1;
export const MINUTE_30 = 30 * MINUTE_1;
export const HOUR_1 = 60 * MINUTE_1;
export const DAY_1 = 24 * HOUR_1;
export const MONTH_1 = 30 * DAY_1;
export const MONTH_3 = 3 * MONTH_1;

export const TIME_CHANGE = {
  SECOND_1,
  SECOND_5,
  SECOND_10,
  SECOND_20,
  SECOND_30,
  MINUTE_1,
  MINUTE_5,
  MINUTE_10,
  MINUTE_20,
  MINUTE_30,
  HOUR_1,
};
export const TIME_SIZE = {
  MINUTE_5,
  MINUTE_30,
  HOUR_1,
  DAY_1,
  MONTH_1,
  MONTH_3,
};

export function setBeginDate(time = Date.now()): number {
  const timeDefault = new Date(Number(time));
  timeDefault.setHours(0);
  timeDefault.setMinutes(0);
  timeDefault.setSeconds(0);
  timeDefault.setMilliseconds(0);
  return timeDefault.valueOf();
}
export function setEndDate(time = Date.now()): number {
  const timeDefault = new Date(Number(time));
  timeDefault.setHours(24);
  timeDefault.setMinutes(0);
  timeDefault.setSeconds(0);
  timeDefault.setMilliseconds(0);
  return timeDefault.valueOf();
}
