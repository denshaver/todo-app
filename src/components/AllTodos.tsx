import { FC, FormEvent, useState } from "react";
import { Plus } from "akar-icons";
import TodoItem from "./TodoItem";
import { useTodos } from "../state/TodoAppProvider";
import { nanoid } from "nanoid";
import { Todo } from "../interfaces";

const AllTodos: FC = () => {
  const [todoState, todoDispatch] = useTodos();
  const [todoInput, setTodoInput] = useState<string>("");

  const handleTodoAdd = (event: FormEvent) => {
    event.preventDefault();
    if (!todoInput) {
      return;
    }

    const newTodo: Todo = {
      task: todoInput,
      id: nanoid(),
      isDone: false,
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

  return (
    <main>
      <div className="title">
        <h1>All tasks</h1>
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
        {todoState.map((todo) => {
          return <TodoItem key={todo.id} id={todo.id} />;
        })}
      </div>
    </main>
  );
};

export default AllTodos;
