import React, { useState, useMemo, useEffect } from "react";
import { Edit, X, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
    getAllInstructors,
    getInstructorById,
    createInstructor,
    updateInstructor,
    deleteInstructor
} from "../../services/instructorService"; 

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


// --- Reusable Modal Component (Unchanged) ---
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
    if (!isOpen) return null;
    const sizeClasses = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className={`bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} transform transition-all duration-300`}>
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

// --- Instructor Form Component ---
const InstructorForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
        initialData || { firstName: "", lastName: "", email: "", contactNo: "" }
    );
    const [errors, setErrors] = useState({});

    const originalData = useMemo(
        () => initialData || { firstName: "", lastName: "", email: "", contactNo: "" },
        [initialData]
    );
    
    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
        if (!formData.contactNo.trim()) newErrors.contactNo = "Phone number is required.";
        else if (!/^\d{10}$/.test(formData.contactNo)) newErrors.contactNo = "Phone number must be exactly 10 digits.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handleReset = () => {
        setFormData(originalData);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name here..." className={`w-full px-4 py-2 border rounded-lg ${errors.firstName ? "border-red-500" : "border-gray-300"}`} />
                {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name here..." className={`w-full px-4 py-2 border rounded-lg ${errors.lastName ? "border-red-500" : "border-gray-300"}`} />
                {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Example@email.com" className={`w-full px-4 py-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`} />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="9876543210" className={`w-full px-4 py-2 border rounded-lg ${errors.contactNo ? "border-red-500" : "border-gray-300"}`} />
                {errors.contactNo && <p className="text-red-600 text-xs mt-1">{errors.contactNo}</p>}
            </div>
            <div className="flex justify-end gap-4 pt-4">
                 <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg">Save</button>
            </div>
        </form>
    );
};


// --- Main Instructor Details Page Component ---
const InstructorDetails = () => {
    const [instructors, setInstructors] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isEditFormOpen, setEditFormOpen] = useState(false);
    const [editingInstructor, setEditingInstructor] = useState(null);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [instructorToDelete, setInstructorToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });

    // Effect to auto-hide notification
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchInstructors = async (page) => {
        setIsLoading(true);
        try {
            const data = await getAllInstructors(page);
            setInstructors(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (error) {
            setNotification({ message: "Failed to fetch instructors.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInstructors(currentPage);
    }, [currentPage]);

    const handleRegister = async (newInstructorData) => {
        try {
            await createInstructor(newInstructorData);
            setRegisterModalOpen(false);
            fetchInstructors(0); 
            setNotification({ message: "Instructor registered successfully!", type: 'success' });
        } catch (error) {
            setNotification({ message: "Failed to register instructor.", type: 'error' });
        }
    };

    const handleEditClick = (instructor) => {
        setEditingInstructor(instructor);
        setEditFormOpen(true);
    };

    const handleUpdateInstructor = async (updatedData) => {
        try {
            await updateInstructor(editingInstructor.instructorId, updatedData);
            setEditFormOpen(false);
            setEditingInstructor(null);
            fetchInstructors(currentPage);
            setNotification({ message: "Instructor updated successfully!", type: 'success' });
        } catch (error) {
            setNotification({ message: "Failed to update instructor.", type: 'error' });
        }
    };

    const handleDeleteClick = (instructor) => {
        setInstructorToDelete(instructor);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (instructorToDelete) {
            try {
                await deleteInstructor(instructorToDelete.instructorId);
                setDeleteConfirmOpen(false);
                setInstructorToDelete(null);
                fetchInstructors(currentPage);
                setNotification({ message: "Instructor deleted successfully!", type: 'success' });
            } catch (error) {
                setNotification({ message: "Failed to delete instructor. They may be linked to other records.", type: 'error' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                 <header className="mb-6">
                     <h1 className="text-4xl font-bold text-gray-800">Instructor Details</h1>
                 </header>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                    <div className="flex justify-end gap-4 mb-6">
                        <button onClick={() => setRegisterModalOpen(true)} className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700">
                            <Plus size={18} /> Register New Instructor
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b-2 border-slate-200 text-slate-600">
                                <tr>
                                    <th className="p-4 font-semibold">Instructor ID</th>
                                    <th className="p-4 font-semibold">Instructor Name</th>
                                    <th className="p-4 font-semibold">Email</th>
                                    <th className="p-4 font-semibold">Phone No</th>
                                    <th className="p-4 font-semibold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr><td colSpan="5" className="text-center p-8 text-slate-500">Loading...</td></tr>
                                ) : instructors.map((inst) => (
                                    <tr key={inst.instructorId} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-4 text-slate-600">{inst.instructorId}</td>
                                        <td className="p-4 font-medium text-slate-800">{`${inst.firstName} ${inst.lastName}`}</td>
                                        <td className="p-4 text-slate-600">{inst.email}</td>
                                        <td className="p-4 text-slate-600">{inst.contactNo}</td>
                                        <td className="p-4 text-center flex justify-center gap-2">
                                            <button onClick={() => handleEditClick(inst)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"><Edit size={18} /></button>
                                            <button onClick={() => handleDeleteClick(inst)} className="p-2 text-red-600 hover:bg-red-100 rounded-full"><X size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <span className="text-sm text-gray-600">Page {currentPage + 1} of {totalPages}</span>
                        <div className="flex gap-2">
                            <button onClick={() => fetchInstructors(currentPage - 1)} disabled={currentPage === 0} className="p-2 disabled:opacity-50"><ChevronLeft /></button>
                            <button onClick={() => fetchInstructors(currentPage + 1)} disabled={currentPage >= totalPages - 1} className="p-2 disabled:opacity-50"><ChevronRight /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} title="Enter New Instructor Details">
                <InstructorForm onSave={handleRegister} onCancel={() => setRegisterModalOpen(false)} />
            </Modal>

            {editingInstructor && (
                <Modal isOpen={isEditFormOpen} onClose={() => setEditFormOpen(false)} title="Edit Instructor Details">
                    <InstructorForm initialData={editingInstructor} onSave={handleUpdateInstructor} onCancel={() => setEditFormOpen(false)} />
                </Modal>
            )}

            <DeleteConfirmationModal
                isOpen={isDeleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                instructorName={instructorToDelete ? `${instructorToDelete.firstName} ${instructorToDelete.lastName}` : ""}
            />

            <Notification 
                message={notification.message} 
                type={notification.type} 
                onclose={() => setNotification({ message: '', type: '' })} 
            />
        </div>
    );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, instructorName }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion" size="sm">
            <div className="text-center">
                <p className="text-gray-600 mb-6">Are you sure you want to delete <span className="font-bold">{instructorName}</span>?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg">Yes, Delete</button>
                </div>
            </div>
        </Modal>
    );
};

export default InstructorDetails;
