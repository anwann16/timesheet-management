import moment from "moment";

export const timeDifference = (start, end) => {
  const startTime = moment(start);
  const endTime = moment(end);

  const diffDuration = moment.duration(endTime.diff(startTime));
  const diffHours = Math.floor(diffDuration.asHours());
  const remainingMinutes = diffDuration.minutes();

  const result =
    remainingMinutes == 0
      ? `${diffHours} jam`
      : `${diffHours} jam ${remainingMinutes} menit`;

  return result;
};
