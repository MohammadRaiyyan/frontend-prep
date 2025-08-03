import type { ReactNode } from "react";

type InputWrapperType = {
    label:string,
    labelFor:string,
    children:ReactNode
}
function InputWrapper(props:InputWrapperType) {
  return (
    <div className="w-full">
      <label htmlFor={props.labelFor} className="mb-2">
        {props.label}
      </label>
      {props.children}
    </div>
  );
}

export default InputWrapper;
