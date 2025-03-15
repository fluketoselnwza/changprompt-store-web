import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  LoginPage,
  AllTasksPage,
  NewTaskPage,
  CommentAndReviewPage,
  AllUserPage,
  ChangePasswordPage,
  WaitingTechTaskPage,
  HistoryTaskPage,
  GetStorePage,
  AllTechnicianPage,
  ApprovalTechnicianPage,
  BlacklistTechnicianPage,
  HistoryTechnicianPage,
  ScheduleTechnicianPage,
  GetTechnicianPage,
} from "./pages";
import MainLayout from "./main-layout";
import { STATE_STATUS_MANAGE_USER } from "./pages/data/status-code";

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
              element={
                <NewTaskPage statusType={STATE_STATUS_MANAGE_USER.CREATE} />
              }
            />
            <Route
              path="/manage-task/all-tasks/detail-task/:job_id"
              element={
                <NewTaskPage statusType={STATE_STATUS_MANAGE_USER.GET} />
              }
            />
            <Route
              path="/manage-task/all-tasks/edit-task/:job_id"
              element={
                <NewTaskPage statusType={STATE_STATUS_MANAGE_USER.UPDATE} />
              }
            />
            <Route
              path="/manage-task/waiting-tech-task"
              element={<WaitingTechTaskPage />}
            />
            <Route
              path="/manage-task/history-task"
              element={<HistoryTaskPage />}
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
              path="/manage-user/change-password"
              element={<ChangePasswordPage />}
            />
            <Route
              path="/manage-store/get-store"
              element={
                <GetStorePage statusType={STATE_STATUS_MANAGE_USER.GET} />
              }
            />
            <Route
              path="/manage-store/update-store"
              element={
                <GetStorePage statusType={STATE_STATUS_MANAGE_USER.UPDATE} />
              }
            />
            <Route
              path="/manage-tech/all-technician"
              element={<AllTechnicianPage />}
            />

            <Route
              path="/manage-tech/all-technician/get-tech/:tech_id"
              element={
                <GetTechnicianPage statusType={STATE_STATUS_MANAGE_USER.GET} />
              }
            />
            <Route
              path="/manage-tech/approval-technician"
              element={<ApprovalTechnicianPage />}
            />
            <Route
              path="/manage-tech/backlist-technician"
              element={<BlacklistTechnicianPage />}
            />
            <Route
              path="/manage-tech/history-technician"
              element={<HistoryTechnicianPage />}
            />
            <Route
              path="/manage-tech/schedule-technician"
              element={<ScheduleTechnicianPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
