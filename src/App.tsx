import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  LoginPage,
  AllTasksPage,
  NewTaskPage,
  CommentAndReviewPage,
  AllUserPage,
  ResetPasswordPage,
} from "./pages";
import MainLayout from "./main-layout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LoginPage />} />

            <Route path="/manage-task/all-tasks" element={<AllTasksPage />} />
            <Route
              path="/manage-task/all-tasks/new-task"
              element={<NewTaskPage />}
            />
            <Route
              path="/manage-review/comment-and-review"
              element={<CommentAndReviewPage />}
            />
            <Route
              path="/manage-review/comment-and-review"
              element={<CommentAndReviewPage />}
            />
            <Route path="/manage-user/all-user" element={<AllUserPage />} />
            <Route
              path="/manage-user/reset-password"
              element={<ResetPasswordPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
