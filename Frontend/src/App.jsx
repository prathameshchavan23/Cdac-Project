import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/authSlice";

// Common pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layouts/AppLayout";

// Admin layout + pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminMarks from "./pages/Admin/Marks";
import AdminStudents from "./pages/Admin/StudentsEditPage";
import AdminTimetable from "./pages/Admin/TimeTable";
import AdminAttendance from "./pages/Admin/Attendance";
import FeedbackForm from "./pages/Admin/Feedback";
import NotFoundPage from "./pages/NotFoundPage";
import InstructorDetails from "./pages/Admin/InstructorDetails";
import AdminDetails from "./pages/Admin/AdminDetails";
import ModulesPage from "./pages/Admin/ModulesPage";

// Student layout + pages
import UserDashboard from "./pages/User/Dashboard";
import UserAttendance from "./pages/User/Attendance";
import UserTimeTable from "./pages/User/Timetable";
import LostandFound from "./pages/Admin/LostandFound";
import TheoryFeedback from "./pages/User/TheoryFeedback";
import LabFeedback from "./pages/User/LabFeedback";
import Profile from "./pages/User/Profile";
import StudentMarksViewer from "./pages/User/StudentMarksViewer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
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
          <Route path="students" element={<AdminStudents />} />
          <Route path="marks" element={<AdminMarks />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="timetable" element={<AdminTimetable />} />
          <Route path="instructor" element={<InstructorDetails />} />
          <Route path="feedback" element={<FeedbackForm />} />
          <Route path="admindetails" element={<AdminDetails />} />
          <Route path="module" element={<ModulesPage />} />
          <Route path="/staff/lost-and-found" element={<LostandFound />} />
        </Route>

        {/* --- User (Student) Routes --- */}
        {/* All routes starting with "/user" will also render inside the AppLayout. */}
        <Route path="/user" element={<AppLayout role="student" />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="attendance" element={<UserAttendance />} />
          <Route path="marks" element={<StudentMarksViewer />} />
          <Route path="timetable" element={<UserTimeTable />} />
          <Route index element={<TheoryFeedback />} />
          <Route path="feedback/theory" element={<TheoryFeedback />} />
          <Route path="feedback/lab" element={<LabFeedback />} />
        </Route>

        {/* A "catch-all" route that matches any URL not defined above.
          This is essential for showing a user-friendly 404 page.
        */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
