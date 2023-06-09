import { SortParams } from "../components/fetchData";

export interface CustomCellProps {
  type: string;
  value: any;
  row: any;
}

export interface ServerSideTableProps {
  columns: any[];
  pagingYn: boolean;
  pageSizeParam: number;
  urlParam: string;
}

export interface ActionProps {
  type: string;
  payload: any;
}

export interface StateProps {
  queryPageIndex: number;
  queryPageSize: number;
  totalCount: number;
  queryPageSortBy: SortParams[];
}
