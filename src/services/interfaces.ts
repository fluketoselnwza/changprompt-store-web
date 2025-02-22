export interface ILoginParams {
  mobile_number: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  session_id: string;
}
