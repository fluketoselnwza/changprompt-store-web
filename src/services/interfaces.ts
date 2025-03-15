import { Dayjs } from "dayjs";

export interface ILoginParams {
  mobile_number: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  session_id: string;
  role_code: string;
  partner_code: string;
  partner_name: string;
}

export interface IRatingsData {
  job_code: string;
  rating_remark: string;
  customer_name: string;
  tech_name: string;
  rating_point: number;
}

export interface IPartnerRatingParams {
  job_code: string;
  customer_name: string;
  tech_name: string;
  job_started_date: string;
  skip?: number;
  take?: number;
}

export interface IPartnerRatingResponse {
  total_count: number;
  ratings: IRatingsData[];
}

export interface IPartnerUserParams {
  emp_code: string;
  emp_name: string;
  nickname: string;
  role_code: string;
  skip?: number;
  take?: number;
}

export interface IUserData {
  id: string;
  emp_code: string;
  full_name: string;
  nick_name: string;
  nation_id: string;
  mobile_phone: string;
  email: string;
  full_address: string;
  hire_date: string;
  role_code: string;
}

export interface IPartnerUserResponse {
  total_count: number;
  users: IUserData[];
}

export interface IPartnerEmployeeCodeResponse {
  emp_code: string;
}

export interface IAddressesData {
  address: string;
  sub_district_code: string;
  district_code: string;
  province_code: string;
  zipcode: string;
}

export interface ICreatePartnerUserParam {
  emp_code: string;
  role_code: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  nation_id: string;
  mobile_number: string;
  email: string;
  password: string;
  address_name: string;
  address_full_code: string;
}

export interface IPartnerUserDetailResponse {
  id: string;
  emp_code: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  mobile_number: string;
  role_code: string;
  nation_id: string;
  email: string;
  address: string;
  full_address: string;
  subdistrict_code: string;
  district_code: string;
  province_code: string;
  post_code: string;
  password: string;
}

export interface IPartnerJobParams {
  job_code: string;
  customer_name?: string;
  product_name?: string;
  tech_name?: string;
  job_type?: string;
  job_status: string;
  job_date?: string;
  skip: number;
  take?: number;
}

export interface IJobData {
  id: string;
  job_code: string;
  job_type: string;
  product_name: string;
  customer_name: string;
  technician_name: string;
  technician_mobile: string;
  create_by: string;
  created_at: string;
  create_by_name: string;
  job_status: string;
}

export interface IPartnerJobResponse {
  total_count: number;
  jobs: IJobData[];
}

export interface IChangePasswordUserParams {
  old_password: string;
  new_password: string;
  confirmed_new_password: string;
}

export interface IUpdatePartnerUserParams {
  role_code: string;
  first_name: string;
  last_name: string;
  nick_name: string;
  nation_id: string;
  mobile_number: string;
  email: string;
  address_name: string;
  address_full_code: string;
}

export interface IAddressSearchResponse {
  row_order: number;
  subdistrict_thai: string;
  district_thai: string;
  province_thai: string;
  post_code: string;
  subdistrict_code: string;
  district_code: string;
  province_code: string;
}

export interface IJobInquiryResponse {
  job_code: string;
  partner_name: string;
  create_by: string;
}

export interface IJobInfoData {
  job_code: string;
  partner_name: string;
  role_created_by?: string;
}

export interface IAddressInfoData {
  id?: string;
  address_name: string;
  address_full_code: string;
  address_full_name?: string;
  latitude: number;
  longitude: number;
}
export interface ICustomerInfoData {
  customer_id?: string;
  full_name: string;
  mobile_number: string;
  mobile_number_secondary: string;
  appointment_date: Dayjs;
  appointment_time: string;
  additional_information: string;
  distance: number;
  address: IAddressInfoData;
}

