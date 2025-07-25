import React, { useState, useMemo } from 'react';
import { Edit, X } from 'lucide-react';

// --- Mock Data ---
const initialInstructors = [
    { id: 'ID1584852', firstName: 'Praful', lastName: 'Sharma', email: 'praful69@gmail.com', phone: '6969696969' },
    { id: 'ID1584853', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '9876543211' },
    { id: 'ID1584854', firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', phone: '9876543212' },
];

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
    };

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

// --- Instructor Form Component (for Add/Edit) ---
const InstructorForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
        initialData || { firstName: '', lastName: '', email: '', phone: '' }
    );
    
    const originalData = useMemo(() => initialData || { firstName: '', lastName: '', email: '', phone: '' }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData(originalData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name here..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name here..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Example@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={handleReset} className="px-6 py-2 bg-[#0d214f] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition">
                    Reset
                </button>
                <button type="submit" className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
                    Save
                </button>
            </div>
        </form>
    );
};

// --- Edit Instructor ID Prompt Modal ---
const EditPromptModal = ({ isOpen, onClose, onConfirm }) => {
    const [instructorId, setInstructorId] = useState('');

    const handleSubmit = () => {
        if (instructorId.trim()) {
            onConfirm(instructorId);
            setInstructorId('');
        } else {
            alert('Please enter an Instructor ID.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Instructor" size="sm">
            <div className="space-y-4 text-center">
                <p className="text-gray-600">Instructor ID (Autogenerated)</p>
                <input
                    type="text"
                    value={instructorId}
                    onChange={(e) => setInstructorId(e.target.value)}
                    placeholder="Enter here ....."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={handleSubmit} className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">
                    OK
                </button>
            </div>
        </Modal>
    );
};


// --- Main Instructor Details Page Component ---
const InstructorDetails = () => {
    const [instructors, setInstructors] = useState(initialInstructors);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isEditPromptOpen, setEditPromptOpen] = useState(false);
    const [isEditFormOpen, setEditFormOpen] = useState(false);
    const [editingInstructor, setEditingInstructor] = useState(null);

    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleRegister = (newInstructorData) => {
        const newInstructor = {
            ...newInstructorData,
            id: `ID${Math.floor(1000000 + Math.random() * 9000000)}`,
        };
        setInstructors(prev => [newInstructor, ...prev]);
        setRegisterModalOpen(false);
    };
    
    const handleEditPrompt = (instructorId) => {
        const instructorToEdit = instructors.find(inst => inst.id === instructorId);
        if (instructorToEdit) {
            setEditingInstructor(instructorToEdit);
            setEditPromptOpen(false);
            setEditFormOpen(true);
        } else {
            alert('Instructor with this ID not found.');
        }
    };

    const handleUpdateInstructor = (updatedData) => {
        setInstructors(prev => 
            prev.map(inst => inst.id === editingInstructor.id ? { ...inst, ...updatedData } : inst)
        );
        setEditFormOpen(false);
        setEditingInstructor(null);
    };

    const handleDelete = (idToDelete) => {
        if(window.confirm(`Are you sure you want to delete instructor with ID: ${idToDelete}?`)) {
            setInstructors(prev => prev.filter(inst => inst.id !== idToDelete));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-800">Instructor Details</h1>
                    <p className="text-md text-gray-500">{today}</p>
                </header>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-end gap-4 mb-6">
                        <button 
                            onClick={() => setRegisterModalOpen(true)}
                            className="flex items-center gap-2 px-5 py-2 bg-[#0d214f] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                            Register New Instructor
                        </button>
                        <button 
                            onClick={() => setEditPromptOpen(true)}
                            className="flex items-center gap-2 px-5 py-2 bg-[#0d214f] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition">
                            <Edit size={18} />
                            Edit Instructor
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#0d214f] text-white text-left">
                                    <th className="p-3 font-semibold">Instructor ID</th>
                                    <th className="p-3 font-semibold">Instructor Name</th>
                                    <th className="p-3 font-semibold">Email</th>
                                    <th className="p-3 font-semibold">Phone No</th>
                                    <th className="p-3 font-semibold text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instructors.map((inst) => (
                                    <tr key={inst.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 text-gray-700">{inst.id}</td>
                                        <td className="p-3 text-gray-900 font-medium">{`${inst.firstName} ${inst.lastName}`}</td>
                                        <td className="p-3 text-gray-700">{inst.email}</td>
                                        <td className="p-3 text-gray-700">{inst.phone}</td>
                                        <td className="p-3 text-center">
                                            <button 
                                                onClick={() => handleDelete(inst.id)}
                                                className="px-4 py-1 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition flex items-center gap-1 mx-auto">
                                                <X size={16} />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                 {/* Empty rows for styling */}
                                {[...Array(Math.max(0, 5 - instructors.length))].map((_, i) => (
                                    <tr key={`empty-${i}`} className="border-b border-gray-200 h-12">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     <div className="flex justify-end gap-4 mt-6">
                        <button className="px-8 py-2 bg-[#0d214f] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition">
                            Reset
                        </button>
                        <button className="px-8 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
                            Save
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} title="Enter New Instructor Details :">
                <InstructorForm onSave={handleRegister} onCancel={() => setRegisterModalOpen(false)} />
            </Modal>

            <EditPromptModal 
                isOpen={isEditPromptOpen} 
                onClose={() => setEditPromptOpen(false)} 
                onConfirm={handleEditPrompt}
            />

            {editingInstructor && (
                 <Modal isOpen={isEditFormOpen} onClose={() => setEditFormOpen(false)} title="Edit Instructor Details :">
                    <InstructorForm 
                        initialData={editingInstructor}
                        onSave={handleUpdateInstructor} 
                        onCancel={() => setEditFormOpen(false)} 
                    />
                </Modal>
            )}
        </div>
    );
};

export default InstructorDetails;
