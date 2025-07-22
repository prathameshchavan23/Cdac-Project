import { useState } from "react";
const FeedbackPage = () => {
    const initialFeedbackData = [
        { id: 1, moduleName: 'Core Java', facultyName: 'Dr. Smith', lastDate: '2024-10-25' },
        { id: 2, moduleName: 'C++', facultyName: 'Prof. Johnson', lastDate: '2024-11-10' },
        { id: 3, moduleName: 'DBMS', facultyName: 'Ms. Williams', lastDate: '2024-12-01' },
    ];

    const [feedbackList, setFeedbackList] = useState(initialFeedbackData);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isReportModalOpen, setReportModalOpen] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState(null);
    const [notification, setNotification] = useState({ message: '', isVisible: false });

    const showNotification = (message) => {
        setNotification({ message, isVisible: true });
        setTimeout(() => {
            setNotification({ message: '', isVisible: false });
        }, 3000);
    };

    const handleAddNew = (newFeedback) => {
        setFeedbackList([...feedbackList, { ...newFeedback, id: Date.now() }]);
        setAddModalOpen(false);
        showNotification('New feedback added successfully!');
    };

    const handleEdit = (updatedFeedback) => {
        setFeedbackList(feedbackList.map(item => item.id === updatedFeedback.id ? updatedFeedback : item));
        setEditModalOpen(false);
        setCurrentFeedback(null);
        showNotification('Feedback updated successfully!');
    };

    const handleDelete = (id) => {
        // Using a simple confirm dialog for this example.
        // In a real app, you might use a custom confirmation modal.
        if (window.confirm('Are you sure you want to delete this feedback entry?')) {
            setFeedbackList(feedbackList.filter(item => item.id !== id));
            showNotification('Feedback deleted successfully!');
        }
    };
    
    const openEditModal = (feedback) => {
        setCurrentFeedback(feedback);
        setEditModalOpen(true);
    };

    return (
        <section className="w-full lg:w-3/4">
            <Notification message={notification.message} isVisible={notification.isVisible} />
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Feedback</h2>
                <p className="text-gray-500">July 21, 2025</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-wrap justify-end gap-4 mb-6">
                    <button onClick={() => setAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center space-x-2">
                        <Icon name="add" /><span>Add New Feedback</span>
                    </button>
                     <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center space-x-2">
                        <Icon name="check_circle_outline" /><span>Check Past Records</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Module Name</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Feedback Report</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Edit</th>
                                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbackList.map(item => (
                                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm text-gray-800">{item.moduleName}</td>
                                    <td className="py-3 px-4 text-sm">
                                        <button onClick={() => setReportModalOpen(true)} className="text-blue-600 hover:underline">Check</button>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => openEditModal(item)} className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center space-x-1">
                                            <Icon name="edit" className="text-sm" /><span>Edit</span>
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center space-x-1">
                                            <Icon name="delete" className="text-sm" /><span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <FeedbackFormModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onSave={handleAddNew} />
            <FeedbackFormModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} onSave={handleEdit} feedbackData={currentFeedback} />
            
            <Modal isOpen={isReportModalOpen} onClose={() => setReportModalOpen(false)} title="REPORT">
                <div className="flex justify-around text-center mb-8">
                    <div><p className="text-4xl font-bold text-green-600">69</p><p className="text-gray-500">Done</p></div>
                    <div><p className="text-4xl font-bold text-red-600">12</p><p className="text-gray-500">Pending Student</p></div>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md">Detailed</button>
                </div>
            </Modal>
        </section>
    );
};
export default FeedbackPage;