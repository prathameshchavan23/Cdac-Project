// Profile.jsx
import React from "react";

const Profile = ({ studentData }) => {
  if (!studentData) {
    return (
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">No Student Data Available</h2>
        <p className="mt-4 text-gray-600">Please provide student data to view the profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile header card */}
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
                alt="Student Profile"
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

      {/* Personal and Contact Details Section */}
      <div className="space-y-6">
        {/* Personal Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Personal</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="text-base font-medium text-gray-800">
                  {studentData.personal.dateOfBirth}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Country</p>
                <p className="text-base font-medium text-gray-800">
                  {studentData.personal.country}
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

        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
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
                <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
                <p className="text-base font-medium text-gray-800">
                  {studentData.contact.mobile}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Alternate Mobile</p>
                <p className="text-base font-medium text-gray-800">
                  {studentData.contact.alternateMobile}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Postal Address</p>
                <div className="text-base font-medium text-gray-800 space-y-1">
                  <p>{studentData.contact.postalAddress.line1}</p>
                  <p>{studentData.contact.postalAddress.line2}</p>
                  <p>{studentData.contact.postalAddress.line3}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;