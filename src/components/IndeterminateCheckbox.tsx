import { InputHTMLAttributes, forwardRef, useEffect, useRef } from "react";

interface IndeterminateCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    indeterminate?: boolean;
}

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
    ({ indeterminate, ...rest }, ref:any) => {
      const defaultRef = useRef<HTMLInputElement>(null);
      const resolvedRef = ref || defaultRef;
  
      useEffect(() => {
        if (resolvedRef.current) {
          resolvedRef.current.indeterminate = indeterminate || false;
        }
      }, [resolvedRef, indeterminate]);
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
);

export default IndeterminateCheckbox