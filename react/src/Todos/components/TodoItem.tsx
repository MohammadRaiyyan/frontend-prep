import { Eye, Trash } from "lucide-react";
import type { TodoStore } from "../store";
import type { Todo } from "../types";
import TodoStatus from "./TodoStatus";

type TodoItemProps = {
  todo: Todo;
  updateTodo: TodoStore["updateTodo"];
  removeTodo: TodoStore["removeTodo"];
  editTodo: TodoStore["editTodo"]
};
function TodoItem(props: TodoItemProps) {
    const statusClass = props.todo.status === "inprogress" ? "in-progress" : props.todo.status === "done" ? "done" : "todo"
  return (
    <li data-status={props.todo.status} className={` hover:bg-zinc-800/50 rounded-md p-4 py-2 ${statusClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-5/6">
          <h4 className="text-xl font-bold">{props.todo.title}</h4>
          <p className="line-clamp-2">{props.todo.description}</p>
        </div>
        <div className="flex items-center gap-2 flex-1/6">
          <TodoStatus
            selected={props.todo.status}
            onChange={(status) => props.updateTodo({...props.todo, status:status as Todo["status"] })}
           
          />
          <button className="icon secondary" onClick={()=> props.editTodo(props.todo)}>
            <Eye size={16}/>
          </button>
          <button
            className="icon danger"
            onClick={() => props.removeTodo(props.todo.id)}
          >
            <Trash size={16}/>
          </button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;
