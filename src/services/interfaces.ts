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
  addresses: IAddressesData;
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
  customer_name: string;
  product_name: string;
  job_type: string;
  job_status: string;
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
  create_by: string;
  created_at: string;
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
  address: string;
  subdistrict_code: string;
  district_code: string;
  province_code: string;
  post_code: string;
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
