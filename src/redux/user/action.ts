import { Dispatch } from "redux";
import { USER_DATA } from "./constant";
import { IUserData } from "./interface";

export const userDataAction = (dispatch: Dispatch, body: IUserData | null) => {
  const userData = {
    type: USER_DATA,
    data: body,
  };

  dispatch(userData);
};
