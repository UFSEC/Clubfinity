import { DateTime } from 'luxon';

export const DATE_PICKER_FORMAT = 'MMM D YYYY';
export const TIME_PICKER_FORMAT = 'hh:mm A';

export function combineAndParseDateTime(date, time) {
  const combined = `${date} ${time}`;
  return DateTime.fromFormat(combined, 'MMM d yyyy hh:mm a');
}

export function extractDateAndTime(dateTime) {
  return { date: dateTime.toFormat(DATE_PICKER_FORMAT), time: dateTime.toFormat(TIME_PICKER_FORMAT) };
}

export function formatToMonthAndDay(date) {
  const dateTime = DateTime.fromISO(date);
  return dateTime.toLocaleString({ month: 'short', day: 'numeric' });
}
