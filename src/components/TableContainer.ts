import styled from "styled-components";

const TableContainer = styled.div`
  .resizer {
    display: inline-block;
    background: white;
    width: 3px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;
    ${"" /* prevents from scrolling while dragging on touch devices */}
    touch-action:none;

    &.isResizing {
      background: red;
    }
  }
`;

export default TableContainer;
