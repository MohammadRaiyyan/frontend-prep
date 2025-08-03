import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen:VoidFunction
};
function Modal(props: ModalProps) {
  if (!props.isOpen) {
    return null;
  }
  return (
    <div onClick={props.setIsOpen} className="absolute inset-0 h-screen w-screen flex items-center justify-center p-5 bg-black/10 backdrop-blur-lg">
      <div onClick={e=> e.stopPropagation()} className="card w-max">{props.children}</div>
    </div>
  );
}

export default Modal;
