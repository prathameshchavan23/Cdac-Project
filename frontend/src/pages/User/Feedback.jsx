import React, { useState, useEffect } from 'react';
import { Star, CheckCircle } from 'lucide-react';
// --- CHANGE: Import our new service functions ---
import { getPendingFeedbackTasks, submitFeedback } from '../../services/feedbackService';

/**
 * Reusable component for star rating input.
 */
const StarRatingInput = ({ label, rating, onRatingChange, error }) => (
    <div>
        <label className="block font-semibold text-gray-800 mb-3">{label} <span className="text-red-500">*</span></label>
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((num) => (
                <button key={num} type="button" onClick={() => onRatingChange(num)} className={`p-2 transition-colors ${rating >= num ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"}`}>
                    <Star className="w-8 h-8 fill-current" />
                </button>
            ))}
            <span className="ml-4 text-sm font-medium text-gray-600">{rating > 0 ? `${rating}/5` : "Select a rating"}</span>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
);

/**
 * Component that displays the list of pending feedback opportunities.
 */
const FeedbackListPage = ({ onFillFeedback }) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the list of pending feedback sessions from the backend when the component mounts.
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true);
                const data = await getPendingFeedbackTasks();
                setSessions(data);
            } catch (err) {
                setError("Could not load pending feedback. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading pending feedback...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Feedback Dashboard</h1>
                <p className="text-slate-500 mt-1">Select a feedback form to fill out.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b-2 border-slate-200 text-slate-600">
                        <tr>
                            <th className="p-4 font-semibold">Sr. No.</th>
                            <th className="p-4 font-semibold">Instructor Name</th>
                            <th className="p-4 font-semibold">Module Name</th>
                            <th className="p-4 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((item, index) => (
                            <tr key={item.sessionId} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-4 text-slate-600">{index + 1}</td>
                                <td className="p-4 font-medium text-slate-800">{item.instructorName}</td>
                                <td className="p-4 text-slate-600">{item.moduleName}</td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => onFillFeedback(item)}
                                        className="px-4 py-2 rounded-lg font-semibold text-sm transition-colors bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Fill Feedback
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

/**
 * Component that renders the feedback submission form.
 */
const FeedbackFormPage = ({ feedbackData, onBack, onSubmit }) => {
    const [formData, setFormData] = useState({
        teachingStyleRating: 0,
        doubtClearingRating: 0,
        comments: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRatingChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    const validate = () => {
        const newErrors = {};
        if (formData.doubtClearingRating === 0) newErrors.doubtClearingRating = "Please rate this aspect.";
        if (formData.teachingStyleRating === 0) newErrors.teachingStyleRating = "Please rate this aspect.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handles the form submission by calling the backend API.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                // Prepare data in the format expected by the backend's FeedbackRequest DTO.
                const submissionData = {
                    sessionId: feedbackData.sessionId,
                    ...formData
                };
                await submitFeedback(submissionData);
                onSubmit(); // Signal submission success to the parent component.
            } catch (error) {
                alert("Failed to submit feedback. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h1 className="text-3xl font-bold text-white">Feedback</h1>
                <p className="text-blue-100 mt-1"><span className="font-semibold">{feedbackData.moduleName}</span> by <span className="font-semibold">{feedbackData.instructorName}</span></p>
            </div>
            <form onSubmit={handleSubmit} className="p-8">
                <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                    <StarRatingInput label="Doubt Cleared" rating={formData.doubtClearingRating} onRatingChange={(v) => handleRatingChange("doubtClearingRating", v)} error={errors.doubtClearingRating} />
                    <StarRatingInput label="Teaching Style" rating={formData.teachingStyleRating} onRatingChange={(v) => handleRatingChange("teachingStyleRating", v)} error={errors.teachingStyleRating} />
                </div>
                <div className="mt-6">
                    <label className="block font-semibold text-gray-800 mb-2">Additional Comments</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                        value={formData.comments}
                        onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                        rows={4}
                        placeholder="Any other feedback..."
                    />
                </div>
                <div className="pt-8 flex gap-4">
                    <button type="button" onClick={onBack} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold">Back to List</button>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:bg-blue-400">
                        {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </button>
                </div>
            </form>
        </div>
    );
};

/**
 * Main parent component for the Feedback page.
 * It controls which view is currently active ('list', 'form', or 'success').
 */
const FeedbackPage = () => {
    const [view, setView] = useState('list');
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const handleFillFeedback = (feedback) => {
        setSelectedFeedback(feedback);
        setView('form');
    };

    const handleBackToList = () => {
        setView('list');
        setSelectedFeedback(null);
    };

    const handleSubmissionSuccess = () => {
        setView('success');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8">
            <div className="max-w-4xl mx-auto px-6">
                {view === 'list' && <FeedbackListPage onFillFeedback={handleFillFeedback} />}
                {view === 'form' && <FeedbackFormPage feedbackData={selectedFeedback} onBack={handleBackToList} onSubmit={handleSubmissionSuccess} />}
                {view === 'success' && (
                    <div className="bg-white text-center p-12 rounded-2xl shadow-xl">
                        <CheckCircle className="mx-auto text-green-500 mb-4 h-16 w-16" />
                        <h2 className="text-3xl font-bold text-gray-800">Thank You!</h2>
                        <p className="text-gray-600 mt-2">Your feedback has been submitted successfully.</p>
                        <button onClick={handleBackToList} className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Back to Feedback List
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;