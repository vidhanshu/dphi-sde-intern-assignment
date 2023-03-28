const CHARS = "ABCDEFGHIJKLMNOPQRSUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomId = () => {
  let id: string = "";
  for (let i = 0; i < 10; i++) {
    id += CHARS[generateRadomNumber(0, 61)];
  }
  return id;
};

export const generateRadomNumber = (lo: number, hi: number) => {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
};

export const textShortner = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
};

export const computeDifference = (date: string) => {
  let y = new Date(date);
  let x = new Date();
  const diff = Math.abs(y.getTime() - x.getTime());
  if (diff <= 60000) {
    const val = Math.floor(diff / 1000);
    //checking if below minutes 60000ms is 60sec is 1 min
    return `${val} ${val > 1 ? "secs" : "sec"} ago`;
  } else if (diff <= 3600000) {
    const val = Math.floor(diff / 60000);
    //checking if below 3600000ms is 3600sec is  1 hr
    return `${val} ${val > 1 ? "mins" : "min"} ago`;
  } else if (diff <= 86400000) {
    const val = Math.floor(diff / 3600000);
    //checking if below  86400000ms is 86400sec is 24hr is 1 day
    return `${val} ${val > 1 ? "hrs" : "hr"} ago`;
  } else if (diff <= 604800000) {
    const val = Math.floor(diff / 86400000);
    //checking if below  604800000ms is 604800sec is 24*7hr is 7 days
    return `${val} ${val > 1 ? "days" : "day"} ago`;
  } else if (diff <= 2419200000) {
    const val = Math.floor(diff / 604800000);
    //checking if below  2419200000sm is 2419200sec is 672/hr is 1 month
    return `${val} ${val > 1 ? "weeks" : "week"} ago`;
  } else if (diff <= 29030400000) {
    const val = Math.floor(diff / 2419200000);
    //checking if below  29030400000sm is 29030400sec is 336days approx. 1 year
    return `${val} ${val > 1 ? "months" : "month"} ago`;
  } else {
    const val = Math.floor(diff / 29030400000);
    return `${val} ${val > 1 ? "yrs" : "yr"} ago`;
  }
};
