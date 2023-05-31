import './App.css';
import BasicTable from './components/BasicTable';
import SortingTable from './components/SortingTable';
import PaginationTable from './components/PaginationTable';
import RowSelection from './components/RowSelection';
import AllOptionTable from './components/AllOptionTable';
import MOCK_DATA from "./components/MOCK_DATA.json";
import React, {useState} from "react";
import { COLUMNS } from "./components/columns";
import ServerSideTable from './components/ServerSideTable';
import { COLUMNS2 } from './components/columns2';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
    const [data, setData] = useState(MOCK_DATA) // 목 데이터
    const [column, setColumn] = useState(COLUMNS) // 목 데이터 칼럼
    const [column2, setColumn2] = useState(COLUMNS2) // 포켓몬 데이터 칼럼
    return (
        <div>
            {/* <AllOptionTable paramData={data} pagingYn={true} columnsInfo={column}/>
            <AllOptionTable paramData={data} pagingYn={false} columnsInfo={column}/> */}
            <QueryClientProvider client={queryClient}>
                <ServerSideTable columns={column}/>
                <ReactQueryDevtools initialIsOpen />
            </QueryClientProvider>
        </div>
    );
}

export default App;
