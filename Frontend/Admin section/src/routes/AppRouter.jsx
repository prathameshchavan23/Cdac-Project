import { createBrowserRouter ,Navigate} from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../layouts/AppLayout'; // Assuming you have this layout

// Admin pages
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminFeedback from '../pages/Admin/Feedback';
import AdminTimetable from '../pages/Admin/TimeTable';
import AdminAttendance from '../pages/Admin/Attendance';
import AdminFeedbackDashboard from '../pages/Admin/FeedbackDashboard';
import AdminFeedbackReports from '../pages/Admin/FeedbackReports';

// Student pages  
import StudentDashboard from '../pages/User/Dashboard'; // or wherever your student dashboard is
import StudentAttendance from '../pages/User/Attendance';
import StudentFeedback from '../pages/User/Feedback';
import StudentTimeTable from '../pages/User/Timetable';
import StudentProfile from '../pages/User/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  // Staff/Admin Routes
  {
    element: <ProtectedRoute allowedRoles={['staff']} />, // Changed from 'admin' to 'staff'
    children: [
      {
        path: '/staff', // Changed from 'admin' to 'staff'
        element: <AppLayout role="staff" />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'feedback', element: <AdminFeedback /> },
          { path: 'timetable', element: <AdminTimetable /> },
          { path: 'attendance', element: <AdminAttendance /> },
          { path: 'feedback-dashboard', element: <AdminFeedbackDashboard /> },
          { path: 'feedback-reports', element: <AdminFeedbackReports /> },
        ]
      }
    ]
  },
  // Student Routes
  {
    element: <ProtectedRoute allowedRoles={['user']} />,
    children: [
      {
        path: '/user',
        element: <AppLayout role="user" />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <StudentDashboard /> },
          { path: 'attendance', element: <StudentAttendance /> },
          { path: 'feedback', element: <StudentFeedback /> },
          { path: 'timetable', element: <StudentTimeTable /> },
          { path: 'profile', element: <StudentProfile /> },
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
