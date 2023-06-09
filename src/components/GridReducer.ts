import StateProps from "../interface/TableStateInterface";
import ActionProps from "../interface/TableActionInterface";

const PAGE_CHANGED = "PAGE_CHANGED";
const PAGE_SIZE_CHANGED = "PAGE_SIZE_CHANGED";
const TOTAL_COUNT_CHANGED = "TOTAL_COUNT_CHANGED";
const PAGE_SORT_CHANGED = "PAGE_SORT_CHANGED";

const gridReducer = (state: StateProps, { type, payload }: ActionProps) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload + 1,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    case PAGE_SORT_CHANGED:
      return {
        ...state,
        queryPageSortBy: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export default gridReducer;
