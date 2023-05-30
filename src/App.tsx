import './App.css';
import BasicTable from './components/BasicTable';
import SortingTable from './components/SortingTable';
import PaginationTable from './components/PaginationTable';
import RowSelection from './components/RowSelection';
import AllOptionTable from './components/AllOptionTable';
import MOCK_DATA from "./components/MOCK_DATA.json";
import React, {useState} from "react";
import { COLUMNS } from "./components/columns";

function App() {
    const [data, setData] = useState(MOCK_DATA)
    const [column, setColumn] = useState(COLUMNS)
    return (
        <div>
            <AllOptionTable paramData={data} pagingYn={true} columnsInfo={column}/>
            <AllOptionTable paramData={data} pagingYn={false} columnsInfo={column}/>
        </div>
    );
}

export default App;
