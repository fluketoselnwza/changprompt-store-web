import { Dispatch } from "redux";
import { OPEN_MODAL, CLOSE_MODAL } from "./constant";
import {
  IModalWarningOption,
  IOpenModalAction,
  ICloseModalAction,
} from "./interface";

// Combined Action Type
type TModalAction = IOpenModalAction | ICloseModalAction;

export const closeModalWarning = (dispatch: Dispatch<TModalAction>) => {
  dispatch({ type: CLOSE_MODAL });
};

export const openModalWarning = (
  dispatch: Dispatch<TModalAction>,
  option: IModalWarningOption
) => {
  const openModal: IOpenModalAction = {
    type: OPEN_MODAL,
    // image, title, description, labelBtnFirst, fnBtnFirst, labelBtnSecond, fnBtnSecond
    ...option,
  };

  dispatch(openModal);
};
