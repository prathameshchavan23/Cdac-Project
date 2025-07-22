import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Registration from "./pages/Admin/Registration";
import Timetable from "./pages/Admin/TimeTable";
import Attendance from "./pages/Admin/Attendance";
import FeedbackDashboard from "./pages/Admin/FeedbackDashboard";
import FeedbackReports from "./pages/Admin/FeedbackReports";
import LandingPage from "./pages/LandingPage";
import PromotionalPanel from "./pages/PromotionalPanel";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";

function App() {
  // const [currentView, setCurrentView] = useState("landing");

  // const handleSelectRole = (role) => {
  //   setCurrentView(role);
  // };

  // const handleBack = () => {
  //   setCurrentView("landing");
  // };
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
    // Main container that takes up the full screen height.
    // <div className="min-h-screen">
    //   {/* The main content container that now spans the full width and height */}
    //   <div className="w-full min-h-screen flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
    //     {/* The left panel which changes based on the current view */}
    //     <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center p-4">
    //       {currentView === "landing" ? (
    //         <LandingPage onSelectRole={handleSelectRole} />
    //       ) : (
    //         <LoginPage role={currentView} onBack={handleBack} />
    //       )}
    //     </div>

    //     {/* The right panel with the promotional image, hidden on smaller screens */}
    //     <PromotionalPanel />
    //   </div>
    // </div>
  );
}

export default App;
