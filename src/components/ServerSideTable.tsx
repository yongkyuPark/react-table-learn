import React, {useEffect} from "react";
import { CellProps, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { useQuery } from "react-query";
import { getApiData } from "./fetchData";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import TableContainer from "./TableContainer";
import Table from "./Table";
import Pagination from "./Pagination";
import ServerSideTableProps from "../interface/ServerSideTableInterface";
import StateProps from "../interface/TableStateInterface";
import ActionProps from "../interface/TableActionInterface";

const PAGE_CHANGED = "PAGE_CHANGED";
const PAGE_SIZE_CHANGED = "PAGE_SIZE_CHANGED";
const TOTAL_COUNT_CHANGED = "TOTAL_COUNT_CHANGED";
const PAGE_SORT_CHANGED = "PAGE_SORT_CHANGED";
let isInitialRender = true

// 상태 변할때 상태값 저장하는 로직
const reducer = (state: StateProps, { type, payload }: ActionProps) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload + 1,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    case PAGE_SORT_CHANGED:
      return {
        ...state,
        queryPageSortBy: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

const ServerSideTable: React.FC<ServerSideTableProps> = ({
  columns,
  pagingYn,
  pageSizeParam,
  urlParam
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
  ] = React.useReducer(reducer, initialState);

  const { isLoading, error, data, isSuccess } = useQuery(
    ["mock_data", queryPageIndex, queryPageSize, queryPageSortBy],
    () => getApiData(queryPageIndex, queryPageSize, queryPageSortBy, urlParam),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );
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
      getRowId: (row:any) => row.id
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
            )
          },
          ...columns
        ]);
      }
  );

  // 현재 선택중인 로우 가져오기 버튼
  const showClickElement = () => {
    console.log(selectedFlatRows.map((row) => row.original));
  };
  
  React.useEffect(() => {
    if(!isInitialRender){
      dispatch({ type: PAGE_CHANGED, payload: pageIndex });
    }else{
      isInitialRender = false
    }
  }, [pageIndex]);

  React.useEffect(() => {
    dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize });
    gotoPage(0);
  }, [pageSize, gotoPage]);

  useEffect(() => {
    dispatch({ type: PAGE_SORT_CHANGED, payload: sortBy });
    gotoPage(0);
  }, [sortBy, gotoPage]);

  React.useEffect(() => {
    console.log("useEff = " + data?.length); // 원래는 데이터 받아올때 totalCount 받아와서
    if (data?.length !== 0) {                // 넣어줘야 하는데 현재 목데이터로 처리중이기
      dispatch({                             // 때문에 목데이터 전체 갯수인 200개로 하드코딩 하는중
        type: TOTAL_COUNT_CHANGED,           // 추후에는 totalCount로 바꿔야 함
        payload: 200,
      });
    }
  }, [data?.length]);

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
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
        showClickElement={showClickElement}
      />
    </TableContainer>
  );
};

export default ServerSideTable;


