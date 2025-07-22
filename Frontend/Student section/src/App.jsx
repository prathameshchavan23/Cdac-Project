import React from 'react';
import { Routes, Route, Navigate,Link , Outlet} from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import Timetable from './pages/TimeTable';
import Attendance from './pages/Attendance';
import FeedbackDashboard from './pages/FeedbackDashboard';
import FeedbackReports from './pages/FeedbackReports';


function App() {
  return (
    // <Routes>
    //   {/* Admin Layout wraps all the admin pages */}
    //   <Route path="/" element={<AdminLayout />}>
    //     <Route index element={<Navigate to="/dashboard" replace />} />
    //     <Route path="dashboard" element={<Dashboard />} />
    //     <Route path="registration" element={<Registration />} />
    //     <Route path="timetable" element={<Timetable />} />
    //     <Route path="attendance" element={<Attendance />} />
    //     <Route path="feedback/dashboard" element={<FeedbackDashboard />} />
    //     <Route path="feedback/reports" element={<FeedbackReports />} />
    //     <Route path="feedback" element={<Navigate to="/feedback/dashboard" replace />} />
    //   </Route>
    //   {/* You can add other routes like a login page here */}
    //   {/* <Route path="/login" element={<LoginPage />} /> */}
     <div className="flex h-screen bg-blue-50">
      <div className="w-64 p-5 bg-white text-gray-800 shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-10 text-blue-800">
          Student Portal
        </h2>
        <nav className="flex-grow">
          <Link
            to="/student/dashboard"
            className="block py-2.5 px-4 rounded hover:bg-blue-100"
          >
            Dashboard
          </Link>
          <Link
            to="/student/attendance"
            className="block py-2.5 px-4 rounded hover:bg-blue-100"
          >
            Attendance
          </Link>
        </nav>
   
      </div>
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
