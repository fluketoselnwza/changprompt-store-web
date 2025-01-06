import { CLOSE_MODAL, OPEN_MODAL } from "./constant";
export interface IModalWarningOption {
  image?: string | null;
  title?: string;
  description?: string;
  labelBtnFirst?: string;
  fnBtnFirst?: (() => void) | null;
  labelBtnSecond?: string;
  fnBtnSecond?: (() => void) | null;
}

export interface IModalState {
  isShow: boolean;
  image: string | null;
  title: string;
  description: string;
  labelBtnFirst: string;
  fnBtnFirst: (() => void) | null;
  labelBtnSecond: string;
  fnBtnSecond: (() => void) | null;
}

export interface IOpenModalAction {
  type: typeof OPEN_MODAL;
  image?: string | null;
  title?: string;
  description?: string;
  labelBtnFirst?: string;
  fnBtnFirst?: (() => void) | null;
  labelBtnSecond?: string;
  fnBtnSecond?: (() => void) | null;
}

export interface ICloseModalAction {
  type: typeof CLOSE_MODAL;
}
