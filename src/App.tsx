import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import { FC } from "react";
import AllTodos from "./components/AllTodos";
import CatTodos from "./components/CatTodos";
import TodoAppProvider from "./state/TodoAppProvider";

const App: FC = () => {
  return (
    <TodoAppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<AllTodos />} />
            <Route path="/:categoryId" element={<CatTodos />} />
          </Route>
        </Routes>
      </HashRouter>
    </TodoAppProvider>
  );
};

export default App;
