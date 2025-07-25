import React from 'react';
import { Routes, Route, Navigate,Link , Outlet} from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import Timetable from './pages/TimeTable';
import Attendance from './pages/Attendance';
import FeedbackDashboard from './pages/FeedbackDashboard';
import FeedbackReports from './pages/FeedbackReports';
import InstructorDetails from './InstructorDetails';


function App() {
  return (
  
    <InstructorDetails/>
  );
}

export default App;
