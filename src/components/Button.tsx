import { Button } from "antd";

interface ButtonProps {
  value: string;
}

const GridButton: React.FC<ButtonProps> = (props) => {
  const handelOnClick = (e: React.MouseEvent, value: string) => {
    console.log(value);
  };

  return (
    <div>
      <Button
        onClick={(e) => {
          handelOnClick(e, props.value);
        }}
        value={props.value}
      >
        복사
      </Button>
    </div>
  );
};

export default GridButton;
