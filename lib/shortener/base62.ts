const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(num: number) {
  let res = "";
  while (num > 0) {
    res = chars[num % 62] + res;
    num = Math.floor(num / 62);
  }
  return res;
}
