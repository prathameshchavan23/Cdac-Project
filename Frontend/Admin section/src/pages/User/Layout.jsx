// Layout.js
import React from "react";
import Header from "./Header"; // Assuming Header.jsx is the file for your Header component
import Sidebar from "./Sidebar";

const Layout = ({ children, headerTitle, studentName, onMenuClick, ...sidebarProps }) => { // Destructure header-related props
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar {...sidebarProps} /> {/* Spreads all sidebar-related props */}

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-64"> {/* Added lg:ml-64 here to push content */}
        {/* Header */}
        <Header
          title={headerTitle} // Pass headerTitle to Header
          studentName={studentName} // Pass studentName to Header
          onMenuClick={onMenuClick} // Pass onMenuClick to Header
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6"> {/* Changed p-4 to p-6 for consistent spacing with App.jsx */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;