import moment from "moment-timezone";

export const extractTimeOnly = (utcTimeStr) => {
  const date = new Date(utcTimeStr);

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const getDate = (date) => {
  const timeZone = "Asia/Jakarta";
  return moment(date).tz(timeZone).format("YYYY-MM-DD");
};
