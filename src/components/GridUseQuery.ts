import { useQuery } from "react-query";
import { getApiData } from "./fetchData";
import { useQueryDataProps } from "../interface/GridInterface";

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
