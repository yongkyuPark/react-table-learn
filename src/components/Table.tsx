import { Cell, ColumnInstance } from "react-table";
import Sorting from "./Sorting";

const Table = ({
  isSuccess,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
}: {
  isSuccess: boolean;
  getTableProps: () => any;
  getTableBodyProps: () => any;
  headerGroups: any[]; // 헤더 그룹 타입 지정 필요
  page: any[]; // 페이지 타입 지정 필요
  prepareRow: (row: any) => void;
}) => {
  return (
    <>
      {isSuccess ? (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: ColumnInstance) => (
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
                    {row.cells.map((cell: Cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  );
};

export default Table;
