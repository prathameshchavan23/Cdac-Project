import React, { useState } from "react";

const Feedback = () => {
  const facultyList = ["Prof. A", "Prof. B", "Prof. C"];
  const courseList = ["Mathematics", "Science", "History"];

  const [section, setSection] = useState("student");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [rating, setRating] = useState(0);
  const [topicsClear, setTopicsClear] = useState("");
  const [notClearTopics, setNotClearTopics] = useState("");
  const [teachingImproved, setTeachingImproved] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!faculty || !course || rating === 0 || !topicsClear || !teachingImproved) {
      alert("Please complete all required fields.");
      return;
    }

    const feedbackData = {
      section,
      faculty,
      course,
      rating,
      topicsClear,
      notClearTopics,
      teachingImproved,
    };

    console.log("Feedback submitted:", feedbackData);
    alert("Feedback submitted successfully!");

    // Reset form
    setFaculty("");
    setCourse("");
    setRating(0);
    setTopicsClear("");
    setNotClearTopics("");
    setTeachingImproved("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex mb-6 justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            section === "student" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSection("student")}
        >
          Student Feedback
        </button>
        <button
          className={`px-4 py-2 rounded ${
            section === "lab" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSection("lab")}
        >
          Lab Feedback
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Faculty */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Faculty</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            required
          >
            <option value="">-- Select Faculty --</option>
            {facultyList.map((f, i) => (
              <option key={i} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Course</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <option value="">-- Select Course --</option>
            {courseList.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Rate the subject (1 to 5):</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className={`px-3 py-1 rounded border ${
                  rating === num ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Clear */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Were the topics covered clear?
          </label>
          <div className="space-x-6 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="topicsClear"
                value="yes"
                checked={topicsClear === "yes"}
                onChange={(e) => setTopicsClear(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="topicsClear"
                value="no"
                checked={topicsClear === "no"}
                onChange={(e) => setTopicsClear(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        {topicsClear === "no" && (
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">
              Which topics were not clear?
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={notClearTopics}
              onChange={(e) => setNotClearTopics(e.target.value)}
              rows={3}
              placeholder="List unclear topics..."
              required
            />
          </div>
        )}

        {/* Teaching Improvement */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Was the teaching improved from the last module?
          </label>
          <div className="space-x-6 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="teachingImproved"
                value="yes"
                checked={teachingImproved === "yes"}
                onChange={(e) => setTeachingImproved(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="teachingImproved"
                value="no"
                checked={teachingImproved === "no"}
                onChange={(e) => setTeachingImproved(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
