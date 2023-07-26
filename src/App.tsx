import { Routes, Route, BrowserRouter } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import { FC } from "react";
import AllTodos from "./components/AllTodos";
import CatTodos from "./components/CatTodos";
import TodoAppProvider from "./state/TodoAppProvider";

const App: FC = () => {
  return (
    <TodoAppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<AllTodos />} />
            <Route path="/:categoryId" element={<CatTodos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoAppProvider>
  );
};

export default App;
