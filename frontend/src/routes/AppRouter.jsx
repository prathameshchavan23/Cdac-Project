import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import NotFoundPage from "../pages/NotFoundPage";

// Admin Pages
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminStudents from "../pages/Admin/StudentsEditPage";
import AdminTimetable from "../pages/Admin/TimeTable";
import AdminAttendance from "../pages/Admin/Attendance";
import InstructorDetails from "../pages/Admin/InstructorDetails";
import AdminDetails from "../pages/Admin/AdminDetails";
import ModulesPage from "../pages/Admin/ModulesPage";
import LostandFound from "../pages/Admin/LostandFound";

import Feedback from "../pages/Admin/Feedback";
import FeedbackDashboard from "../pages/Admin/FeedbackDashboard";
import FeedbackReports from "../pages/Admin/FeedbackReports";

// Student Pages
import StudentDashboard from "../pages/User/Dashboard";
import Profile from "../pages/User/Profile";
import StudentMarksViewer from "../pages/User/StudentMarksViewer";
import StudentAttendance from "../pages/User/Attendance";
import UserFeedback from "../pages/User/Feedback";
import StudentTimeTable from "../pages/User/Timetable";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },

  // --- Staff/Admin Routes ---
  {
    element: <ProtectedRoute allowedRoles={["Super Admin", "Admin"]} />,
    children: [
      {
        path: "/staff",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "students", element: <AdminStudents /> },
          { path: "timetable", element: <AdminTimetable /> },
          { path: "attendance", element: <AdminAttendance /> },
          { path: "instructor", element: <InstructorDetails /> },
          { path: "admindetails", element: <AdminDetails /> },
          { path: "module", element: <ModulesPage /> },
          { path: "lost-and-found", element: <LostandFound /> },

          // --- FIX: Added an element with an Outlet to the parent route ---
          {
            path: "feedback",
            element: <Outlet />, // This tells the router where to render nested routes
            children: [
              { index: true, element: <Feedback /> }, // Renders at /staff/feedback
              { path: "dashboard/:sessionId", element: <FeedbackDashboard /> }, // Renders at /staff/feedback/dashboard/1
              { path: "reports/:sessionId", element: <FeedbackReports /> }, // Renders at /staff/feedback/reports/1
            ],
          },
        ],
      },
    ],
  },

  // --- Student Routes ---
  {
    element: <ProtectedRoute allowedRoles={["Student"]} />,
    children: [
      {
        path: "/user",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <StudentDashboard /> },
          { path: "profile", element: <Profile /> },
          { path: "marks", element: <StudentMarksViewer /> },
          { path: "attendance", element: <StudentAttendance /> },
          { path: "feedback", element: <UserFeedback /> },
          { path: "timetable", element: <StudentTimeTable /> },
        ],
      },
    ],
  },

  // --- Catch-all Route ---
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
