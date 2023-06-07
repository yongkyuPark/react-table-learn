import { SortParams } from "../components/fetchData";

interface StateProps {
    queryPageIndex: number;
    queryPageSize: number;
    totalCount: number;
    queryPageSortBy: SortParams[];
}

export default StateProps

