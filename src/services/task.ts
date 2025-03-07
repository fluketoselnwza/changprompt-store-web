import { axiosInstance } from "@/config/api";
import {
  IPartnerJobParams,
  IPartnerJobResponse,
  IJobInquiryResponse,
  ICreateJobParams,
} from "./interfaces";

export const getPartnerAllTaskService = async (params: IPartnerJobParams) => {
  const {
    job_code,
    customer_name,
    product_name,
    job_type,
    job_status,
    skip = 1,
    take = 10,
  } = params;

  const path = `/partners/jobs`;
  const query = `job_code=${job_code}&customer_name=${customer_name}&product_name=${product_name}&job_type=${job_type}&job_status=${job_status}&skip=${skip}&take=${take}`;
  const config = {};

  const urlPath = `${path}?${query}`;

  const response = await axiosInstance.get(urlPath, config);

  return response.data as IPartnerJobResponse;
};

export const deletePartnerJobsService = async (jobId: string) => {
  const path = `/partners/jobs/${jobId}`;

  const config = {};

  const response = await axiosInstance.delete(path, config);

  return response.data;
};

export const getJobInquiryService = async () => {
  const path = `/partners/jobs/inquiry/latest`;

  const config = {};

  const response = await axiosInstance.get(path, config);

  return response.data as IJobInquiryResponse;
};

export const createJobService = async (params: ICreateJobParams) => {
  const path = "/partners/jobs";

  const config = {};

  const response = await axiosInstance.post(path, params, config);

  return response.data;
};
