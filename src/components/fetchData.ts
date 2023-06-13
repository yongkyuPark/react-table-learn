import axios from "axios";
import { SortParams } from "../interface/GridInterface";

export const getApiData = async (
  page: number,
  pageSize: number,
  pageSortBy: SortParams[],
  url: string
) => {
  const offset = page * pageSize;
  let sortCol = "";
  let sortKind = "";
  let paramStr = "";
  pageSortBy.forEach((sortParams) => {
    console.log(sortParams);
    const sortyByDir = sortParams.desc ? "desc" : "asc";
    if (sortCol !== "") {
      sortCol += ",";
      sortKind += ",";
    }
    sortCol += sortParams.id;
    sortKind += sortyByDir;
  });
  // if (pageSortBy.length > 0) {
  //   const sortParams = pageSortBy[0];
  //   const sortyByDir = sortParams.desc ? "desc" : "asc";
  //   sortCol = sortParams.id;
  //   sortKind = sortyByDir;
  //   paramStr = `&sortCol=${sortParams.id}&sortKind=${sortyByDir}`;
  // }

  try {
    console.log("go api request");
    // 패치 사용
    // const response = await fetch(
    //   `http://localhost:3000/data/MOCK_DATA.json?pageNo=${page}&pageSize=${pageSize}${paramStr}`
    // );
    // const data = await response.json()

    // AXIOS 사용
    const response = await axios.get(url, {
      params: {
        pageNo: page,
        pageSize: pageSize,
        sortCol: sortCol,
        sortKind: sortKind,
      },
    });
    const data = response.data;

    // 목데이터 처리 위해서 임시로 customData 사용
    const customData = data.slice(pageSize * (page - 1), pageSize * page);

    return customData;
  } catch (e) {}
};
