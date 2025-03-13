import { axiosInstance } from "@/config/api";
import { IBookbankResponse } from "@/services/interfaces";

export const getBookbankService = async () => {
  const path = `/master/bank`;
  const config = {};

  const response = await axiosInstance.get(path, config);

  return response.data as IBookbankResponse;
};