export interface IProductServiceInfoData {
  job_type: string;
  product: string;
  product_type: string;
  product_model: string;
  product_brand: string;
  serial_number: string;
  product_unit: string;
  status: string;
  remark: string;
  accessories: string;
}

export interface ITechServiceFeeInfoData {
  tech_id: string;
  tech_name?: string;
  tech_type: string;
  payment_type: string;
  wages: number;
}

export interface ICreateJobParams {
  job_info: IJobInfoData;
  customer_info: ICustomerInfoData;
  product_service_info: IProductServiceInfoData;
  tech_service_fee_info: ITechServiceFeeInfoData;
}

export interface IAddressInfoProfileData {
  id: string;
  address: string;
  full_address: string;
  full_address_code: string;
  sub_district_code: string;
  sub_district_name: string;
  district_code: string;
  district_name: string;
  province_code: string;
  province_name: string;
  zipcode: string;
  is_current_addr: boolean;
  is_regis_addr: boolean;
}

export interface IGeneralInfoProfileData {
  business_name: string;
  business_model: string;
  owner_name: string;
  mobile_number: string;
  mobile_spare: string;
  email: string;
  address: IAddressInfoProfileData;
}

export interface IFilesData {
  id: string;
  file_group: string;
  file_path: string;
  file_name: string;
}
export interface IOwnerInfoProfileData {
  id_card_number: string;
  account_number: string;
  bank_id: string;
  bank_code: string;
  bank_name: string;
  files: IFilesData[];
}

export interface IBusinessVerificationDocumentsProfileData {
  files: IFilesData[];
}

export interface ITrainingInfoProfileData {
  training_details: string[];
  files: IFilesData[];
}

export interface IServiceAreaInfoData {
  province_name: string;
  district_name: string;
  province_code: string;
  district_code: string;
}

export interface IPartnerProfileResponse {
  verification_status: string;
  general_info: IGeneralInfoProfileData;
  owner_info: IOwnerInfoProfileData;
  business_verification_documents: IBusinessVerificationDocumentsProfileData;
  training_info: ITrainingInfoProfileData;
  service_area_info: IServiceAreaInfoData;
}

export interface ITechNameData {
  id: string;
  tech_code: string;
  tech_name: string;
}
export interface IPartnerTechSearchNameResponse {
  tech_names: ITechNameData[];
}

export interface ICustomersData {
  id: string;
  customer_name: string;
  customer_nickname: string;
  mobile_number: string;
  mobile_spare: string;
}
export interface IGetCustomerResponse {
  customers: ICustomersData[];
}

export interface IGetJobResponse {
  job_info: IJobInfoData;
  customer_info: ICustomerInfoData;
  product_service_info: IProductServiceInfoData;
  tech_service_fee_info: ITechServiceFeeInfoData;
}

export interface IUpdateAssignTechParam {
  job_id: string;
  tech_id: string;
}

export interface IBookbankData {
  bank_code: string;
  bank_desc: string;
}

export interface IBookbankResponse {
  data: IBookbankData[];
}

export interface ITechAllParams {
  tech_name: string;
  tech_code: string;
  tech_skill: string;
  skip: number;
  take?: number;
}

export interface ITechJobScheduleParams {
  job_code: string;
  customer_name: string;
  appointment_date: string;
  job_type: string;
  skip: number;
  take?: number;
}

export interface ITechBlackListParams {
  tech_code: string;
  tech_name: string;
  approved_date: string;
  inactivated_date: string;
  skip: number;
  take?: number;
}

export interface ITechHistoryJobsParams {
  tech_code: string;
  tech_name: string;
  customer_name: string;
  job_created_date: string;
  service_date: string;
  skip: number;
  take?: number;
}

export interface IAllTechData {
  approved_by: string;
  full_name: string;
  mobile_number: string;
  nick_name: string;
  register_date: string;
  tech_code: string;
  tech_id: string;
  tech_skill: string;
}

export interface IAllTechResponse {
  total_count: number;
  techs: IAllTechData[];
}
