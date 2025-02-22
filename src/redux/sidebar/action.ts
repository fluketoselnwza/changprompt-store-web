import { Dispatch } from "redux";
import { OPEN_SIDEBAR, HIDE_SIDEBAR } from "./constant";
import { IHideSidebarAction, IOpenSidebarAction } from "./interface";

type ISidebarAction = IOpenSidebarAction | IHideSidebarAction;

export const hideSidebarAction = (dispatch: Dispatch<ISidebarAction>) => {
  dispatch({ type: HIDE_SIDEBAR });
};

export const openSidebarAction = (dispatch: Dispatch<ISidebarAction>) => {
  dispatch({ type: OPEN_SIDEBAR });
};
