import { ChangeEvent } from "react"
import Selectbox from "./Selectbox"
import Button from "./Button"
import Inputbox from "./Inputbox"

// Header -> 헤더에 나타날 명칭
// accessor -> 데이터 객체랑 매핑 될 변수 명
// Cell => 입력 안하면 디폴트 노출 입력하면 커스텀하여 노출
// width -> 셀의 넓이 지정 

export const COLUMNS = [
    {
        Header : 'Id',
        accessor : 'id',
        Cell: ({ row }: any) => (
          <div><a href={row.original.id} target="_blank" rel="noopener noreferrer">{row.original.id}</a></div>
        ),
    },
    {
        Header : 'First Name',
        accessor : 'first_name'
    },
    {
        Header : '링크 복사',
        accessor : '',
        Cell: ({ row }: any) => (
            <div style={{ textAlign: "center" }}><Button value={row.original.id}/></div>
        )
    },
    {
        Header : '전시 순서',
        accessor : 'displayNo',
        Cell: ({row}: any) => (
            <Inputbox value={row.original.displayNo || 0} row={row} />
        )
    },
    {
        Header : 'Last Name',
        accessor : 'last_name'
    },
    {
        Header : '사용여부',
        accessor : 'useYn',
        Cell: ({ row }: any) => (
            <div style={{ textAlign: "center" }}>
                <Selectbox value={row.original.useYn || 'N'} row={row} />
            </div>
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
        accessor : 'email',
        width: 200
    },
    {
        Header : '나이',
        accessor : 'age'
    }
]

