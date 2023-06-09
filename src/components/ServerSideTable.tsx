import React from "react";
import {
  CellProps,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import TableContainer from "./TableContainer";
import Table from "./Table";
import Pagination from "./Pagination";
import { ServerSideTableProps } from "../interface/GridInterface";
import gridReducer from "./GridReducer";
import {
  usePageIndexEffect,
  usePageSizeEffect,
  useSortByEffect,
  useTotalCountEffect,
} from "./GridComponentEffect";
import Error from "./Error";
import Loading from "./Loading";
import useQueryData from "./GridUseQuery";

const ServerSideTable: React.FC<ServerSideTableProps> = ({
  columns,
  pagingYn,
  pageSizeParam,
  urlParam,
}) => {
  // 초기값 설정
  const initialState = {
    queryPageIndex: 1,
    queryPageSize: pageSizeParam,
    totalCount: null,
    queryPageSortBy: [],
  };

  // 초기값 reduce에 저장
  const [
    { queryPageIndex, queryPageSize, totalCount, queryPageSortBy },
    dispatch,
  ] = React.useReducer(gridReducer, initialState);

  const { isLoading, error, data, isSuccess } = useQueryData({
    queryPageIndex,
    queryPageSize,
    queryPageSortBy,
    urlParam,
  });

  // 테이블 설정
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data: isSuccess ? data : [],
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
        sortBy: queryPageSortBy,
      },
      manualSortBy: true, // true일때는 serverside , false일때는 clientside
      manualPagination: true, // true일때는 serverside , false일때는 clientside
      pageCount: isSuccess ? Math.ceil(totalCount / queryPageSize) : undefined,
      autoResetSortBy: false,
      autoResetExpanded: false,
      autoResetPage: false,
      autoResetSelectedRows: false,
      getRowId: (row: any) => row.id,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }: CellProps<any>) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  usePageIndexEffect(pageIndex, dispatch);
  usePageSizeEffect(pageSize, dispatch, gotoPage);
  useSortByEffect(sortBy, dispatch);
  useTotalCountEffect(data, dispatch);

  if (error) {
    <Error />;
  }

  if (isLoading) {
    <Loading />;
  }

  return (
    <TableContainer>
      <Table
        isSuccess={isSuccess}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        page={page}
        prepareRow={prepareRow}
      />
      <Pagination
        isSuccess={isSuccess}
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pagingYn={pagingYn}
        selectedFlatRows={selectedFlatRows}
      />
    </TableContainer>
  );
};

export default ServerSideTable;
