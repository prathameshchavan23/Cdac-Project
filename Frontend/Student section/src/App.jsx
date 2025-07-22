import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import Timetable from './pages/TimeTable';
import Attendance from './pages/Attendance';
import FeedbackDashboard from './pages/FeedbackDashboard';
import FeedbackReports from './pages/FeedbackReports';


function App() {
  return (
    <Routes>
      {/* Admin Layout wraps all the admin pages */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="registration" element={<Registration />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="feedback/dashboard" element={<FeedbackDashboard />} />
        <Route path="feedback/reports" element={<FeedbackReports />} />
        <Route path="feedback" element={<Navigate to="/feedback/dashboard" replace />} />
      </Route>
      {/* You can add other routes like a login page here */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  );
}

export default App;
