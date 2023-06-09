import React from "react";
import GridButton from "./Button";
import Inputbox from "./Inputbox";
import Selectbox from "./Selectbox";
import { CustomCellProps } from "../interface/GridInterface";

const CustomCell = ({ row, value, type }: CustomCellProps) => {
  switch (type) {
    case "link":
      return (
        <div>
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        </div>
      );
    case "button":
      return (
        <div style={{ textAlign: "center" }}>
          <GridButton value={value} />
        </div>
      );
    case "input":
      return <Inputbox value={value || 0} row={row} />;
    case "select":
      return (
        <div style={{ textAlign: "center" }}>
          <Selectbox value={value || "N"} row={row} />
        </div>
      );
    default:
      return <div>{value}</div>;
  }
};

export default CustomCell;
