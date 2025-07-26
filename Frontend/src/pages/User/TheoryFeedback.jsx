import React, { useState } from "react";
import { Star, BookOpen } from "lucide-react";

// --- Mock Data ---
const facultyList = ["Prof. A", "Prof. B", "Prof. C", "Prof. D"];
const courseList = [
  "Mathematics",
  "Science",
  "History",
  "Computer Science",
  "Physics",
];

// --- Reusable Star Rating Component ---
const StarRatingInput = ({ label, rating, onRatingChange, error }) => (
  <div className="mb-6">
    <label className="block font-semibold text-gray-800 mb-3">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onRatingChange(num)}
          className={`p-2 transition-all duration-200 ${
            rating >= num
              ? "text-yellow-400 hover:text-yellow-500"
              : "text-gray-300 hover:text-yellow-400"
          }`}
        >
          <Star className="w-8 h-8 fill-current" />
        </button>
      ))}
      <span className="ml-4 text-sm font-medium text-gray-600">
        {rating > 0 ? `${rating}/5` : "Select a rating"}
      </span>
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

// --- Main Theory Feedback Page Component ---
const TheoryFeedbackPage = () => {
  const [formData, setFormData] = useState({
    faculty: "",
    course: "",
    clarity: 0,
    pace: 0,
    interaction: 0,
    punctuality: 0,
    syllabusCoverage: 0,
    additionalComments: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.faculty) newErrors.faculty = "Please select a faculty";
    if (!formData.course) newErrors.course = "Please select a course";
    if (formData.clarity === 0)
      newErrors.clarity = "Please rate the clarity of concepts";
    if (formData.pace === 0)
      newErrors.pace = "Please rate the pace of delivery";
    if (formData.interaction === 0)
      newErrors.interaction = "Please rate the faculty's interaction";
    if (formData.punctuality === 0)
      newErrors.punctuality = "Please rate the faculty's punctuality";
    if (formData.syllabusCoverage === 0)
      newErrors.syllabusCoverage = "Please rate the syllabus coverage";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Theory Feedback submitted:", { type: "theory", ...formData });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      faculty: "",
      course: "",
      clarity: 0,
      pace: 0,
      interaction: 0,
      punctuality: 0,
      syllabusCoverage: 0,
      additionalComments: "",
    });
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white text-center p-8 rounded-2xl shadow-xl">
          <CheckCircle className="mx-auto text-green-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Thank You!</h2>
          <p className="text-gray-600 mt-2">
            Your feedback has been submitted successfully.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              handleReset();
            }}
            className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Theory Subject Feedback
              </h1>
              <p className="text-blue-100">
                Help us improve the quality of instruction
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <label className="block font-semibold text-gray-800 mb-2">
                  Select Faculty <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.faculty ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.faculty}
                  onChange={(e) => handleInputChange("faculty", e.target.value)}
                >
                  <option value="">-- Choose Faculty --</option>
                  {facultyList.map((faculty, index) => (
                    <option key={index} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
                {errors.faculty && (
                  <p className="mt-1 text-sm text-red-600">{errors.faculty}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold text-gray-800 mb-2">
                  Select Course <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.course ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.course}
                  onChange={(e) => handleInputChange("course", e.target.value)}
                >
                  <option value="">-- Choose Course --</option>
                  {courseList.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                {errors.course && (
                  <p className="mt-1 text-sm text-red-600">{errors.course}</p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <StarRatingInput
                label="Clarity of theoretical concepts"
                rating={formData.clarity}
                onRatingChange={(v) => handleInputChange("clarity", v)}
                error={errors.clarity}
              />
              <StarRatingInput
                label="Pace of content delivery"
                rating={formData.pace}
                onRatingChange={(v) => handleInputChange("pace", v)}
                error={errors.pace}
              />
              <StarRatingInput
                label="Faculty's interaction and engagement"
                rating={formData.interaction}
                onRatingChange={(v) => handleInputChange("interaction", v)}
                error={errors.interaction}
              />
              <StarRatingInput
                label="Punctuality in class"
                rating={formData.punctuality}
                onRatingChange={(v) => handleInputChange("punctuality", v)}
                error={errors.punctuality}
              />
              <StarRatingInput
                label="Syllabus coverage"
                rating={formData.syllabusCoverage}
                onRatingChange={(v) => handleInputChange("syllabusCoverage", v)}
                error={errors.syllabusCoverage}
              />
            </div>

            <div className="mt-6">
              <label className="block font-semibold text-gray-800 mb-2">
                Additional Comments or Suggestions
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={formData.additionalComments}
                onChange={(e) =>
                  handleInputChange("additionalComments", e.target.value)
                }
                rows={4}
                placeholder="Share any thoughts on what went well or what could be improved..."
              />
            </div>

            <div className="pt-8 flex gap-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Submit Feedback
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-all duration-200"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Success Icon for Feedback Submission ---
const CheckCircle = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default TheoryFeedbackPage;
