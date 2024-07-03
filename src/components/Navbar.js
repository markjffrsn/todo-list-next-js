"use client";

import Image from "next/image";
import logo from "../../public/logo.svg";
import add from "../../public/add.svg";
import edit from "../../public/edit.svg";
import editLight from "../../public/edit-light.svg";
import { useTodoListContext } from "@/context/TodoListContext";

export default function Navbar() {
  const {
    task,
    setTask,
    todoList,
    setTodoList,
    inputRef,
    isEdit,
    setIsEdit,
    id,
    setFilteredItem,
  } = useTodoListContext();

  const handleAdd = () => {
    if (task) {
      const payload = {
        id,
        task,
      };

      setTodoList((prev) => [...prev, payload]);
      setTask("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleEdit = () => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === task.id) {
        return { ...todo, task: task.task };
      }
      return todo;
    });

    localStorage.setItem("todolist", JSON.stringify(updatedTodoList));
    setTodoList(updatedTodoList);
    setTask("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setIsEdit(false);
  };

  const handleSearch = (searchTerm) => {
    setFilteredItem(
      todoList.filter((item) =>
        item.task.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <header className="mt-6">
      <nav className="flex items-center justify-between gap-x-4">
        <a className="flex items-center justify-center gap-x-2 md:gap-x-4">
          <Image src={logo} alt="Todo List Logo" width={32} height={32} />
          <span className="hidden text-2xl font-bold md:text-3xl md:block">
            Todo List
          </span>
        </a>

        <div className="w-full flex items-center justify-between gap-x-2 md:w-1/2">
          <div className="w-3/5 flex items-center justify-center gap-x-2 md:w-3/4">
            <input
              className="w-full border border-gray-400 rounded-xl p-2"
              type="text"
              placeholder="Search todo"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="w-3/4 flex items-center justify-end gap-x-2">
            <input
              className="w-full border border-gray-400 rounded-xl p-2"
              type="text"
              placeholder="Add todo"
              onChange={(e) => {
                const value = e.target.value;
                if (isEdit) {
                  setTask((prev) => ({ ...prev, task: value }));
                } else {
                  setTask(value);
                }
              }}
              ref={inputRef}
            />
            {!isEdit ? (
              <button
                className="flex items-center justify-center rounded-xl gap-x-1 p-2 bg-blue-500 transition duration-200 ease-in-out hover:bg-blue-400 md:px-6"
                onClick={handleAdd}
              >
                <Image src={add} alt="Add icon" width={24} height={24} />
                <span className="hidden text-white md:inline">Add</span>
              </button>
            ) : (
              <button
                className="relative flex items-center justify-center rounded-xl gap-x-1 p-2 bg-blue-500 transition duration-200 ease-in-out hover:bg-blue-400 md:px-6"
                onClick={handleEdit}
              >
                <Image src={editLight} alt="Edit icon" width={24} height={24} />
                <span className="hidden text-white md:inline">Edit</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
