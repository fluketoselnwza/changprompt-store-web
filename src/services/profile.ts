import { axiosInstance } from "@/config/api";
import { IPartnerProfileResponse } from "@/services/interfaces";

export const getPartnerProfileService = async () => {
  const path = `/partners/profile`;
  const config = {};

  const response = await axiosInstance.get(path, config);

  return response.data as IPartnerProfileResponse;
};
