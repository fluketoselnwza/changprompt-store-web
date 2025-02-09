/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHeaderTable {
  title: string;
  class: string;
}

export interface IBodyTable {
  key: string;
  data: string;
  renderCell?: any;
  className?: string;
}
