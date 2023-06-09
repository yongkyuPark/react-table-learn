import { useQuery } from "react-query";
import { SortParams, getApiData } from "./fetchData";

interface useQueryDataProps {
  queryPageIndex: number;
  queryPageSize: number;
  queryPageSortBy: SortParams[];
  urlParam: string;
}

const useQueryData = ({
  queryPageIndex,
  queryPageSize,
  queryPageSortBy,
  urlParam,
}: useQueryDataProps) => {
  return useQuery(
    ["mock_data", queryPageIndex, queryPageSize, queryPageSortBy],
    () => getApiData(queryPageIndex, queryPageSize, queryPageSortBy, urlParam),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );
};

export default useQueryData;
