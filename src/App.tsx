import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LoginPage, AllTasksPage, NewTaskPage } from "./pages";
import MainLayout from "./main-layout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/manage-task/all-tasks" element={<AllTasksPage />} />
            <Route path="/manage-task/new-task" element={<NewTaskPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
