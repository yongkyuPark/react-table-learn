import React, { InputHTMLAttributes, forwardRef, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { CellProps, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import { useQuery } from "react-query";
import { getApiData } from "./fetchData";
import { Checkbox } from "./Checkbox";
import Sorting from "./Sorting";
import { SortParams } from "./fetchData";
import IndeterminateCheckbox from "./IndeterminateCheckbox";

const TableContainer = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

// 데이터 매핑 해주는 로직
const mockTrimData = (data = []) =>
  data.map(
    ({
      id,
      first_name,
      displayNo,
      last_name,
      useYn,
      date_of_birth,
      country,
      phone,
      email,
      age,
    }) => ({
      id,
      first_name,
      displayNo,
      last_name,
      useYn,
      date_of_birth,
      country,
      phone,
      email,
      age,
    })
  );

// 초기값 설정
const initialState = {
  queryPageIndex: 1,
  queryPageSize: 10,
  totalCount: null,
  queryPageSortBy: [],
};

const PAGE_CHANGED = "PAGE_CHANGED";
const PAGE_SIZE_CHANGED = "PAGE_SIZE_CHANGED";
const TOTAL_COUNT_CHANGED = "TOTAL_COUNT_CHANGED";
const PAGE_SORT_CHANGED = "PAGE_SORT_CHANGED";
let isInitialRender = true

interface StateProps {
  queryPageIndex: number;
  queryPageSize: number;
  totalCount: number;
  queryPageSortBy: SortParams[];
}

interface ActionProps {
  type: string;
  payload: any;
}

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

interface ServerSideTableProps {
  columns: any[];
  pagingYn: boolean;
}

const ServerSideTable: React.FC<ServerSideTableProps> = ({
  columns,
  pagingYn,
}) => {
  // 초기값 reduce에 저장
  const [
    { queryPageIndex, queryPageSize, totalCount, queryPageSortBy },
    dispatch,
  ] = React.useReducer(reducer, initialState);

  const { isLoading, error, data, isSuccess } = useQuery(
    ["mock_data", queryPageIndex, queryPageSize, queryPageSortBy],
    () => getApiData(queryPageIndex, queryPageSize, queryPageSortBy),
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
      data: isSuccess ? mockTrimData(data) : [],
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
      {isSuccess ? (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted ? <Sorting column={column} /> : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {pagingYn && (
            <div className="pagination">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>{" "}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>{" "}
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  value={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "100px" }}
                />
              </span>{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button onClick={() => showClickElement()}>showClickElement</button>
        </>
      ) : null}
    </TableContainer>
  );
};

export default ServerSideTable;
