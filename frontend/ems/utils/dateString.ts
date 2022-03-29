export const dateString = (date: Date): string => {
  const formattedDateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return formattedDateString;
};
