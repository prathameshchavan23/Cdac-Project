import React, { useState, useMemo, useEffect } from "react";
import { Edit, X, UserPlus, ShieldAlert } from "lucide-react";
import { getAllAdmins, createAdmin, updateAdmin, deleteAdmin } from "../../services/adminService"; // Adjust path
import { getAllDepartments } from "../../services/departmentService"; // Adjust path
import { useAuth } from "../../context/AuthContext"; // Adjust path

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
const Modal = ({ isOpen, onClose, children, size = "md" }) => {
    if (!isOpen) return null;
    const sizeClasses = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className={`bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} transform transition-all duration-300`}>
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                     <h3 className="text-xl font-bold text-gray-800">{size === "sm" ? "" : (children.props.isEdit ? "Edit Admin Details" : "Enter New Admin Details")}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="px-6 pb-6 pt-4">{children}</div>
            </div>
        </div>
    );
};


// --- Delete Confirmation Modal ---
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, adminName }) => {
    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <div className="text-center">
                 <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Deletion</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete admin <span className="font-semibold">{adminName}</span>? This action cannot be undone.</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">No, Cancel</button>
                    <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">Yes, Delete</button>
                </div>
            </div>
        </Modal>
    );
};

// --- Admin Form Component (for Add/Edit) ---
const AdminForm = ({ initialData, onSave, onCancel, isEdit = false, departments }) => {
    const [formData, setFormData] = useState(
        initialData || { firstName: "", lastName: "", email: "", password: "", departmentId: "", phoneNumber: "", address: "", role: "" }
    );
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData(initialData || { firstName: "", lastName: "", email: "", password: "", departmentId: "", phoneNumber: "", address: "", role: "" });
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format.";
        if (!isEdit && (!formData.password || formData.password.length < 8)) newErrors.password = "Password must be at least 8 characters long.";
        if (!formData.departmentId) newErrors.departmentId = "Department is required.";
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
        else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits.";
        if (!formData.address.trim()) newErrors.address = "Address is required.";
        if (!formData.role.trim()) newErrors.role = "Role is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
                <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
            </div>
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
            {!isEdit && <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select name="departmentId" value={formData.departmentId} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.departmentId ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="">-- Select Department --</option>
                    {departments.map(dept => <option key={dept.departmentId} value={dept.departmentId}>{dept.departmentName}</option>)}
                </select>
                {errors.departmentId && <p className="text-red-500 text-xs mt-1">{errors.departmentId}</p>}
            </div>
            <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
            <InputField label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg ${errors.role ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="">-- Select Role --</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                </select>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg">Save</button>
            </div>
        </form>
    );
};

const InputField = ({ label, error, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input {...props} className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 transition-colors ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

// --- Main Admin Details Page Component ---
const AdminDetails = () => {
    const [admins, setAdmins] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [modalState, setModalState] = useState({ type: null, data: null });
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const { user } = useAuth();
    const isSuperAdmin = user?.role === 'Super Admin';
    
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
            const [adminsData, departmentsData] = await Promise.all([getAllAdmins(), getAllDepartments()]);
            setAdmins(adminsData);
            setDepartments(departmentsData);
        } catch (error) {
            setNotification({ message: "Failed to fetch initial data.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isSuperAdmin) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [isSuperAdmin]);

    const handleAddAdmin = async (newAdminData) => {
        try {
            await createAdmin(newAdminData);
            setModalState({ type: null });
            setNotification({ message: "Admin added successfully!", type: 'success' });
            fetchData();
        } catch (error) {
            setModalState({ type: null });
            setNotification({ message: error.response?.data?.message || "Failed to add admin.", type: 'error' });
        }
    };

    const handleEditClick = (admin) => {
        setModalState({ type: "editForm", data: admin });
    };

    const handleUpdateAdmin = async (updatedData) => {
        try {
            await updateAdmin(modalState.data.adminId, updatedData);
            setModalState({ type: null });
            setNotification({ message: "Admin updated successfully!", type: 'success' });
            fetchData();
        } catch (error) {
            setModalState({ type: null });
            setNotification({ message: error.response?.data?.message || "Failed to update admin.", type: 'error' });
        }
    };

    const handleDeleteClick = (admin) => {
        setModalState({ type: "deleteConfirm", data: admin });
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteAdmin(modalState.data.adminId);
            setModalState({ type: null });
            setNotification({ message: "Admin deleted successfully!", type: 'success' });
            fetchData();
        } catch (error) {
            setModalState({ type: null });
            setNotification({ message: error.response?.data?.message || "This admin may be linked to other records.", type: 'error' });
        }
    };

    if (!isSuperAdmin) {
        return (
            <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
                <div className="text-center bg-white p-12 rounded-xl shadow-lg">
                    <ShieldAlert size={60} className="mx-auto text-yellow-500 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
                    <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-800">Admin Details</h1>
                </header>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                    <div className="flex justify-end gap-4 mb-6">
                        <button onClick={() => setModalState({ type: "addForm" })} className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                            <UserPlus size={18} /> Add New Admin
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                             <thead className="border-b-2 border-slate-200 text-slate-600">
                                <tr>
                                    <th className="p-4 font-semibold">Admin ID</th>
                                    <th className="p-4 font-semibold">Admin Name</th>
                                    <th className="p-4 font-semibold">Email</th>
                                    <th className="p-4 font-semibold">Department</th>
                                    <th className="p-4 font-semibold">Phone No</th>
                                    <th className="p-4 font-semibold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr><td colSpan="6" className="text-center p-8 text-slate-500">Loading...</td></tr>
                                ) : admins.map((admin) => (
                                    <tr key={admin.adminId} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-4 text-slate-600">{admin.adminId}</td>
                                        <td className="p-4 font-medium text-slate-800">{`${admin.firstName} ${admin.lastName}`}</td>
                                        <td className="p-4 text-slate-600">{admin.email}</td>
                                        <td className="p-4 text-slate-600">{admin.departmentName}</td>
                                        <td className="p-4 text-slate-600">{admin.phoneNumber}</td>
                                        <td className="p-4 text-center">
                                            <button 
                                                onClick={() => handleEditClick(admin)} 
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                                disabled={admin.role === 'Super Admin'}
                                                title={admin.role === 'Super Admin' ? 'Cannot edit Super Admin' : 'Edit Admin'}
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(admin)} 
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-full ml-2 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                                disabled={admin.role === 'Super Admin'}
                                                title={admin.role === 'Super Admin' ? 'Cannot delete Super Admin' : 'Delete Admin'}
                                            >
                                                <X size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={modalState.type === "addForm" || modalState.type === "editForm"} onClose={() => setModalState({ type: null })}>
                <AdminForm
                    isEdit={modalState.type === "editForm"}
                    initialData={modalState.data}
                    onSave={modalState.type === "editForm" ? handleUpdateAdmin : handleAddAdmin}
                    onCancel={() => setModalState({ type: null })}
                    departments={departments}
                />
            </Modal>

            {modalState.type === "deleteConfirm" && (
                <DeleteConfirmationModal
                    isOpen={true}
                    onClose={() => setModalState({ type: null })}
                    onConfirm={handleConfirmDelete}
                    adminName={`${modalState.data.firstName} ${modalState.data.lastName}`}
                />
            )}
            
            <Notification 
                message={notification.message} 
                type={notification.type} 
                onclose={() => setNotification({ message: '', type: '' })} 
            />
        </div>
    );
};

export default AdminDetails;
