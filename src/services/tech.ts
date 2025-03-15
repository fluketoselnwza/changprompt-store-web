import { axiosInstance } from "@/config/api";
import {
  ITechAllParams,
  ITechJobScheduleParams,
  ITechBlackListParams,
  ITechHistoryJobsParams,
  IAllTechResponse,
} from "./interfaces";
import { ITechProfileResponse } from "@/services/interfaces";

export const getAllTechService = async (params: ITechAllParams) => {
  const { tech_code, tech_name, tech_skill, skip = 1, take = 10 } = params;

  const path = `/partners/techs`;
  const query = `tech_code=${tech_code}&tech_name=${tech_name}&tech_skill=${tech_skill}&skip=${skip}&take=${take}`;
  const config = {};

  const urlPath = `${path}?${query}`;

  const response = await axiosInstance.get(urlPath, config);

  return response.data as IAllTechResponse;
};

export const getTechProfileService = async (techId: string) => {
  const path = `/partners/techs/${techId}`;
  const config = {};

  const response = await axiosInstance.get(path, config);

  return response.data as ITechProfileResponse;
};

export const updateTechProfileService = async (
  formData: FormData,
  techId: string
) => {
  const path = `/partners/techs/${techId}`;

  const config = {};

  const response = await axiosInstance.put(path, formData, config);

  return response.data;
};

export const deleteTechProfileService = async (techId: string) => {
  const path = `/partners/techs/${techId}`;

  const config = {};

  const response = await axiosInstance.delete(path, config);

  return response.data;
};

export const activeTechProfileService = async (
  status: boolean,
  techId: string
) => {
  const path = `/partners/techs/${techId}/set-active`;

  const config = {};

  const response = await axiosInstance.patch(
    path,
    { is_active: status },
    config
  );

  return response.data;
};

export const getTechWaitingApproveService = async (params: ITechAllParams) => {
  const { tech_code, tech_name, tech_skill, skip = 1, take = 10 } = params;

  const path = `/partners/techs/waiting-approval`;
  const query = `tech_code=${tech_code}&tech_name=${tech_name}&tech_skill=${tech_skill}&skip=${skip}&take=${take}`;
  const config = {};

  const urlPath = `${path}?${query}`;

  const response = await axiosInstance.get(urlPath, config);

  return response.data;
};

export const approveTechWaitingService = async (
  params: { status: string },
  techId: string
) => {
  const path = `/partners/techs/${techId}/approve`;

  const config = {};

  const response = await axiosInstance.patch(
    path,
    { status: params.status },
    config
  );

  return response.data;
};

export const getTechJobScheduleService = async (
  params: ITechJobScheduleParams
) => {
  const {
    job_code,
    customer_name,
    appointment_date,
    job_type,
    skip = 1,
    take = 10,
  } = params;

  const path = `/partners/techs/job-schedule`;
  const query = `job_code=${job_code}&customer_name=${customer_name}&appointment_date=${appointment_date}&job_type=${job_type}&skip=${skip}&take=${take}`;
  const config = {};

  const urlPath = `${path}?${query}`;

  const response = await axiosInstance.get(urlPath, config);

  return response.data;
};

export const getTechBlackListService = async (params: ITechBlackListParams) => {
  const {
    tech_code,
    tech_name,
    approved_date,
    inactivated_date,
    skip = 1,
    take = 10,
  } = params;

  const path = `/partners/techs/blacklist`;
  const query = `tech_code=${tech_code}&tech_name=${tech_name}&approved_date=${approved_date}&inactivated_date=${inactivated_date}&skip=${skip}&take=${take}`;
  const config = {};

  const urlPath = `${path}?${query}`;

  const response = await axiosInstance.get(urlPath, config);

  return response.data;
};

export const getTechHistoryJobsService = async (
  params: ITechHistoryJobsParams
) => {
  const {
    tech_code,
    tech_name,
    customer_name,
    job_created_date,
    service_date,
    skip = 1,
    take = 10,
  } = params;

  const path = `/partners/techs/history-jobs`;
  const query = `tech_code=${tech_code}&tech_name=${tech_name}&customer_name=${customer_name}&job_created_date=${job_created_date}&service_date=${service_date}&skip=${skip}&take=${take}`;
  const config = {};

  const urlPath = `${path}?${query}`;

  const response = await axiosInstance.get(urlPath, config);

  return response.data;
};
