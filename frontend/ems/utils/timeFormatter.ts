export const timeFormatter = (time: string): string => {
  const formattedTimeArr = time.split(':').slice(0, 2);
  if (+formattedTimeArr[0] > 12) {
    formattedTimeArr[0] = `${+formattedTimeArr[0] - 12}`;
    return `${formattedTimeArr.join(':')} PM`;
  } else if (+formattedTimeArr[0] === 12) {
    formattedTimeArr[0] = `12`;
    return `${formattedTimeArr.join(':')} PM`;
  } else if (+formattedTimeArr[0] === 0) {
    formattedTimeArr[0] = `12`;
    return `${formattedTimeArr.join(':')} AM`;
  } else {
    formattedTimeArr[0] = `${+formattedTimeArr[0]}`;
    return `${formattedTimeArr.join(':')} AM`;
  }
};
