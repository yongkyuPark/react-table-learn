import { showClickElement } from "./GridEvent";
import Pagination from "react-bootstrap/Pagination";
import { Select, Space } from "antd";

const { Option } = Select;

const GridPagination = ({
  isSuccess,
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
  pagingYn,
  selectedFlatRows,
}: {
  isSuccess: boolean;
  gotoPage: (page: number) => void;
  canPreviousPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  pagingYn: boolean;
  selectedFlatRows: any;
}) => {
  return (
    <>
      {isSuccess ? (
        <>
          {pagingYn && (
            <div className="pagination">
              <Pagination.First
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {/* {"<<"} */}
              </Pagination.First>{" "}
              <Pagination.Prev
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {/* {"<"} */}
              </Pagination.Prev>{" "}
              <Pagination.Next
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {/* {">"} */}
              </Pagination.Next>{" "}
              <Pagination.Last
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {/* {">>"} */}
              </Pagination.Last>{" "}
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
              <Select
                value={pageSize}
                onChange={(value) => {
                  setPageSize(Number(value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <Option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </Option>
                ))}
              </Select>
            </div>
          )}
          <button onClick={() => showClickElement(selectedFlatRows)}>
            showClickElement
          </button>
        </>
      ) : null}
    </>
  );
};

export default GridPagination;
