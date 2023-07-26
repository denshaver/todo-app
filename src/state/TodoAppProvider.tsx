import { FC, createContext, useContext, useReducer } from "react";
import { Category, Todo } from "../interfaces";
import { TodoAction, todoReducer } from "./todoReducer";
import { CategoryAction, categoryReducer } from "./categoryReducer";

// ? State context

const TodosContext = createContext<
  [Todo[], React.Dispatch<TodoAction>] | undefined
>(undefined);
const CategoriesContext = createContext<
  [Category[], React.Dispatch<CategoryAction>] | undefined
>(undefined);

// ? Custom hooks

export function useTodos() {
  const todos = useContext(TodosContext);
  if (todos === undefined) {
    throw new Error("No todos were provided with context");
  }

  return todos;
}

export function useCategories() {
  const categories = useContext(CategoriesContext);

  if (categories === undefined) {
    throw new Error("No categories were provided with context");
  }

  return categories;
}

// ! Props and component
interface ProviderProps {
  children: JSX.Element;
}

const TodoAppProvider: FC<ProviderProps> = ({ children }) => {
  // ? States

  const [todosState, todosDispatch] = useReducer(todoReducer, []);
  const [categoriesState, categoriesDispatch] = useReducer(categoryReducer, []);

  return (
    <TodosContext.Provider value={[todosState, todosDispatch]}>
      <CategoriesContext.Provider value={[categoriesState, categoriesDispatch]}>
        {children}
      </CategoriesContext.Provider>
    </TodosContext.Provider>
  );
};

export default TodoAppProvider;
