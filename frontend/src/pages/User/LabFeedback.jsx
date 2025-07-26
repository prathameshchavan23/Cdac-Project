import React, { useState } from 'react';
import { Star, FlaskConical } from 'lucide-react';

// --- Mock Data (Simulating data from a backend) ---
const labInchargeList = ["Mr. A", "Mr. B", "Ms. C"];
const courseList = ["Data Structures Lab", "Java Programming Lab", "Database Lab"];

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

// --- Yes/No Question with Conditional Comment Box ---
const YesNoQuestion = ({ label, value, onChange, comment, onCommentChange, commentLabel, commentPlaceholder, error, commentError }) => (
    <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-3">
            {label} <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-6">
            <label className="flex items-center cursor-pointer">
                <input type="radio" name={label} value="yes" checked={value === 'yes'} onChange={(e) => onChange(e.target.value)} className="w-5 h-5 text-green-600 focus:ring-green-500" />
                <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
                <input type="radio" name={label} value="no" checked={value === 'no'} onChange={(e) => onChange(e.target.value)} className="w-5 h-5 text-red-600 focus:ring-red-500" />
                <span className="ml-2 text-gray-700">No</span>
            </label>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        
        {value === 'no' && (
            <div className="mt-4">
                <label className="block font-semibold text-gray-800 mb-2">{commentLabel}</label>
                <textarea
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${commentError ? "border-red-500" : "border-gray-300"}`}
                    value={comment}
                    onChange={(e) => onCommentChange(e.target.value)}
                    rows={3}
                    placeholder={commentPlaceholder}
                />
                {commentError && <p className="mt-1 text-sm text-red-600">{commentError}</p>}
            </div>
        )}
    </div>
);


// --- Main Lab Feedback Page Component ---
const LabFeedbackPage = () => {
    const [formData, setFormData] = useState({
        labIncharge: "",
        course: "",
        overallRating: 0,
        instructionsClear: "", // 'yes' or 'no'
        unclearInstructionsComment: "",
        difficultiesComment: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.labIncharge) newErrors.labIncharge = "Please select a lab incharge";
        if (!formData.course) newErrors.course = "Please select a course";
        if (formData.overallRating === 0) newErrors.overallRating = "Please provide an overall rating for the lab session";
        if (!formData.instructionsClear) newErrors.instructionsClear = "Please answer this question";
        if (formData.instructionsClear === 'no' && !formData.unclearInstructionsComment.trim()) {
            newErrors.unclearInstructionsComment = "Please specify what was unclear";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log("Lab Feedback submitted:", { type: "lab", ...formData });
        setIsSubmitted(true);
    };
    
    const handleReset = () => {
         setFormData({
            labIncharge: "",
            course: "",
            overallRating: 0,
            instructionsClear: "",
            unclearInstructionsComment: "",
            difficultiesComment: ""
        });
        setErrors({});
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white text-center p-8 rounded-2xl shadow-xl">
                    <CheckCircle className="mx-auto text-green-500 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800">Thank You!</h2>
                    <p className="text-gray-600 mt-2">Your lab feedback has been submitted successfully.</p>
                    <button onClick={() => {setIsSubmitted(false); handleReset();}} className="mt-6 w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition">
                        Submit Another Feedback
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-8">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-6 flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-full">
                           <FlaskConical className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Lab Session Feedback</h1>
                            <p className="text-green-100">Help us improve the quality of practical sessions</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid md:grid-cols-2 gap-8 mb-6">
                            <div>
                                <label className="block font-semibold text-gray-800 mb-2">
                                    Select Lab Incharge <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.labIncharge ? "border-red-500" : "border-gray-300"}`}
                                    value={formData.labIncharge}
                                    onChange={(e) => handleInputChange("labIncharge", e.target.value)}
                                >
                                    <option value="">-- Choose Incharge --</option>
                                    {labInchargeList.map((incharge, index) => (
                                        <option key={index} value={incharge}>{incharge}</option>
                                    ))}
                                </select>
                                {errors.labIncharge && <p className="mt-1 text-sm text-red-600">{errors.labIncharge}</p>}
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-800 mb-2">
                                    Select Lab Course <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors.course ? "border-red-500" : "border-gray-300"}`}
                                    value={formData.course}
                                    onChange={(e) => handleInputChange("course", e.target.value)}
                                >
                                    <option value="">-- Choose Course --</option>
                                    {courseList.map((course, index) => (
                                        <option key={index} value={course}>{course}</option>
                                    ))}
                                </select>
                                {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                            <StarRatingInput label="Overall Lab Session Rating" rating={formData.overallRating} onRatingChange={(v) => handleInputChange("overallRating", v)} error={errors.overallRating} />
                            
                            <YesNoQuestion
                                label="Were the lab instructions and concepts clear?"
                                value={formData.instructionsClear}
                                onChange={(v) => handleInputChange("instructionsClear", v)}
                                comment={formData.unclearInstructionsComment}
                                onCommentChange={(v) => handleInputChange("unclearInstructionsComment", v)}
                                commentLabel="Which instructions or concepts were unclear?"
                                commentPlaceholder="Please specify..."
                                error={errors.instructionsClear}
                                commentError={errors.unclearInstructionsComment}
                            />
                        </div>

                        <div className="mt-6">
                            <label className="block font-semibold text-gray-800 mb-2">
                                Did you face any difficulties during the lab? (Optional)
                            </label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                value={formData.difficultiesComment}
                                onChange={(e) => handleInputChange("difficultiesComment", e.target.value)}
                                rows={4}
                                placeholder="Describe any technical issues, lack of resources, or other challenges..."
                            />
                        </div>

                        <div className="pt-8 flex gap-4">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-teal-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Submit Lab Feedback
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
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default LabFeedbackPage;
