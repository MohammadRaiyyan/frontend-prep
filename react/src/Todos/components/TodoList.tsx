import { useMemo } from "react";
import { useTodoStore } from "../store";
import TodoItem from "./TodoItem";

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const searchTerm = useTodoStore((state) => state.search);
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, todos]);

  return (
    <ul className="card p-4 flex flex-col gap-2 max-h-[calc(100vh-120px)] overflow-y-auto">
      {filteredTodos.length ? (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
          />
        ))
      ) : (
        <div className="flex items-center justify-center text-sm text-zinc-500">
          No Todos Found!
        </div>
      )}
    </ul>
  );
}

export default TodoList;
