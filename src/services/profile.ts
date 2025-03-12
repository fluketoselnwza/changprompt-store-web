import { axiosInstance } from "@/config/api";
import { IPartnerProfileResponse } from "@/services/interfaces";

export const getPartnerProfileService = async () => {
  const path = `/partners/profile`;
  const config = {};

  const response = await axiosInstance.get(path, config);

  return response.data as IPartnerProfileResponse;
};

export const updatePartnerProfileService = async (formData: FormData) => {
  const path = "/partners/profile";

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axiosInstance.put(path, formData, config);

  return response.data;
};
