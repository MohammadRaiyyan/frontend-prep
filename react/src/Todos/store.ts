import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Todo } from "./types";

export type TodoStore = {
    showTodoModal: boolean;
    setShowTodoModal: (state: boolean) => void;
    todos: Todo[];
    todoToUpdate?: Todo;
    editTodo: (todo: Todo) => void;
    addTodo: (todo: Todo) => void;
    removeTodo: (id: string) => void;
    updateTodo: (todo: Partial<Todo>) => void;
    setSearch: (value: string) => void
    search: string
};

export const useTodoStore = create<TodoStore>()(
    persist(
        (set) => ({
            todos: [],
            showTodoModal: false,
            setShowTodoModal: (state) => {
                set(() => ({
                    showTodoModal: state,
                }));
            },
            todoToUpdate: undefined,
            search: "",
            setSearch(value) {
                set(() => {
                    return {
                        search: value
                    }
                })
            },
            editTodo: (todo) => {
                set(() => ({
                    todoToUpdate: todo,
                    showTodoModal: todo ? true : false,
                }));
            },
            addTodo: (todo) =>
                set((state) => {
                    return {
                        todos: [...state.todos, todo],
                        showTodoModal: !state.showTodoModal,
                    };
                }),
            removeTodo: (id) =>
                set((state) => {
                    return {
                        todos: state.todos.filter((todo) => todo.id !== id),
                    };
                }),
            updateTodo: (newTodo) =>
                set((state) => {
                    const updatedTodo = state.todos.map((todo) => {
                        if (newTodo.id === todo.id) {
                            return {
                                ...todo,
                                ...newTodo,
                            };
                        }
                        return todo;
                    });
                    return {
                        todos: updatedTodo,
                        showTodoModal: state.showTodoModal && false,
                        todoToUpdate: undefined,
                    };
                }),
        }),
        { storage: createJSONStorage(() => localStorage), name: "todos" }
    )
)
