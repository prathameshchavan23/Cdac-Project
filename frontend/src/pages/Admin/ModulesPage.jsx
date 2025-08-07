import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2, X } from "lucide-react";
import { getAllModules, createModule, updateModule, deleteModule } from '../../services/moduleService';
import { getAllDepartments } from '../../services/departmentService';

const ITEMS_PER_PAGE = 5;

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

// --- Add/Edit Module Modal ---
const ModuleModal = ({ isOpen, onClose, onSave, module, existingModules, departments }) => {
    const [formData, setFormData] = useState({ moduleId: "", moduleName: "", departmentId: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            setFormData({
                moduleId: module?.moduleId || "",
                moduleName: module?.moduleName || "",
                departmentId: module?.departmentId || ""
            });
            setErrors({});
        }
    }, [module, isOpen]);

    const validate = () => {
        const newErrors = {};
        if (!formData.moduleId.trim()) newErrors.moduleId = "Module ID is required.";
        else if (!module && existingModules.some(m => m.moduleId === formData.moduleId)) newErrors.moduleId = "This Module ID already exists.";
        
        if (!formData.moduleName.trim()) newErrors.moduleName = "Module name is required.";
        if (!formData.departmentId) newErrors.departmentId = "Department is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={module ? "Edit Module" : "Add New Module"}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Module ID</label>
                    <input name="moduleId" value={formData.moduleId} onChange={handleChange} placeholder="e.g., CS101" disabled={!!module}
                           className={`w-full px-4 py-2 border rounded-lg ${errors.moduleId ? 'border-red-500' : 'border-gray-300'} disabled:bg-gray-100`} />
                    {errors.moduleId && <p className="text-red-500 text-xs mt-1">{errors.moduleId}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Module Name</label>
                    <input name="moduleName" value={formData.moduleName} onChange={handleChange} placeholder="e.g., Advanced Java"
                           className={`w-full px-4 py-2 border rounded-lg ${errors.moduleName ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.moduleName && <p className="text-red-500 text-xs mt-1">{errors.moduleName}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select name="departmentId" value={formData.departmentId} onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.departmentId ? 'border-red-500' : 'border-gray-300'}`}>
                        <option value="">-- Select a Department --</option>
                        {departments.map(dept => (
                            <option key={dept.departmentId} value={dept.departmentId}>
                                {dept.departmentName}
                            </option>
                        ))}
                    </select>
                    {errors.departmentId && <p className="text-red-500 text-xs mt-1">{errors.departmentId}</p>}
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg">Save</button>
                </div>
            </form>
        </Modal>
    );
};

// --- Confirmation Modal for Deletion ---
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, moduleName }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Module">
            <div className="text-center">
                <p className="text-lg text-gray-700 mb-6">Are you sure you want to delete <span className="font-bold">"{moduleName}"</span>?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-8 py-2 bg-gray-200 rounded-lg">No</button>
                    <button onClick={onConfirm} className="px-8 py-2 bg-red-600 text-white rounded-lg">Yes, Delete</button>
                </div>
            </div>
        </Modal>
    );
};


// --- Main Component ---
const ModulesPage = () => {
    const [modules, setModules] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [deletingModule, setDeletingModule] = useState(null);

    // Effect to auto-hide notification
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchModules = async (page) => {
        setIsLoading(true);
        try {
            const data = await getAllModules(page, ITEMS_PER_PAGE);
            setModules(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (error) {
            setNotification({ message: "Failed to fetch modules.", type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const data = await getAllDepartments();
            setDepartments(data);
        } catch (error) {
            setNotification({ message: "Failed to fetch departments.", type: 'error' });
        }
    };

    useEffect(() => {
        fetchModules(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleAddModule = () => {
        setEditingModule(null);
        setAddEditModalOpen(true);
    };

    const handleEditModule = (module) => {
        const department = departments.find(d => d.departmentName === module.departmentName);
        const moduleWithDeptId = {
            ...module,
            departmentId: department ? department.departmentId : ""
        };
        setEditingModule(moduleWithDeptId);
        setAddEditModalOpen(true);
    };

    const handleSaveModule = async (moduleData) => {
        try {
            if (editingModule) {
                const { moduleId, ...updateData } = moduleData;
                await updateModule(editingModule.moduleId, updateData);
                setNotification({ message: "Module updated successfully!", type: 'success' });
            } else {
                await createModule(moduleData);
                setNotification({ message: "Module created successfully!", type: 'success' });
            }
            setAddEditModalOpen(false);
            setEditingModule(null);
            fetchModules(editingModule ? currentPage : 0);
        } catch (error) {
            setNotification({ message: error.response?.data?.message || 'Operation failed.', type: 'error' });
        }
    };

    const handleConfirmDelete = async () => {
        if (deletingModule) {
            try {
                await deleteModule(deletingModule.moduleId);
                setDeletingModule(null);
                fetchModules(currentPage);
                setNotification({ message: "Module deleted successfully!", type: 'success' });
            } catch (error) {
                setNotification({ message: error.response?.data?.message || 'Could not delete module.', type: 'error' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                 <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">Modules</h1>
                        <p className="text-md text-gray-500">Manage Course Modules</p>
                    </div>
                    <button
                        onClick={handleAddModule}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        <Plus size={18} /> Add New Module
                    </button>
                </header>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                    <ModulesTable
                        modules={modules}
                        onEdit={handleEditModule}
                        onDelete={setDeletingModule}
                        isLoading={isLoading}
                    />
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage + 1}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page - 1)}
                        />
                    )}
                </div>
            </div>

            {/* Modals */}
            <ModuleModal
                isOpen={isAddEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                onSave={handleSaveModule}
                module={editingModule}
                existingModules={modules}
                departments={departments}
            />
            <ConfirmDeleteModal
                isOpen={!!deletingModule}
                onClose={() => setDeletingModule(null)}
                onConfirm={handleConfirmDelete}
                moduleName={deletingModule?.moduleName || ""}
            />
            <Notification 
                message={notification.message} 
                type={notification.type} 
                onclose={() => setNotification({ message: '', type: '' })} 
            />
        </div>
    );
};

// --- Modules Table Component ---
const ModulesTable = ({ modules, onEdit, onDelete, isLoading }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead className="border-b-2 border-slate-200 text-slate-600">
                <tr>
                    <th className="p-4 font-semibold">Module ID</th>
                    <th className="p-4 font-semibold">Module Name</th>
                    <th className="p-4 font-semibold">Department</th>
                    <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    <tr><td colSpan="4" className="text-center p-8 text-slate-500">Loading modules...</td></tr>
                ) : modules.length === 0 ? (
                    <tr><td colSpan="4" className="text-center p-8 text-slate-500">No modules found.</td></tr>
                ) : (
                    modules.map((module) => (
                        <tr key={module.moduleId} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="p-4 text-slate-600 font-mono">{module.moduleId}</td>
                            <td className="p-4 font-medium text-slate-800">{module.moduleName}</td>
                            <td className="p-4 text-slate-600">{module.departmentName}</td>
                            <td className="p-4 text-center">
                                <button onClick={() => onEdit(module)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"><Edit size={18} /></button>
                                <button onClick={() => onDelete(module)} className="p-2 text-red-600 hover:bg-red-100 rounded-full ml-2"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 rounded-lg disabled:opacity-50"><ChevronLeft/></button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg disabled:opacity-50"><ChevronRight/></button>
        </div>
    );
};

export default ModulesPage;
