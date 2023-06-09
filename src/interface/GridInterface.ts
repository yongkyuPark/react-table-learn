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

export interface useQueryDataProps {
  queryPageIndex: number;
  queryPageSize: number;
  queryPageSortBy: SortParams[];
  urlParam: string;
}

export interface SortParams {
  id: string;
  desc: boolean;
}

export interface SortingProps {
  column: any;
}
