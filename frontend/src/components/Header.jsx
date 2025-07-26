import React from "react";

const Header = ({ title, role, studentName, onMenuClick }) => {
  return (
    <header className="bg-white sticky top-0 border-b border-gray-200 px-6 z-30 flex items-center h-[5.05rem] shadow-sm">
      <div className="flex items-center justify-between w-full">
        {/* Left side: Hamburger and Title */}
        <div className="flex items-center">
          {/* Hamburger Icon for mobile view */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 mr-4"
              aria-label="Open sidebar"
            >
              <span className="material-icons-outlined">menu</span>
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-800">
            {title || (role === "admin" ? "Admin Panel" : "Student Portal")}
          </h1>
        </div>

        {/* Right side: Notifications and Profile */}
        {role === "student" && (
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <span className="material-icons-outlined">notifications</span>
            </button>

            {/* Student Profile Info */}
            <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
              <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=36&h=36&fit=crop&crop=face"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/36x36/E2E8F0/4A5568?text=U";
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-800">
                  {studentName || "Student"}
                </div>
                <div className="text-xs text-gray-500">Student</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
