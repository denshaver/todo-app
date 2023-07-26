import { Todo } from "../interfaces";

export type TodoAction =
  | { type: "addLocalTodos"; payload: Todo[] }
  | { type: "add"; payload: Todo }
  | { type: "remove"; payload: string }
  | { type: "removeCategoryTodos"; payload: string }
  | { type: "done"; payload: string }
  | { type: "edit"; payload: string; newTask: string };

export function todoReducer(state: Todo[], action: TodoAction) {
  switch (action.type) {
    case "addLocalTodos": {
      return action.payload;
    }
    case "add": {
      localStorage.setItem(
        "todoAppTodos",
        JSON.stringify([...state, action.payload])
      );
      return [...state, action.payload];
    }

    case "remove": {
      localStorage.setItem(
        "todoAppTodos",
        JSON.stringify(state.filter((todo) => todo.id !== action.payload))
      );
      return state.filter((todo) => todo.id !== action.payload);
    }

    case "removeCategoryTodos": {
      localStorage.setItem(
        "todoAppTodos",
        JSON.stringify(
          state.filter((todo) => todo.categoryId !== action.payload)
        )
      );
      return state.filter((todo) => todo.categoryId !== action.payload);
    }

    case "done": {
      const newState = state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      });
      localStorage.setItem("todoAppTodos", JSON.stringify(newState));
      return newState;
    }

    case "edit": {
      const newState = state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            task: action.newTask,
          };
        } else {
          return todo;
        }
      });
      localStorage.setItem("todoAppTodos", JSON.stringify(newState));
      return newState;
    }

    default: {
      return state;
    }
  }
}
