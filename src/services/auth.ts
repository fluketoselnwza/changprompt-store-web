import { axiosInstance } from "@/config/api";
import { ILoginParams, ILoginResponse } from "@/services/interfaces";

export const loginService = async (params: ILoginParams) => {
  const path = "/partners/login";

  const config = {};

  const response = await axiosInstance.post(path, params, config);

  return response.data as ILoginResponse;
};
