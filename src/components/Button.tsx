interface ButtonProps {
    value : string
}

const Button: React.FC<ButtonProps> = (props) => {

    const handelOnClick = (e :  React.MouseEvent, value:string) => {
        console.log(value)
    }

    return (
        <div><button onClick={(e) => {handelOnClick(e,props.value)}} value={props.value}>복사</button></div>
    );
};



export default Button