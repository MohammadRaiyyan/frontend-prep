import { Plus } from "lucide-react";
import Modal from "../components/ui/Modal";
import AddTodoForm from "./components/AddTodoForm";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import { useTodoStore } from "./store";

function Todos() {
  const isOpen = useTodoStore(state=> state.showTodoModal)
  const setIsOpen = useTodoStore(state=> state.setShowTodoModal)
  return (
    <>
   
      <div className="w-full flex flex-col gap-5 relative h-[calc(100vh-40px)]">
         <Navbar/>
        <div className="absolute bottom-10 right-10 min-w-12">
          {" "}
          <button
            onClick={() => setIsOpen(true)}
            className="group primary w-max h-16 rounded-full p-4 transition-all"
            title="Create New Todo"
          >
            <span className="hidden group-hover:flex">Create Todo</span>
            <Plus />
          </button>
        </div>
        <TodoList />
      </div>
      <Modal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
        <AddTodoForm />
      </Modal>
    </>
  );
}

export default Todos;
