import { USER_DATA } from "./constant";

export interface IUserData {
  access_token: string;
  partner_code: string;
  partner_name: string;
  refresh_token: string;
  role_code: string;
  session_id: string;
}

export interface IUserDataAction {
  type: typeof USER_DATA;
  data: IUserData | null;
}
