import {} from "./interface";
import { USER_DATA } from "./constant";
import { IUserDataAction } from "./interface";

type IAction = IUserDataAction;

const initialState = {
  userData: null,
};

export const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.data,
      };
    default:
      return state;
  }
};
