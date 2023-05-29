import { ChangeEvent } from "react"
import Selectbox from "./Selectbox"

// Header -> 헤더에 나타날 명칭
// accessor -> 데이터 객체랑 매핑 될 변수 명

export const COLUMNS = [
    {
        Header : 'Id',
        accessor : 'id'
    },
    {
        Header : 'First Name',
        accessor : 'first_name'
    },
    {
        Header : 'Last Name',
        accessor : 'last_name'
    },
    {
        Header : '사용여부',
        accessor : 'useYn',
        Cell: ({ row }: any) => (
            <select value={row.original.useYn} onChange={handleSelectChange} >
              <option value="Y">Y</option>
              <option value="N">N</option>
            </select>
          ),
      
    },
    {
        Header : '생년월일',
        accessor : 'date_of_birth'
    },
    {
        Header : '국가',
        accessor : 'country'
    },
    {
        Header : '핸드폰번호',
        accessor : 'phone'
    },
    {
        Header : '이메일',
        accessor : 'email'
    },
    {
        Header : '나이',
        accessor : 'age'
    }
]

const handleSelectChange = (e : ChangeEvent<HTMLSelectElement>) => {
  console.log("test")
}