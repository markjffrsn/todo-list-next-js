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
    themeRef,
    theme,
    setTheme,
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

  function handleTheme() {
    setTheme((prev) => !prev);

    const htmlElement = document.documentElement;
    const body = document.body;

    if (theme) {
      htmlElement.setAttribute("data-theme", "dark");
      body.classList.add("text-white");
    } else {
      htmlElement.setAttribute("data-theme", "light");
      body.classList.remove("text-white");
    }
  }

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
              className="input w-full border-gray-400"
              type="text"
              placeholder="Search todo"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="w-3/4 flex items-center justify-end gap-x-2">
            <input
              className="input w-full border-gray-400"
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
                className="flex items-center justify-center gap-x-1 btn bg-blue-500 hover:bg-blue-400"
                onClick={handleAdd}
              >
                <Image src={add} alt="Add icon" width={24} height={24} />
                <span className="hidden text-white md:inline">Add</span>
              </button>
            ) : (
              <button
                className="relative flex items-center justify-center gap-x-1 btn bg-blue-500 hover:bg-blue-400"
                onClick={handleEdit}
              >
                <Image src={editLight} alt="Edit icon" width={24} height={24} />
                <span className="hidden text-white md:inline">Edit</span>
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="grid cursor-pointer place-items-center">
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
              onClick={handleTheme}
            />
            <svg
              className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
      </nav>
    </header>
  );
}
