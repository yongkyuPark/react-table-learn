import { ChangeEvent } from "react";

interface SelectboxProps {
  data: string;
  onChange: (value: string) => void;
}

function Selectbox({ data, onChange }: SelectboxProps) {
  const handleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      onClick={(e) => {
        handleDropdown(e);
      }}
      onChange={handleOnChange}
      value={data}
    >
      <option value="Y" >Y</option>
      <option value="N">N</option>
    </select>
  );
}

export default Selectbox;
