/* eslint-disable @typescript-eslint/no-explicit-any */
export const uniqObjectByKeepLast = (data: any, key: any) => {
  return [...new Map(data.map((x: any) => [key(x), x])).values()];
};
