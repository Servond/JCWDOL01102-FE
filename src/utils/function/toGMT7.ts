import moment from "moment-timezone";

export const toGMT7 = (date: string) => {
  return moment(date).tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm:ss");
};
