import type { HTMLAttributes } from "react";
import type { Todo } from "../types";
type Option = {
  label: string;
  value: Todo["status"];
}
const options: Array<Option> = [
  { label: "Todo", value: "todo" },
  {
    label: "Inprogress",
    value: "inprogress",
  },
  {
    label: "Done",
    value: "done",
  },
];

type TodoStatusProps = {
    selected:Todo["status"],
    onChange:(status:Todo["status"])=> void,
    className?:string
} & HTMLAttributes<HTMLSelectElement>
function TodoStatus(props:TodoStatusProps) {
  return (
    <select className={props.className ?? ""} defaultValue={props.selected} onChange={(e)=> setTimeout(()=>props.onChange(e.target.value as Todo["status"]),0)}>
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

export default TodoStatus;
