import { axiosInstance } from "@/config/api";
import { IAddressSearchResponse } from "@/services/interfaces";

export const getAddressService = async (q: string) => {
  const path = `/addresses/search`;
  const query = `q=${q}`;
  const config = {};

  const urlPath = `${path}?${query}`;

  const response = await axiosInstance.get(urlPath, config);

  return response.data.data as IAddressSearchResponse[];
};
