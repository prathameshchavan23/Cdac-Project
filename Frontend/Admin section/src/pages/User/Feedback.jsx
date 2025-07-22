// Feedback.jsx
import React, { useState, useEffect } from "react";

// StarRating Component
const StarRating = ({ totalStars = 4, rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <span
            key={ratingValue}
            className="material-icons hover:text-yellow-400 cursor-pointer text-3xl"
            style={{ color: ratingValue <= rating ? "#facc15" : "#d1d5db" }}
            onClick={() => setRating(ratingValue)}
          >
            {ratingValue <= rating ? "star" : "star_border"}
          </span>
        );
      })}
    </div>
  );
};

// Pending Feedback Section
const PendingFeedback = ({ onNavigateToTheory, onNavigateToLab }) => (
  <section className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Theory Feedback Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Theory Feedback
        </h2>
        <div className="space-y-4">
          <div
            className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigateToTheory()}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-indigo-600">
                  Advanced Algorithms
                </h3>
                <p className="text-sm text-gray-500">Dr. Emily Carter</p>
              </div>
              <span className="badge badge-red">Overdue</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Deadline: May 10, 2024</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-indigo-600">
                  Database Management
                </h3>
                <p className="text-sm text-gray-500">Prof. John Smith</p>
              </div>
              <span className="badge badge-yellow">Due Soon</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Deadline: May 25, 2024</p>
          </div>
        </div>
      </div>
      {/* Lab Feedback Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Lab Feedback
        </h2>
        <div className="space-y-4">
          <div
            className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigateToLab()}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-indigo-600">
                  Data Structures Lab
                </h3>
                <p className="text-sm text-gray-500">Ms. Sarah Miller</p>
              </div>
              <span className="badge badge-red">Overdue</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Deadline: May 12, 2024</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-indigo-600">
                  Operating Systems Lab
                </h3>
                <p className="text-sm text-gray-500">Mr. David Lee</p>
              </div>
              <span className="badge badge-green">Submitted</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Submitted: May 18, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Generic Feedback Form Component
const FeedbackForm = ({ title, faculty, formType }) => {
  // State for all form fields
  const [ratings, setRatings] = useState({
    style: 0,
    interaction: 0,
    doubts: 0,
  });
  const [topicsClear, setTopicsClear] = useState(null);
  const [topicsNotClearDetails, setTopicsNotClearDetails] = useState("");
  const [moduleDifficulty, setModuleDifficulty] = useState(null); // easier, harder, just_right
  const [teachingImproved, setTeachingImproved] = useState(null);
  const [teachingImprovementDetails, setTeachingImprovementDetails] =
    useState("");

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      formType,
      ratings,
      topicsClear,
      topicsNotClearDetails: topicsClear === "no" ? topicsNotClearDetails : "",
      moduleDifficulty,
      teachingImproved,
      teachingImprovementDetails:
        teachingImproved === "yes" ? teachingImprovementDetails : "",
    };
    console.log("Feedback Submitted:", formData);
    alert("Feedback submitted! Check the console for the data.");
    // In a real app, you might also want to reset the form or navigate back
  };

  return (
    <section className="bg-white p-4 sm:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
      <p className="text-gray-600 mb-1">
        Faculty: <span className="font-medium">{faculty}</span>
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Star Ratings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            1. Teaching Style (out of 4 stars)
          </label>
          <StarRating
            rating={ratings.style}
            setRating={(val) => handleRatingChange("style", val)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            2. Interaction with Students (out of 4 stars)
          </label>
          <StarRating
            rating={ratings.interaction}
            setRating={(val) => handleRatingChange("interaction", val)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            3. Clearing Doubts (out of 4 stars)
          </label>
          <StarRating
            rating={ratings.doubts}
            setRating={(val) => handleRatingChange("doubts", val)}
          />
        </div>

        {/* Radio Questions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            4. All topics were clear?
          </label>
          <div className="flex items-center space-x-4 mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name={`${formType}_topics_clear`}
                value="yes"
                onChange={(e) => setTopicsClear(e.target.value)}
                checked={topicsClear === "yes"}
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name={`${formType}_topics_clear`}
                value="no"
                onChange={(e) => setTopicsClear(e.target.value)}
                checked={topicsClear === "no"}
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
          {topicsClear === "no" && (
            <textarea
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Enter topics that were not clear..."
              rows="3"
              value={topicsNotClearDetails}
              onChange={(e) => setTopicsNotClearDetails(e.target.value)}
              required
            ></textarea>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </section>
  );
};

export default function Feedback({ initialSection = "pending" }) {
  const [activeFeedbackSection, setActiveFeedbackSection] =
    useState(initialSection);

  useEffect(() => {
    setActiveFeedbackSection(initialSection);
  }, [initialSection]);

  const renderSection = () => {
    switch (activeFeedbackSection) {
      case "theory":
        return (
          <FeedbackForm
            title="Theory Feedback: Advanced Algorithms"
            faculty="Dr. Emily Carter"
            formType="theory"
          />
        );
      case "lab":
        return (
          <FeedbackForm
            title="Lab Feedback: Data Structures Lab"
            faculty="Ms. Sarah Miller"
            formType="lab"
          />
        );
      case "pending":
      default:
        return (
          <PendingFeedback
            onNavigateToTheory={() => setActiveFeedbackSection("theory")}
            onNavigateToLab={() => setActiveFeedbackSection("lab")}
          />
        );
    }
  };

  return <div>{renderSection()}</div>;
}
