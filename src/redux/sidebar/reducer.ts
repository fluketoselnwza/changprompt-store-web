import { OPEN_SIDEBAR, HIDE_SIDEBAR } from "./constant";
import {
  IHideSidebarAction,
  IOpenSidebarAction,
  IIsSidebarState,
} from "./interface";

const initState: IIsSidebarState = {
  isSidebar: false,
};

type ILadingAction = IOpenSidebarAction | IHideSidebarAction;

export default function onLoading(state = initState, action: ILadingAction) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        isSidebar: true,
      };
    case HIDE_SIDEBAR:
      return {
        ...initState,
      };
    default:
      return state;
  }
}
