export const calculateTotalDuration = (activities) => {
  const total = activities.reduce((acc, activity) => {
    const [hoursString, minutesString] = activity.duration.split(" jam ");

    const hours = parseInt(hoursString, 10);
    const minutes = minutesString ? parseInt(minutesString, 10) : 0;

    const durationInMinutes = hours * 60 + minutes;

    return acc + durationInMinutes;
  }, 0);

  return total;
};
