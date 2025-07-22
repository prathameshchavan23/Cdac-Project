import { useState,useEffect } from "react";
const FeedbackFormModal = ({ isOpen, onClose, onSave, feedbackData }) => {
    const isEditMode = !!feedbackData;
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (isOpen) {
            if (isEditMode) {
                setFormData(feedbackData);
            } else {
                setFormData({ moduleName: '', facultyName: '', lastDate: '' });
            }
        }
    }, [feedbackData, isEditMode, isOpen]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.moduleName || !formData.facultyName || !formData.lastDate) {
            alert('Please fill all mandatory fields.');
            return;
        }
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Feedback" : "Add New Feedback"}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="moduleName">Module Name <span className="text-red-500">*</span></label>
                        <select id="moduleName" name="moduleName" value={formData.moduleName || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option value="">Select Module</option>
                            <option value="Core Java">Core Java</option>
                            <option value="C++">C++</option>
                            <option value="DBMS">DBMS</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="facultyName">Faculty Name <span className="text-red-500">*</span></label>
                        <select id="facultyName" name="facultyName" value={formData.facultyName || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option value="">Select Faculty</option>
                            <option value="Dr. Smith">Dr. Smith</option>
                            <option value="Prof. Johnson">Prof. Johnson</option>
                            <option value="Ms. Williams">Ms. Williams</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastDate">Last Date <span className="text-red-500">*</span></label>
                        <input id="lastDate" name="lastDate" type="date" value={formData.lastDate || ''} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">{isEditMode ? 'Save Changes' : 'Submit Feedback'}</button>
                </div>
            </form>
        </Modal>
    );
};

export default FeedbackFormModal;