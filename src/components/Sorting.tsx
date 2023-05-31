import { ArrowUpOutlined } from '@ant-design/icons';
import { ArrowDownOutlined } from '@ant-design/icons';

interface SortingProps {
    column: any;
}

const Sorting: React.FC<SortingProps> = ({ column }) => (
    <span className="react-table__column-header sortable">
      {column.isSortedDesc === undefined ? (
        <>
          {/* <ArrowUpOutlined /> */}
        </>
      ) : (
        <span>
          {column.isSortedDesc ? (
            <ArrowDownOutlined />
          ) : (
            <ArrowUpOutlined />
          )}
        </span>
      )}
    </span>
);

export default Sorting