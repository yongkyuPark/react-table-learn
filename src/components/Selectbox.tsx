import { ChangeEvent, useState } from "react";
import { Row } from 'react-table';

interface SelectboxProps {
  value: string
  row : Row
  // options: string[];
  // setValue: (value: string) => void;
}

const Selectbox: React.FC<SelectboxProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState<string>(props.value);

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue: string = event.target.value;
    setSelectedValue(newValue)
    let copyArray = {...props.row.original};
    console.log(props.row.original)
    copyArray = {...props.row.original, useYn: newValue}
    console.log(copyArray)
    props.row.original = copyArray
  };

  const handleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <select
      onClick={(e) => {
        handleDropdown(e);
      }}
      onChange={handleOnChange}
      value={selectedValue}
    >
      <option value="Y" >Y</option>
      <option value="N">N</option>
    </select>
  );
};

// function Selectbox: React.FC<SelectRendererProps> = SelectRendererProps) {
//   const handleDropdown = (e: React.MouseEvent) => {
//     e.stopPropagation();
//   };

//   const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     onChange(e.target.value);
//   };

//   return (
//     <select
//       onClick={(e) => {
//         handleDropdown(e);
//       }}
//       onChange={handleOnChange}
//       value={data}
//     >
//       <option value="Y" >Y</option>
//       <option value="N">N</option>
//     </select>
//   );
// }

export default Selectbox;
