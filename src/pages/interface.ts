export interface IPageProps {
  openModalWarning: (
    image: string | null,
    title: string,
    description: string,
    labelBtnFirst?: string,
    fnBtnFirst?: () => void | null,
    labelBtnSecond?: string,
    fnBtnSecond?: () => void | null
  ) => void;
  closeModalWarning: () => void;
  openLoading?: () => void;
  closeLoading?: () => void;
}

export interface ISidebarProps {
  openSidebar: () => void;
  hideSidebar: () => void;
  isSidebar: boolean;
}

export interface ISidebarState {
  isSidebar: boolean;
}

export interface ISelectData {
  label: string;
  value: string;
}
