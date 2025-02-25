import { axiosInstance } from "@/config/api";
import {
  IPartnerRatingParams,
  IPartnerRatingResponse,
} from "@/services/interfaces";

export const getPartnerRatingService = async (params: IPartnerRatingParams) => {
  const {
    job_code,
    customer_name,
    tech_name,
    job_started_date,
    skip = 1,
    take = 10,
  } = params;

  const path = `/partners/rating`;
  const query = `skip=${skip}&take=${take}&job_code=${job_code}&customer_name=${customer_name}&tech_name=${tech_name}&job_started_date=${job_started_date}`;
  const config = {};

  const urlPath = `${path}?${query}`;

  const response = await axiosInstance.get(urlPath, config);

  return response.data as IPartnerRatingResponse;
};
