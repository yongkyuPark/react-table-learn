import { ChangeEvent, useState } from "react";
import { Row } from 'react-table';

interface InputboxProps{
    value : string
    row : Row
}

const Inputbox: React.FC<InputboxProps> = (props) => {
    const [inputValue, setInputValue] = useState<string>(props.value);
  
    
    const handelChange = (e : ChangeEvent<HTMLInputElement>) => {
        const newValue: string = e.target.value;
        setInputValue(newValue);
        let copyArray = {...props.row.original};
        copyArray = {...props.row.original, displayNo: newValue}
        props.row.original = copyArray
    }
  
    return (
        <input type="text" value={inputValue} onChange={handelChange} style={inputStyle}/>
    );
};

// 인풋박스 사이즈 관련 임시 함수
const inputStyle = {
    width: '50px', // 원하는 너비로 조정
};

export default Inputbox