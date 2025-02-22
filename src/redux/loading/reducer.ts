import { OPEN_LOADING, CLOSE_LOADING } from "./constant";
import {
  ICloseLoadingAction,
  IOpenLoadingAction,
  IIsLoadingState,
} from "./interface";

const initState: IIsLoadingState = {
  isLoading: false,
};

type ILadingAction = IOpenLoadingAction | ICloseLoadingAction;

export default function onLoading(state = initState, action: ILadingAction) {
  switch (action.type) {
    case OPEN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CLOSE_LOADING:
      return {
        ...initState,
      };
    default:
      return state;
  }
}
