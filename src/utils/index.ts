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
}