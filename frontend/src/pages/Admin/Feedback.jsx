import React, { useState, useEffect } from "react";
import { Plus, Trash2, Power, BarChart2, MessageSquare, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllFeedbackSessions, createFeedbackSession, closeFeedbackSession, deleteFeedbackSession } from '../../services/adminfeedbackService';
import { getAllInstructors } from '../../services/instructorService';
import { getAllModules } from '../../services/moduleService';

// --- A simple, self-contained notification component ---
const Notification = ({ message, type, onclose }) => {
    if (!message) return null;

    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-xl text-white transition-opacity duration-300 z-50";
    const typeClasses = type === 'success' ? 'bg-green-600' : 'bg-red-600';

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            <span>{message}</span>
            <button onClick={onclose} className="ml-4 font-bold">X</button>
        </div>
    );
};

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative transform transition-all duration-300">
                 <div className="flex justify-between items-center pb-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="pt-6">{children}</div>
            </div>
        </div>
    );
};

// --- AddFeedbackModal Component ---
const AddFeedbackModal = ({ isOpen, onClose, onSave, instructors, modules }) => {
    const [moduleId, setModuleId] = useState("");
    const [instructorId, setInstructorId] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!moduleId || !instructorId) {
            setError("Please select both a module and an instructor.");
            return;
        }
        setError("");
        onSave({ moduleId, instructorId });
    };
    
    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setModuleId("");
            setInstructorId("");
            setError("");
        }
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Schedule New Feedback">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Module</label>
                    <select value={moduleId} onChange={(e) => setModuleId(e.target.value)} className="w-full p-3 border rounded-lg" required>
                        <option value="" disabled>Select Module</option>
                        {modules.map(mod => <option key={mod.moduleId} value={mod.moduleId}>{mod.moduleName}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                    <select value={instructorId} onChange={(e) => setInstructorId(e.target.value)} className="w-full p-3 border rounded-lg" required>
                        <option value="" disabled>Select Instructor</option>
                        {instructors.map(inst => <option key={inst.instructorId} value={inst.instructorId}>{`${inst.firstName} ${inst.lastName}`}</option>)}
                    </select>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Schedule</button>
                </div>
            </form>
        </Modal>
    );
};

// --- Confirmation Modals ---
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, children }) => (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
        <div className="text-center">
            <p className="text-gray-600 mb-6">{children}</p>
            <div className="flex justify-center gap-4">
                <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg">Confirm</button>
            </div>
        </div>
    </Modal>
);


const Feedback = () => {
    const [sessions, setSessions] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [modules, setModules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [sessionToClose, setSessionToClose] = useState(null);
    const [sessionToDelete, setSessionToDelete] = useState(null);
    const navigate = useNavigate();

    // Effect to auto-hide notification
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [sessionsData, instructorsData, modulesData] = await Promise.all([
                getAllFeedbackSessions(),
                getAllInstructors(0, 1000), // Fetch all for dropdown
                getAllModules(0, 1000)      // Fetch all for dropdown
            ]);
            setSessions(sessionsData);
            setInstructors(instructorsData.content);
            setModules(modulesData.content);
        } catch (error) {
            setNotification({ message: "Failed to load data.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateSession = async (sessionData) => {
        try {
            await createFeedbackSession(sessionData);
            setAddModalOpen(false);
            fetchData();
            setNotification({ message: "Feedback session created successfully!", type: 'success' });
        } catch (error) {
            setNotification({ message: "Failed to create session.", type: 'error' });
        }
    };

    const handleConfirmClose = async () => {
        if (!sessionToClose) return;
        try {
            await closeFeedbackSession(sessionToClose.sessionId);
            fetchData();
            setNotification({ message: "Session closed successfully.", type: 'success' });
        } catch (error) {
            setNotification({ message: "Failed to close session.", type: 'error' });
        } finally {
            setSessionToClose(null);
        }
    };
    
    const handleConfirmDelete = async () => {
        if (!sessionToDelete) return;
         try {
            await deleteFeedbackSession(sessionToDelete.sessionId);
            fetchData();
            setNotification({ message: "Session deleted successfully.", type: 'success' });
        } catch (error) {
            setNotification({ message: "Failed to delete session.", type: 'error' });
        } finally {
            setSessionToDelete(null);
        }
    };

    return (
        <div className="p-8 bg-slate-50 min-h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Feedback</h1>
                    <p className="text-slate-500 mt-1">Manage feedback schedules and reports</p>
                </div>
                <button onClick={() => setAddModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 flex items-center gap-2">
                    <Plus size={18} /> Schedule New Feedback
                </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-slate-200 text-slate-600">
                            <tr>
                                <th className="p-4 font-semibold">Instructor</th>
                                <th className="p-4 font-semibold">Module</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="4" className="text-center p-8 text-slate-500">Loading...</td></tr>
                            ) : sessions.map((session) => (
                                <tr key={session.sessionId} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="p-4 font-medium text-slate-800">{session.instructorName}</td>
                                    <td className="p-4 text-slate-600">{session.moduleName}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${session.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                                            {session.active ? 'Active' : 'Closed'}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-center items-center gap-2">
                                        <button onClick={() => navigate(`/staff/feedback/dashboard/${session.sessionId}`)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="View Dashboard"><BarChart2 size={18} /></button>
                                        <button onClick={() => navigate(`/staff/feedback/reports/${session.sessionId}`)} className="p-2 text-purple-600 hover:bg-purple-100 rounded-full" title="View Comments"><MessageSquare size={18} /></button>
                                        <button onClick={() => setSessionToClose(session)} disabled={!session.active} className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full disabled:opacity-40 disabled:cursor-not-allowed" title="Close Session"><Power size={18} /></button>
                                        <button onClick={() => setSessionToDelete(session)} className="p-2 text-red-600 hover:bg-red-100 rounded-full" title="Delete Session"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddFeedbackModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onSave={handleCreateSession} instructors={instructors} modules={modules} />
            
            {sessionToClose && (
                <ConfirmationModal
                    isOpen={!!sessionToClose}
                    onClose={() => setSessionToClose(null)}
                    onConfirm={handleConfirmClose}
                    title="Confirm Close Session"
                >
                    Are you sure you want to close this feedback session?
                </ConfirmationModal>
            )}

            {sessionToDelete && (
                 <ConfirmationModal
                    isOpen={!!sessionToDelete}
                    onClose={() => setSessionToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    title="Confirm Delete Session"
                >
                    Are you sure you want to PERMANENTLY DELETE this session and all its responses?
                </ConfirmationModal>
            )}

            <Notification 
                message={notification.message} 
                type={notification.type} 
                onclose={() => setNotification({ message: '', type: '' })} 
            />
        </div>
    );
};

export default Feedback;
