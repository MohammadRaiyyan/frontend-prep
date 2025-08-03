import { useState, type FormEvent } from "react";
import InputWrapper from "../../components/ui/InputWrapper";
import { useTodoStore } from "../store";
import type { Todo } from "../types";
import TodoStatus from "./TodoStatus";

function AddTodoForm() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const todoToUpdate = useTodoStore((state) => state.todoToUpdate);
  const [state, setState] = useState<Omit<Todo, "id" | "createdAt">>(
    () =>
      todoToUpdate ?? {
        title: "",
        description: "",
        status: "todo",
      }
  );
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (state.title.length > 3) {
      if (todoToUpdate) {
        updateTodo({
          ...todoToUpdate,
          ...state,
        });
        return;
      }
      addTodo({
        id: Date.now().toString(),
        createdAt: new Date(),
        ...state,
      });
      setState({
        description: "",
        title: "",
        status: "todo",
      });
    } else {
      alert("Title should not be less than 3 characters!");
    }
  };

  const handleChange = (field: Partial<keyof typeof state>, value: string) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="p-4 max-w-4xl min-w-2xl w-full">
      <form
        onSubmit={onSubmit}
        className="flex items-center flex-col w-full gap-5"
      >
        <InputWrapper labelFor="title" label="Title">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter new Todo..."
            value={state.title}
            onChange={({ target: { value } }) => handleChange("title", value)}
          />
        </InputWrapper>
        <InputWrapper labelFor="description" label="Description">
          <textarea
            name="description"
            id="description"
            placeholder="Enter description"
            rows={3}
            value={state.description}
            onChange={({ target: { value } }) =>
              handleChange("description", value)
            }
          ></textarea>
        </InputWrapper>
        <InputWrapper labelFor="status" label="Status">
          <TodoStatus
            id="status"
            selected={state.status}
            onChange={(status) =>
              handleChange("status", status as Todo["status"])
            }
            className="w-full with-border full-height"
          />
        </InputWrapper>
        <button className="primary">{todoToUpdate ? "Update" : "Create"} Todo</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
