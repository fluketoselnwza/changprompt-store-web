import { axiosInstance } from "@/config/api";
import {
  IPartnerUserParams,
  IPartnerUserResponse,
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
