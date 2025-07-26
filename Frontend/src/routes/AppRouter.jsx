import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout"; // Assuming you have this layout

// Admin pages
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminFeedback from "../pages/Admin/Feedback";
import AdminTimetable from "../pages/Admin/TimeTable";
import AdminAttendance from "../pages/Admin/Attendance";
import InstructorDetails from "../pages/Admin/InstructorDetails";
// Student pages
import StudentDashboard from "../pages/User/Dashboard"; // or wherever your student dashboard is
import StudentAttendance from "../pages/User/Attendance";
import StudentFeedback from "../pages/User/Feedback";
import StudentTimeTable from "../pages/User/Timetable";
import StudentProfile from "../pages/User/Profile";
import AdminStudents from "../pages/Admin/StudentsEditPage";
import AdminDetails from "../pages/Admin/AdminDetails";
import ModulesPage from "../pages/Admin/ModulesPage";
import LostandFound from "../pages/Admin/LostandFound";
import TheoryFeedbackPage from "../pages/User/TheoryFeedback";
import LabFeedback from "../pages/User/LabFeedback";
import Profile from "../pages/User/Profile";
import StudentMarksViewer from "../pages/User/StudentMarksViewer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  // Staff/Admin Routes
  {
    element: <ProtectedRoute allowedRoles={["staff"]} />, // Changed from 'admin' to 'staff'
    children: [
      {
        path: "/staff", // Changed from 'admin' to 'staff'
        element: <AppLayout role="staff" />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "students", element: <AdminStudents /> },
          { path: "feedback", element: <AdminFeedback /> },
          { path: "timetable", element: <AdminTimetable /> },
          { path: "instructor", element: <InstructorDetails /> },
          { path: "attendance", element: <AdminAttendance /> },
          { path: "admindetails", element: <AdminDetails /> },
          { path: "module", element: <ModulesPage /> },
          { path: "lost-and-found", element: <LostandFound /> },
        ],
      },
    ],
  },
  // Student Routes
  {
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        path: "/user",
        element: <AppLayout role="user" />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <StudentDashboard /> },
          { path: "profile", element: <Profile /> },
          { path: "profile", element: <StudentMarksViewer /> },
          { path: "attendance", element: <StudentAttendance /> },
          {
            path: "feedback",
            element: <StudentFeedback />,
            children: [
              { index: true, element: <Navigate to="theory" replace /> },
              { path: "theory", element: <TheoryFeedbackPage /> },
              { path: "lab", element: <LabFeedback /> },
            ],
          },
          { path: "timetable", element: <StudentTimeTable /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
