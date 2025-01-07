import { Dispatch } from "redux";
import { OPEN_LOADING, CLOSE_LOADING } from "./constant";
import { ICloseLoadingAction, IOpenLoadingAction } from "./interface";

type ILadingAction = IOpenLoadingAction | ICloseLoadingAction;

export const closeLoading = (dispatch: Dispatch<ILadingAction>) => {
  dispatch({ type: CLOSE_LOADING });
};

export const openLoading = (dispatch: Dispatch<ILadingAction>) => {
  dispatch({ type: OPEN_LOADING });
};
