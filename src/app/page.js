"use client";

import { useEffect } from "react";
import Image from "next/image";
import edit from "../../public/edit.svg";
import del from "../../public/delete.svg";
import noItem from "../../public/new.svg";
import { useTodoListContext } from "@/context/TodoListContext";

export default function Home() {
  const {
    setTask,
    todoList,
    setTodoList,
    inputRef,
    setIsEdit,
    filteredItem,
    setFilteredItem,
  } = useTodoListContext();

  useEffect(() => {
    try {
      const todo = localStorage.getItem("todolist");
      const finalTodo = todo ? JSON.parse(todo) : [];
      setTodoList(finalTodo);
    } catch (error) {
      console.log(error);
    }
  }, [setTodoList]);

  useEffect(() => {
    try {
      setFilteredItem(todoList);
      const isLastItem = localStorage.getItem("isLastItem");

      if (todoList.length > 0 || isLastItem) {
        localStorage.setItem("todolist", JSON.stringify(todoList));

        if (isLastItem) {
          localStorage.removeItem("isLastItem");
        }
      } else {
        console.log("empty");
      }
    } catch (error) {
      console.log(error);
    }
  }, [todoList, setFilteredItem]);

  const handleDelete = (propsId) => {
    if (filteredItem.length === 1) {
      localStorage.setItem("isLastItem", "true");
    }

    setTodoList((prev) => prev.filter((todo) => todo.id !== propsId));
  };

  const handleEdit = (propsId) => {
    setIsEdit(true);
    const currentItem = todoList.find((todo) => todo.id === propsId);

    if (currentItem) {
      if (inputRef.current) {
        inputRef.current.value = currentItem.task;
      }
      setTask(currentItem);
    }
  };

  return (
    <>
      {filteredItem.length > 0 ? (
        <main className="mt-9">
          {filteredItem.map((todo) => (
            <div
              className="flex items-center justify-between py-5 border-b border-b-gray-300"
              key={todo.id}
            >
              <h2 className="text-base font-medium md:text-lg">{todo.task}</h2>
              <div className="flex items-center justify-between gap-x-0">
                <button
                  className="w-9 h-9 grid place-items-center rounded-xl transition-[background-color] duration-150 ease-in-out hover:bg-amber-200"
                  onClick={() => handleEdit(todo.id)}
                >
                  <Image src={edit} alt="Edit Icon" width={24} height={24} />
                </button>
                <button
                  className="w-9 h-9 grid place-items-center rounded-xl transition-[background-color] duration-150 ease-in-out hover:bg-red-300"
                  onClick={() => handleDelete(todo.id)}
                >
                  <Image src={del} alt="Delete Icon" width={24} height={24} />
                </button>
              </div>
            </div>
          ))}
        </main>
      ) : (
        <section className="h-[80vh] flex items-center justify-center gap-2 flex-col text-lg">
          <div className="grid place-items-center">
            <Image src={noItem} alt="Note icon" width={36} height={36} />
            <h2 className="mt-4 font-bold">No items yet</h2>
            <p>Items will appear here.</p>
          </div>
        </section>
      )}
    </>
  );
}
