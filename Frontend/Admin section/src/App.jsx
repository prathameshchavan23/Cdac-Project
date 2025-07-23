import React, { useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/authSlice";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRouter";

// Common pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

// Admin layout + pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminMarks from "./pages/Admin/Marks";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminTimetable from "./pages/Admin/TimeTable";
import AdminAttendance from "./pages/Admin/Attendance";
import FeedbackDashboard from "./pages/Admin/FeedbackDashboard";
import FeedbackReports from "./pages/Admin/FeedbackReports";
import FeedbackForm from "./pages/Admin/Feedback";
import NotFoundPage from "./pages/NotFoundPage";

// Student layout + pages
import UserDashboard from "./pages/User/Dashboard";
import UserAttendance from "./pages/User/Attendance";
import UserFeedback from "./pages/User/Feedback";
import UserTimeTable from "./pages/User/Timetable";
import UserProfile from "./pages/User/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    // <Routes>
    //   {/* Public Routes */}
    //   <Route path="/" element={<LandingPage />} />
    //   <Route path="/login" element={<LoginPage />} />
    //   <Route path="/unauthorized" element={<UnauthorizedPage />} />

    //   {/* Admin Routes: Point to specific Admin components */}
    //   <Route element={<ProtectedRoute role="admin" />}>
    //     <Route path="/admin" element={<AppLayout role="admin" />}>
    //       <Route index element={<Navigate to="dashboard" replace />} />
    //       <Route path="dashboard" element={<AdminDashboard />} />
    //       <Route path="attendance" element={<AdminAttendance />} />
    //       <Route path="timetable" element={<AdminTimetable />} />
    //       <Route path="timetable" element={<AdminFeedback />} />
    //       <Route path="feedback" element={<AdminFeedbackDashboard />} />
    //       <Route path="feedback/reports" element={<AdminFeedbackReports />} />
    //     </Route>
    //   </Route>

    //   {/* User Routes: Point to specific User components */}
    //   <Route element={<ProtectedRoute role="user" />}>
    //     <Route path="/user" element={<AppLayout role="user" />}>
    //       <Route index element={<Navigate to="dashboard" replace />} />
    //       <Route path="dashboard" element={<UserDashboard />} />
    //       <Route path="profile" element={<UserProfile />} />
    //       <Route path="attendance" element={<UserAttendance />} />
    //       <Route path="timetable" element={<UserTimeTable />} />
    //       <Route path="feedback" element={<UserFeedback />} />
    //     </Route>
    //   </Route>

    //   {/* Not Found Route - Catches any other path */}
    //   <Route path="*" element={<NotFoundPage />} />
    // </Routes>

    // <RouterProvider router={router} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* A dedicated route for the LoginPage. */}
        <Route path="/login" element={<LoginPage />} />

        {/* --- Admin Routes --- */}
        {/* All routes starting with "/admin" will render inside the AppLayout component. */}
        {/* The 'role' prop is passed to AppLayout to ensure the correct sidebar is shown. */}
        <Route path="/staff" element={<AppLayout role="staff" />}>
          {/* The <Outlet/> in AppLayout will render these nested components */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="marks" element={<AdminMarks />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="timetable" element={<AdminTimetable />} />
          <Route path="feedback" element={<FeedbackForm />} />
          <Route path="feedback/dashboard" element={<FeedbackDashboard />} />
          <Route path="feedback/reports" element={<FeedbackReports />} />
        </Route>

        {/* --- User (Student) Routes --- */}
        {/* All routes starting with "/user" will also render inside the AppLayout. */}
        <Route path="/user" element={<AppLayout role="student" />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="attendance" element={<UserAttendance />} />
          <Route path="timetable" element={<UserTimeTable />} />
          <Route path="feedback" element={<UserFeedback />} />
        </Route>

        {/* A "catch-all" route that matches any URL not defined above.
          This is essential for showing a user-friendly 404 page.
        */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
