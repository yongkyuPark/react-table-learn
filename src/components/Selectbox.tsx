import { ChangeEvent, useState } from "react";
import { Row } from "react-table";
import { Select, Space } from "antd";

const { Option } = Select;

interface SelectboxProps {
  value: string;
  row: Row;
  // options: string[];
  // setValue: (value: string) => void;
}

const Selectbox: React.FC<SelectboxProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState<string>(props.value);

  const handleOnChange = (newValue: string) => {
    setSelectedValue(newValue);
    let copyArray = { ...props.row.original };
    copyArray = { ...props.row.original, useYn: newValue };
    props.row.original = copyArray;
  };

  const handleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Space.Compact block>
      <Select
        onClick={(e) => {
          handleDropdown(e);
        }}
        onChange={handleOnChange}
        value={selectedValue}
      >
        <Option value="Y">Y</Option>
        <Option value="N">N</Option>
      </Select>
    </Space.Compact>
  );
};

export default Selectbox;
