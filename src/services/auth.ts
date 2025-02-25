import { axiosInstance } from "@/config/api";
import { ILoginParams, ILoginResponse } from "@/services/interfaces";

export const loginService = async (params: ILoginParams) => {
  const path = "/partners/login";

  const config = {};

  const response = await axiosInstance.post(path, params, config);

  return response.data as ILoginResponse;
};

export const refreshTokenService = async (refreshToken: string) => {
  const path = "/partners/refresh-token";

  console.log("refreshToken ==> ", refreshToken);

  const config = {};

  const response = await axiosInstance.post(
    path,
    { refresh_token: refreshToken },
    config
  );

  return response.data;
};
