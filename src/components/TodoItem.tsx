import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { TrashCan, Pencil, Check } from "akar-icons";
import { useCategories, useTodos } from "../state/TodoAppProvider";

interface TodoProps {
  id: string;
}

const TodoItem: FC<TodoProps> = ({ id }) => {
  // States
  const [todoState, todoDispatch] = useTodos();
  const [categoriesState] = useCategories();
  const neededTodo = todoState.find((todo) => todo.id === id);
  const neededCategory = categoriesState.find(
    (category) => category.id === neededTodo?.categoryId
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(
    neededTodo ? neededTodo.task : ""
  );
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Functions

  const handleTodoChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > 100) {
      return;
    }

    setEditInput(event.currentTarget.value);
    todoDispatch({
      type: "edit",
      payload: id,
      newTask: event.currentTarget.value,
    });
  };

  const handleTodoRemove = () => {
    todoDispatch({ type: "remove", payload: id });
  };

  const handleTodoDone = () => {
    todoDispatch({ type: "done", payload: id });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  // Render
  return (
    <div className="todo-item">
      <label className="todo-checkbox">
        <input
          type="checkbox"
          checked={neededTodo?.isDone}
          onChange={handleTodoDone}
        />
        <span className="checkmark"></span>
      </label>
      <div className="todo-main">
        {!editMode ? (
          <p className={neededTodo?.isDone ? "todo-text done" : "todo-text"}>
            {neededTodo?.task}
          </p>
        ) : (
          <input
            ref={inputRef}
            type="text"
            className="todo-text-input"
            value={editInput}
            onChange={handleTodoChange}
          />
        )}
        {neededTodo?.categoryId && (
          <span
            className="todo-category"
            style={{ background: neededCategory?.color }}
          >
            {neededCategory?.name}
          </span>
        )}
        {!editMode ? (
          <Pencil
            strokeWidth={2}
            size={20}
            color="#909090"
            onClick={() => setEditMode(true)}
          />
        ) : (
          <Check
            strokeWidth={2}
            size={20}
            color="#909090"
            onClick={() => {
              if (!editInput) {
                handleTodoRemove();
              }
              setEditMode(false);
            }}
          />
        )}
        <TrashCan
          strokeWidth={2}
          size={20}
          color="#909090"
          onClick={() => handleTodoRemove()}
        />
      </div>
    </div>
  );
};

export default TodoItem;
