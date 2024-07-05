"use client";

import { useEffect } from "react";
import Image from "next/image";
import editDark from "../../public/edit-dark.svg";
import editLight from "../../public/edit-light.svg";
import delDark from "../../public/delete-dark.svg";
import delLight from "../../public/delete-light.svg";
import newDark from "../../public/new-dark.svg";
import newLight from "../../public/new-light.svg";
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
    theme,
  } = useTodoListContext();

  useEffect(() => {
    try {
      const todo = localStorage.getItem("todolist");
      const finalTodo = todo && JSON.parse(todo);
      setTodoList(finalTodo);
    } catch (error) {
      console.log(error);
    }
  }, [setTodoList]);

  useEffect(() => {
    try {
      if (todoList === null) {
        setTodoList([]);
      }

      const isLastItem = localStorage.getItem("isLastItem");

      if ((todoList && todoList.length > 0) || isLastItem) {
        localStorage.setItem("todolist", JSON.stringify(todoList));

        if (isLastItem) {
          localStorage.removeItem("isLastItem");
        }

        setFilteredItem(todoList);
      } else {
        console.log("empty");
      }
    } catch (error) {
      console.log(error);
    }
  }, [todoList]);

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
      {filteredItem && filteredItem.length > 0 ? (
        <main className="mt-9">
          {filteredItem.map((todo) => (
            <div
              className="flex items-center justify-between py-8 border-b border-b-gray-300"
              key={todo.id}
            >
              <h2 className="text-base font-medium md:text-lg">{todo.task}</h2>
              <div className="flex items-center justify-between gap-x-2">
                <button
                  className="btn bg-transparent border-amber-500 hover:bg-transparent hover:border-amber-400"
                  onClick={() => handleEdit(todo.id)}
                >
                  <Image
                    src={theme ? editDark : editLight}
                    alt="Edit Icon"
                    width={24}
                    height={24}
                  />
                </button>
                <button
                  className="btn bg-transparent border-red-500 hover:bg-transparent hover:border-red-400"
                  onClick={() => handleDelete(todo.id)}
                >
                  <Image
                    src={theme ? delDark : delLight}
                    alt="Delete Icon"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
          ))}
        </main>
      ) : (
        <section className="h-[80vh] flex items-center justify-center gap-2 flex-col text-lg">
          <div className="grid place-items-center">
            <Image
              src={theme ? newDark : newLight}
              alt="Note icon"
              width={36}
              height={36}
            />
            <h2 className="mt-4 font-bold">No items yet</h2>
            <p>Items will appear here.</p>
          </div>
        </section>
      )}
    </>
  );
}
