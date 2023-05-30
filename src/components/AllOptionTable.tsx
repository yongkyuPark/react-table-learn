import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  CellProps,
  useBlockLayout,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { Checkbox } from "./Checkbox";
import { Styles } from "./TableStyles";

const Main = styled.div`
  padding: 20px;

  h1 {
    margin-bottom: 40px;

    span {
      color: #7c7c7c;
    }
  }

  > p {
    min-height: 21px;
  }
`;

const TableOptions = styled.div`
  margin: 5px;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: flex-end;
    gap: 20px;
  }

  .right {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }

  input {
    padding: 10px 15px;
    font-size: medium;
    border: 1px solid black;
    border-radius: 10px;
    outline: none;
    margin-left: 10px;
  }
`;

const PaginationOptionsBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .pageinfo {
    margin: 5px;
    display: flex;
    gap: 20px;
    align-items: center;
    color: #6d717a;
  }

  .pagination {
    display: flex;
    gap: 2px;

    button {
      padding: 10px 20px;
      background-color: transparent;
      border: none;
      border-radius: 5px;
      transition: all 0.3s ease 0s;
      border: 1px solid black;

      :disabled {
        box-shadow: none;
        color: #6d717a;
        border: 1px solid #d1d1d1;
      }
    }
  }
`;

interface SuperTableProps {
  pagingYn : boolean
  paramData : any[]
  columnsInfo : any[]
}

const SuperTable : React.FC<SuperTableProps> = ({pagingYn, paramData, columnsInfo}) => {

  const columns = useMemo(() => columnsInfo, []); // 칼럼정보
  const data = useMemo(() => paramData, []); // 실제 데이터
  // react-table 함수 선언
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    selectedFlatRows,
    rows,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      manualPagination: false // true면 서버 사이드 렌더링 , false면 클라이언트 사이드 렌더링
    },
    useBlockLayout,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((hookColumns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <Checkbox {...getToggleAllPageRowsSelectedProps()} />
            ),
            Cell: ({ row }: CellProps<any>) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
            sticky: "left",
            disableFilters: true,
            width: 50,
          },
          ...hookColumns,
        ];
      });
    }
  );
  // 페이지 Y/N에 따라 타입 분별
  let rowType = null;
  if(pagingYn){
    rowType = page
  }else{
    rowType = rows
  }
  
  // 현재 선택중인 로우 가져오기 버튼
  const showClickElement = () => {
    console.log(selectedFlatRows.map((row) => row.original))
  }

  const { pageIndex, pageSize } = state;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(rows.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main>
      <h1>
        User List <span>({total})</span>
      </h1>
      {pagingYn &&
      <TableOptions>
        <div className="left">
          <span className="pagesize">
            Show{" "}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 25, 50].map((pageSizeItem) => (
                <option key={pageSizeItem} value={pageSizeItem}>
                  {pageSizeItem}
                </option>
              ))}
            </select>
          </span>
        </div>
      </TableOptions>
      }

      <p>
        {selectedFlatRows.length > 0
          ? selectedFlatRows.length + " rows selected"
          : " "}
      </p>

      <div className="table">
        <Styles>
          <div {...getTableProps()} className="table sticky">
            <div className="header">
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="th"
                    >
                      <div className="cell">
                        <span> {column.render("Header")}</span>
                        <span className="sorticon">
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                        {JSON.stringify(column.filter)}

                        <div>
                          {column.id === "status"
                            ? column.render("Filter")
                            : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div {...getTableBodyProps()} className="body">
              {rowType.map((row) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()} className="tr">
                    {row.cells.map((cell) => (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render("Cell")}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Styles>
      </div>
      {pagingYn &&
      <PaginationOptionsBottom>
        <span className="pageinfo">
          Showing{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => showClickElement()}>showClickElement</button>

        <div className="pagination">
          <button
            type="button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <b>{"<<"}</b>
          </button>

          {pageOptions
            .filter((value) => value >= pageIndex - 2 && value <= pageIndex + 2)
            .map((pageNumber) => {
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => gotoPage(pageNumber)}
                  disabled={pageNumber === pageIndex}
                >
                  {pageNumber + 1}
                </button>
              );
            })}

          <button
            type="button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <b>{">>"}</b>
          </button>
        </div>
      </PaginationOptionsBottom>
      }
    </Main>
  );
}

export default SuperTable