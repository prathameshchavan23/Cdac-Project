import React, { useState } from "react";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");

  const sidebarItems = [
    { id: "Dashboard", label: "Dashboard", icon: "⊞" },
    { id: "Profile", label: "Profile", icon: "👤" },
    { id: "Registration", label: "Registration", icon: "👥" },
    { id: "Timetable", label: "Timetable", icon: "📅" },
    { id: "Attendance", label: "Attendance", icon: "👨‍🎓" },
  ];

  const studentData = {
    name: "Prathamesh chavan",
    course: "DAC",
    year: "2025",
    prn: "250240120143",
    personal: {
      Name: "Prathamesh ",
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-92 bg-white transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-lvh bg-gray-200 ">
          <div className="flex flex-col items-center py-8 px-6 border-b border-gray-100">
            <div className="w-20 h-20 rounded-full mb-3 shadow-lg overflow-hidden flex items-center justify-center bg-white">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBZkyEpAWT2oY_WVk_esYhh7UN8DZfCagaw&s"
                alt="CDAC Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-bold text-gray-800 text-center leading-tight">
              CDAC ACTS
            </span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-md font-medium rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <span className="mr-3 text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 lg:ml-56">
        <header className="bg-white sticky border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 mr-4"
              >
                <span className="text-xl">☰</span>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {activeTab}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                <span className="text-xl">🔔</span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                    alt="Kelvin Yeboah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-800">
                    Kelvin Yeboah
                  </div>
                  <div className="text-xs text-gray-500">Student</div>
                </div>
                <button className="text-gray-400">
                  <span className="text-sm">▼</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === "Dashboard" ? (
            <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-12 text-center text-3xl font-bold text-gray-800">
              Dashboard View
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="h-48 bg-gradient-to-r from-purple-900 via-purple-800 to-pink-600 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                  <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-pink-500 rounded-full opacity-80 blur-xl"></div>
                  <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-purple-400 rounded-full opacity-60 blur-lg"></div>
                </div>

                <div className="relative px-8 pb-8">
                  <div className="flex flex-col items-center -mt-16 mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                        alt="Kelvin Yeboah"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-1">
                      {studentData.name}
                    </h2>
                    <p className="text-gray-600 text-sm font-medium">
                      {studentData.course}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-800">
                        {studentData.year}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Current Year</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-800">
                        {studentData.prn}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">PRN Number</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Personal
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Name</p>
                        <p className="text-base font-medium text-gray-800">
                          {studentData.personal.Name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Surname</p>
                        <p className="text-base font-medium text-gray-800">
                          {studentData.personal.Surname}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Gender</p>
                        <p className="text-base font-medium text-gray-800">
                          {studentData.personal.gender}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Country</p>
                        <p className="text-base font-medium text-gray-800">
                          {studentData.personal.country}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Date of Birth
                        </p>
                        <p className="text-base font-medium text-gray-800">
                          {studentData.personal.dateOfBirth}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Region</p>
                        <p className="text-base font-medium text-gray-800">
                          {studentData.personal.region}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Contact
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="text-base font-medium text-blue-600">
                          {studentData.contact.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Postal Address
                        </p>
                        <div className="text-base font-medium text-gray-800 space-y-1">
                          <p>{studentData.contact.postalAddress.line1}</p>
                          <p>{studentData.contact.postalAddress.line2}</p>
                          <p>{studentData.contact.postalAddress.line3}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Mobile Number
                        </p>
                        <p className="text-base font-medium text-gray-800">
                          {studentData.contact.mobile}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Alternate Mobile Number
                        </p>
                        <p className="text-base font-medium text-gray-800">
                          {studentData.contact.alternateMobile}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
