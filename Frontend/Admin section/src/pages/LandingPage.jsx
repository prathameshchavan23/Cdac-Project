import React from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "./FormHeader";
import PromotionalPanel from "./PromotionalPanel";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Left Column: Login Options */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 sm:p-12">
        {/* Inner container to constrain form width on large screens */}
        <div className="w-full max-w-md mx-auto">
          <FormHeader />
          <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-800 text-left">
              Hello!
            </h1>
            <p className="text-gray-500 mt-2 mb-8 text-left">
              Choose your login option
            </p>
            <div className="space-y-4">
              {/* Student Login Button */}
              <button
                onClick={() => handleSelectRole("student")}
                className="group w-full text-left p-4 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg">Student</h2>
                    <p className="text-sm text-blue-200">
                      Access the students' portal here.
                    </p>
                  </div>
                  <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
              </button>
              {/* Staff Login Button */}
              <button
                onClick={() => handleSelectRole("staff")}
                className="group w-full text-left p-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg">Staff</h2>
                    <p className="text-sm text-gray-500">
                      Exclusive to staff members only.
                    </p>
                  </div>
                  <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Promotional Image Panel */}
      <PromotionalPanel />
    </div>
  );
};

export default LandingPage;