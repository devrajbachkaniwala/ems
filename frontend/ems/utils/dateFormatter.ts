import { MonthEnum } from 'enums/monthEnum';
import { WeekEnum } from 'enums/weekEnum';

export const dateFormatter = (date: Date): string => {
  const formattedDate = `${WeekEnum[date.getDay()]}, ${
    MonthEnum[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
  return formattedDate;
};
