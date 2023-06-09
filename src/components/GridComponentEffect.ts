import { useEffect } from "react";

const PAGE_CHANGED = "PAGE_CHANGED";
const PAGE_SIZE_CHANGED = "PAGE_SIZE_CHANGED";
const TOTAL_COUNT_CHANGED = "TOTAL_COUNT_CHANGED";
const PAGE_SORT_CHANGED = "PAGE_SORT_CHANGED";
let isInitialRender = true;

export const useTotalCountEffect = (
  data: any,
  dispatch: React.Dispatch<{ type: string; payload: number }>
) => {
  useEffect(() => {
    console.log("useEff = " + data?.length); // 원래는 데이터 받아올때 totalCount 받아와서
    if (data?.length !== 0) {
      // 넣어줘야 하는데 현재 목데이터로 처리중이기
      dispatch({
        // 때문에 목데이터 전체 갯수인 200개로 하드코딩 하는중
        type: TOTAL_COUNT_CHANGED, // 추후에는 totalCount로 바꿔야 함
        payload: 200,
      });
    }
  }, [data?.length]);
};

export const usePageIndexEffect = (
  pageIndex: number,
  dispatch: React.Dispatch<{ type: string; payload: number }>
) => {
  useEffect(() => {
    if (!isInitialRender) {
      dispatch({ type: PAGE_CHANGED, payload: pageIndex });
    } else {
      isInitialRender = false;
    }
  }, [pageIndex]);
};

export const usePageSizeEffect = (
  pageSize: number,
  dispatch: React.Dispatch<{ type: string; payload: number }>,
  gotoPage: (page: number) => void
) => {
  useEffect(() => {
    dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize });
  }, [pageSize]);

  useEffect(() => {
    gotoPage(0);
  }, [pageSize, gotoPage]);
};

export const useSortByEffect = (
  sortBy: any,
  dispatch: React.Dispatch<{ type: string; payload: number }>
) => {
  useEffect(() => {
    dispatch({ type: PAGE_SORT_CHANGED, payload: sortBy });
    //gotoPage(0);
  }, [sortBy]);
};
