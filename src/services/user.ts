import { axiosInstance } from "@/config/api";
import {
  IPartnerUserParams,
  IPartnerUserResponse,
  IPartnerEmployeeCodeResponse,
  ICreatePartnerUserParam,
  IPartnerUserDetailResponse,
  IChangePasswordUserParams,
} from "@/services/interfaces";

export const getPartnerUserService = async (params: IPartnerUserParams) => {
  const {
    emp_code,
    emp_name,
    nickname,
    role_code,
    skip = 1,
    take = 10,
  } = params;

  const path = `/partners/users`;
  const query = `emp_code=${emp_code}&emp_name=${emp_name}&nickname=${nickname}&role_code=${role_code}&skip=${skip}&take=${take}`;
  const config = {};

  const urlPath = `${path}?${query}`;

  const response = await axiosInstance.get(urlPath, config);

  return response.data as IPartnerUserResponse;
};

export const getPartnerEmployeeCodeService = async () => {
  const path = "/partners/users/lastest";

  const config = {};

  const response = await axiosInstance.get(path, config);

  return response.data as IPartnerEmployeeCodeResponse;
};

export const createPartnerUserService = async (
  params: ICreatePartnerUserParam
) => {
  const path = "/partners/users";

  const config = {};

  const response = await axiosInstance.post(path, params, config);

  return response.data;
};

export const getPartnerUserDetailService = async (userId: string) => {
  const path = `/partners/users/${userId}`;

  const config = {};

  const response = await axiosInstance.get(path, config);

  return response.data as IPartnerUserDetailResponse;
};

export const deletePartnerUserService = async (userId: string) => {
  const path = `/partners/users/${userId}`;

  const config = {};

  const response = await axiosInstance.delete(path, config);

  return response.data;
};

export const resetPasswordUserService = async (userId: string) => {
  const path = `/partners/users/reset-password/${userId}`;

  const config = {};

  const response = await axiosInstance.put(path, {}, config);

  return response.data;
};

export const changePasswordUserService = async (
  params: IChangePasswordUserParams
) => {
  const path = `/partners/users/change-password`;

  const config = {};

  const response = await axiosInstance.put(path, params, config);

  return response.data;
};
