import { OPEN_SIDEBAR, HIDE_SIDEBAR } from "./constant";

export interface IIsSidebarState {
  isSidebar: boolean;
}

export interface IOpenSidebarAction {
  type: typeof OPEN_SIDEBAR;
}

export interface IHideSidebarAction {
  type: typeof HIDE_SIDEBAR;
}
