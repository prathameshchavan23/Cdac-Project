// Sidebar.jsx
import React, { useState } from "react";

const Sidebar = ({
  isOpen,
  onClose,
  activeTab,
  onTabClick,
  sidebarItems = [],
  feedbackSubmenuItems = [],
}) => {
  const [isSubmenuOpen, setSubmenuOpen] = useState(
    feedbackSubmenuItems.some(item => activeTab === item.id) || false
  ); // Keep submenu open if one of its items is active

  const handleLinkClick = (sectionName) => {
    onTabClick(sectionName);
    // onClose is handled in App.jsx now for a unified behavior
  };

  const getLinkClass = (sectionName) =>
    `block py-2 px-3 text-sm rounded-md transition-colors duration-200 ${
      activeTab === sectionName
        ? "font-semibold text-indigo-600 bg-indigo-50"
        : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  const getMainLinkClass = (sectionName) =>
    `sidebar-item flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
      activeTab === sectionName
        ? "text-indigo-600 bg-indigo-50 font-medium"
        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center min-w-0">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBZkyEpAWT2oY_WVk_esYhh7UN8DZfCagaw&s"
                alt="CDAC Logo"
                className="w-15 h-10 mr-1 flex-shrink-0"
              />
              <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                CDAC ACTS
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <span className="material-icons text-xl">close</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {/* Main navigation items */}
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={getMainLinkClass(item.id)}
              >
                <span className="material-icons mr-3 text-xl">{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* Feedback Dropdown */}
            <div className="sidebar-item rounded-lg text-gray-700">
              <div
                className={`flex items-center justify-between py-3 px-4 cursor-pointer rounded-lg transition-colors duration-200 ${
                  feedbackSubmenuItems.some(item => activeTab === item.id)
                    ? "text-indigo-600 bg-indigo-50 font-medium"
                    : "hover:bg-indigo-50 hover:text-indigo-600"
                }`}
                onClick={() => setSubmenuOpen(!isSubmenuOpen)}
              >
                <div className="flex items-center">
                  <span className="material-icons mr-3 text-xl">feedback</span>
                  Feedback
                </div>
                <span className={`material-icons text-lg transition-transform duration-200 ${
                  isSubmenuOpen ? "rotate-180" : ""
                }`}>
                  expand_more
                </span>
              </div>

              {/* Submenu */}
              <div className={`overflow-hidden transition-all duration-300 ${
                isSubmenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="ml-7 mt-2 space-y-1">
                  {feedbackSubmenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleLinkClick(item.id)}
                      className={getLinkClass(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-500">
              <span className="material-icons mr-2 text-base">info</span>
              Student Portal v2.0
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;