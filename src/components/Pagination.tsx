import { showClickElement } from "./GridEvent";

const Pagination = ({
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
          <button onClick={() => showClickElement(selectedFlatRows)}>
            showClickElement
          </button>
        </>
      ) : null}
    </>
  );
};

export default Pagination;
