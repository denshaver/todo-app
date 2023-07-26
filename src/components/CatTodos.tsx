import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Plus, TrashCan } from "akar-icons";
import { useNavigate, useParams } from "react-router-dom";
import TodoItem from "./TodoItem";
import { useCategories, useTodos } from "../state/TodoAppProvider";
import { Todo } from "../interfaces";
import { nanoid } from "nanoid";

const colorsSelection = ["#EF4F4F", "#EFCC4F", "#5CEF4F", "#4FA2EF", "#C54FEF"];

const CatTodos: FC = () => {
  // States
  const [todoState, todoDispatch] = useTodos();
  const [categoriesState, categoriesDispatch] = useCategories();
  const [todoInput, setTodoInput] = useState<string>("");
  const [colorChangeMode, setColorChangeMode] = useState<boolean>(false);
  // Refs
  const menuRef = useRef<HTMLDivElement>(null);
  // Router
  const categoryId = useParams().categoryId;
  const navigate = useNavigate();
  const neededCategory = categoriesState.find(
    (category) => category.id === categoryId
  );
  useEffect(() => {
    if (!neededCategory) {
      navigate("/");
    }
  }, []);

  // Functions
  const handleTodoAdd = (event: FormEvent) => {
    event.preventDefault();
    if (!todoInput) {
      return;
    }

    const newTodo: Todo = {
      task: todoInput,
      id: nanoid(),
      isDone: false,
      categoryId: neededCategory?.id,
    };
    todoDispatch({ type: "add", payload: newTodo });
    setTodoInput("");
  };

  const handleTodoInputChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > 100) {
      return;
    }
    setTodoInput(event.currentTarget.value);
  };

  const handleCategoryColorChange = (color: string) => {
    if (!neededCategory) {
      return;
    }
    categoriesDispatch({
      type: "colorChange",
      payload: neededCategory.id,
      newColor: color,
    });
    setColorChangeMode(false);
  };

  const handleCategoryRemove = () => {
    if (!neededCategory) {
      return;
    }
    categoriesDispatch({ type: "removeCategory", payload: neededCategory.id });
    todoDispatch({ type: "removeCategoryTodos", payload: neededCategory.id });
    navigate("/");
  };

  // Outside click handle
  const handleOutsideClick = (event: MouseEvent) => {
    if (!menuRef.current?.contains(event.target as Node)) {
      setColorChangeMode(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  // Render
  return (
    <main>
      <div className="title">
        <h1>{neededCategory?.name}</h1>
        <TrashCan
          strokeWidth={1.5}
          size={20}
          color="#909090"
          onClick={handleCategoryRemove}
        />
        <div className="title-color-select" ref={menuRef}>
          <div
            className="color"
            style={{ background: neededCategory?.color }}
            onClick={() => setColorChangeMode((prev) => !prev)}
          ></div>
          {colorChangeMode && (
            <div className="color-choose-menu">
              {colorsSelection.map((colorHex) => (
                <div
                  className="color"
                  style={{ backgroundColor: colorHex }}
                  key={colorHex}
                  onClick={() => handleCategoryColorChange(colorHex)}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
      <form className="todo-form" onSubmit={handleTodoAdd}>
        <input
          type="text"
          placeholder="Add a new task"
          value={todoInput}
          onChange={handleTodoInputChange}
        />
        <button className="center">
          <Plus strokeWidth={2} size={20} color="white" />
        </button>
      </form>
      <div className="todos">
        {todoState
          .filter((todo) => todo.categoryId === neededCategory?.id)
          .map((todo) => (
            <TodoItem key={todo.id} id={todo.id} />
          ))}
      </div>
    </main>
  );
};

export default CatTodos;
