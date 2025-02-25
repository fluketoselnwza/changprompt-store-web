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
