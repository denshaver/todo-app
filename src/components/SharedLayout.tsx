import { FC, useEffect } from "react";
import Categories from "./Categories";
import { Outlet } from "react-router-dom";
import TodoAppProvider, {
  useCategories,
  useTodos,
} from "../state/TodoAppProvider";

const SharedLayout: FC = () => {
  const [todoState, todoDispatch] = useTodos();
  const [categoriesState, categoriesDispatch] = useCategories();

  useEffect(() => {
    const localTodos = localStorage.getItem("todoAppTodos");
    const localCategories = localStorage.getItem("todoAppCategories");
    if (localTodos) {
      todoDispatch({ type: "addLocalTodos", payload: JSON.parse(localTodos) });
    }
    if (localCategories) {
      categoriesDispatch({
        type: "addLocalCategories",
        payload: JSON.parse(localCategories),
      });
    }
  }, []);

  return (
    <div className="wrapper main-wrapper">
      <Categories />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
