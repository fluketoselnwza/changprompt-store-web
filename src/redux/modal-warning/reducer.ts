import { CLOSE_MODAL, OPEN_MODAL } from "./constant";
import { IModalState, IOpenModalAction, ICloseModalAction } from "./interface";

const initState: IModalState = {
  isShow: false,
  image: null,
  title: "",
  description: "",
  labelBtnFirst: "",
  fnBtnFirst: null,
  labelBtnSecond: "",
  fnBtnSecond: null,
};

type TModalAction = IOpenModalAction | ICloseModalAction;

export default function modalWarning(state = initState, action: TModalAction) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isShow: true,
        image: action.image || null,
        title: action.title || "",
        description: action.description || "",
        labelBtnFirst: action.labelBtnFirst || "",
        fnBtnFirst: action?.fnBtnFirst || null,
        labelBtnSecond: action.labelBtnSecond || "",
        fnBtnSecond: action?.fnBtnSecond || null,
      };
    case CLOSE_MODAL:
      return {
        ...initState,
      };
    default:
      return state;
  }
}
