"use client";

import React, { createContext, useContext, useState, useRef } from "react";
import { nanoid } from "nanoid";

const TodoListContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const id = nanoid(3);
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [filteredItem, setFilteredItem] = useState(todoList);
  const themeRef = useRef();
  const [theme, setTheme] = useState(true);

  return (
    <TodoListContext.Provider
      value={{
        task,
        setTask,
        todoList,
        setTodoList,
        inputRef,
        isEdit,
        setIsEdit,
        id,
        filteredItem,
        setFilteredItem,
        themeRef,
        theme,
        setTheme,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoListContext = () => {
  return useContext(TodoListContext);
};
