// App.jsx
import React, { useState, useEffect } from "react";
import Layout from "./Layout"; // Import the Layout component
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Registration from "./Registration";
import Timetable from "./Timetable";
import Attendance from "./Attendance";
import Feedback from "./Feedback";

// Global CSS injector component
const StyleInjector = ({ css }) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [css]);
  return null;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile"); // Default active tab

  // Student data (centralized for the entire application)
  const studentData = {
    name: "Prathamesh Chavan",
    course: "PG-DAC",
    year: "2025",
    prn: "250240120143",
    personal: {
      Name: "Prathamesh",
      Surname: "Chavan",
      gender: "Male",
      country: "India",
      dateOfBirth: "23/02/2002",
      region: "Asia",
    },
    contact: {
      email: "chavanprathamesh@gmail.com",
      mobile: "8988899298",
      alternateMobile: "8149884789",
      postalAddress: {
        line1: "Kalyan Nagar, Near Shiv Mandir",
        line2: "Kalyan",
        line3: "Maharashtra, India",
      },
    },
  };

  // Sidebar items data (defined here and passed to Sidebar)
  const sidebarItems = [
    { id: "Dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "Profile", label: "Profile", icon: "person_outline" },
    { id: "Registration", label: "Registration", icon: "app_registration" },
    { id: "Timetable", label: "Timetable", icon: "event_note" },
    { id: "Attendance", label: "Attendance", icon: "pending_actions" },
  ];

  const feedbackSubmenuItems = [
    { id: "Pending Feedback", label: "Pending Feedback" },
    { id: "Theory Feedback", label: "Theory Feedback" },
    { id: "Lab Feedback", label: "Lab Feedback" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Close sidebar on mobile view after clicking a tab
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Global CSS needed for basic styling and Material Icons
  const globalCSS = `
    body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; margin: 0; }
    .sidebar { background-color: #ffffff; box-shadow: 2px 0 5px rgba(0,0,0,0.1); }
    .sidebar-item { transition: background-color 0.3s ease, color 0.3s ease; }
    .sidebar-item:hover { background-color: #e0e7ff; color: #3730a3; }
    .sidebar-item.active { background-color: #e0e7ff; color: #3730a3; font-weight: 500; }
    .sidebar-item .material-icons { color: #6b7280; transition: color 0.3s ease; }
    .sidebar-item.active .material-icons { color: #3730a3; }
    .content { flex: 1; }
    .badge { padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
    .badge-red { background-color: #fee2e2; color: #dc2626; }
    .badge-yellow { background-color: #fef3c7; color: #d97706; }
    .badge-green { background-color: #d1fae5; color: #059669; }
  `;

  // Renders the main content component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Profile":
        return <Profile studentData={studentData} />;
      case "Registration":
        return <Registration />;
      case "Timetable":
        return <Timetable />;
      case "Attendance":
        return <Attendance />;
      case "Pending Feedback":
        return <Feedback initialSection="pending" onNavigate={handleTabClick} />;
      case "Theory Feedback":
        return <Feedback initialSection="theory" onNavigate={handleTabClick} />;
      case "Lab Feedback":
        return <Feedback initialSection="lab" onNavigate={handleTabClick} />;
      default:
        return <Profile studentData={studentData} />;
    }
  };

  // Determines the title for the header based on the active tab
  const getPageTitle = (tab) => {
    const item = [...sidebarItems, ...feedbackSubmenuItems].find(item => item.id === tab);
    return item ? item.label : "Student Portal";
  };

  return (
    <>
      <StyleInjector css={globalCSS} />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        rel="stylesheet"
      />

      {/* Wrap your entire application content with the Layout component */}
      <Layout
        // Props for Sidebar component (passed via ...sidebarProps in Layout)
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        sidebarItems={sidebarItems}
        feedbackSubmenuItems={feedbackSubmenuItems}

        // Props for Header component (passed directly to Header in Layout)
        headerTitle={getPageTitle(activeTab)}
        studentName={studentData.name}
        onMenuClick={() => setIsSidebarOpen(true)}
      >
        {/* Children of Layout will be rendered in the <main> section */}
        {renderContent()}
      </Layout>
    </>
  );
}

export default App;