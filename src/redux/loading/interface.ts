import { OPEN_LOADING, CLOSE_LOADING } from "./constant";

export interface IIsLoadingState {
  isLoading: boolean;
}

export interface IOpenLoadingAction {
  type: typeof OPEN_LOADING;
}

export interface ICloseLoadingAction {
  type: typeof CLOSE_LOADING;
}
