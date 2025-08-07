import React, { useState, useMemo, useEffect } from "react";
import {
  PlusCircle,
  Edit,
  Trash2,
  X,
  Search,
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  User,
  GraduationCap,
} from "lucide-react";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllDepartments,
} from "../../services/studentService";

const DEFAULT_ITEMS_PER_PAGE = 10;

// ===================================================================================
// --- Main Component ---
// ===================================================================================
const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: DEFAULT_ITEMS_PER_PAGE,
    totalPages: 1,
    totalElements: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents(0, DEFAULT_ITEMS_PER_PAGE);
    fetchDepartments();
  }, []);

  const fetchStudents = async (page, size) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllStudents(page, size, searchTerm);
      setStudents(data.content || []);
      setPagination({
        page: data.number,
        size: data.size,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
      });
    } catch (err) {
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const deptData = await getAllDepartments();
      setDepartments(deptData);
    } catch (err) {
      console.error("Failed to load departments");
    }
  };

  const handlePageChange = (page) => {
    fetchStudents(page - 1, pagination.size);
  };

  const handleAddStudent = async (newStudentData) => {
    try {
      await createStudent(newStudentData);
      setAddModalOpen(false);
      fetchStudents(0, pagination.size);
      alert("Student added successfully!");
    } catch (err) {
      alert("Failed to add student. Please check the details and try again.");
    }
  };

  const handleEditStudent = async (updatedStudentData) => {
    try {
      await updateStudent(editingStudent.prn, updatedStudentData);
      setEditModalOpen(false);
      setEditingStudent(null);
      fetchStudents(pagination.page, pagination.size);
      alert("Student updated successfully!");
    } catch (err) {
      alert("Failed to update student.");
    }
  };

  const handleDeleteByPrn = async (prnToDelete) => {
    try {
      await deleteStudent(prnToDelete);
      setDeleteModalOpen(false);
      fetchStudents(0, pagination.size);
      alert("Student deleted successfully!");
    } catch (err) {
      alert("Failed to delete student. They may be linked to other records.");
    }
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
            `}</style>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && fetchStudents(0, pagination.size)
                }
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setAddModalOpen(true)}
                className="w-full justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 transition-all duration-200"
              >
                <PlusCircle size={18} /> Add Student
              </button>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="w-full justify-center px-4 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 flex items-center gap-0 transition-all duration-200"
              >
                <Trash2 size={18} /> Delete Student
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center p-8">Loading students...</div>
        ) : error ? (
          <div className="text-center p-8 text-red-500">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 font-semibold text-gray-600">PRN</th>
                    <th className="p-4 font-semibold text-gray-600">Name</th>
                    <th className="p-4 font-semibold text-gray-600">
                      Contact Info
                    </th>
                    <th className="p-4 font-semibold text-gray-600">
                      Department
                    </th>
                    <th className="p-4 font-semibold text-gray-600 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.length > 0 ? (
                    students.map((student) => (
                      <tr
                        key={student.prn}
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <td className="p-4 font-mono text-gray-700">
                          {student.prn}
                        </td>
                        <td className="p-4 font-medium text-gray-900">{`${student.firstName} ${student.lastName}`}</td>
                        <td className="p-4 text-gray-600">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail size={14} /> {student.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <Phone size={14} /> {student.phoneNumber}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">
                          {student.departmentName}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => openEditModal(student)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition"
                              title="Edit Student"
                            >
                              <Edit size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-8 text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search size={48} className="text-gray-300" />
                          <p className="font-semibold">No students found</p>
                          <p className="text-sm">Try adjusting your search.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {pagination.totalElements > 0 && (
              <Pagination
                currentPage={pagination.page + 1}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={pagination.size}
                totalItems={pagination.totalElements}
              />
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Student"
        size="lg"
      >
        <StudentForm
          onSave={handleAddStudent}
          onCancel={() => setAddModalOpen(false)}
          departments={departments}
        />
      </Modal>

      {editingStudent && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="Edit Student Details"
          size="lg"
        >
          <StudentForm
            initialData={editingStudent}
            onSave={handleEditStudent}
            onCancel={() => {
              setEditModalOpen(false);
              setEditingStudent(null);
            }}
            departments={departments}
          />
        </Modal>
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteByPrn}
      />
    </div>
  );
};

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} transform transition-all duration-300 scale-100`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap size={24} className="text-blue-600" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Student Form ---
const StudentForm = ({ initialData, onSave, onCancel, departments }) => {
  const [formData, setFormData] = useState(
    initialData || {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      email: "",
      departmentId: 1,
      prn: "",
      password: "",
    }
  );
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    // ... (validation logic can be added here later)
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const studentData = {
        ...formData,
        departmentId: parseInt(formData.departmentId, 10), // ✅ Convert to integer
      };

      console.log("Submitting student:", studentData);
      onSave(studentData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* PRN and Password (for Add New) */}
      {!initialData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              PRN *
            </label>
            <input
              type="text"
              name="prn"
              value={formData.prn}
              onChange={handleChange}
              placeholder="Enter PRN"
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter initial password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
            />
          </div>
        </div>
      )}

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Contact and DOB */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Email and Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Address *
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="2"
          className="w-full px-4 py-2 border rounded-lg shadow-sm"
        />
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Department *
        </label>
        <select
          name="departmentId"
          value={formData.departmentId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.departmentId} value={dept.departmentId}>
              {dept.departmentName}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800"
        >
          Save Student
        </button>
      </div>
    </form>
  );
};

// --- Delete Modal ---
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const [prn, setPrn] = useState("");
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Student" size="sm">
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-gray-600 mb-4">
            This action cannot be undone. Enter the PRN to confirm.
          </p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter PRN
          </label>
          <input
            type="text"
            value={prn}
            onChange={(e) => setPrn(e.target.value)}
            placeholder="e.g., S2025001"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(prn)}
            disabled={!prn.trim()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
          >
            Delete Student
          </button>
        </div>
      </div>
    </Modal>
  );
};

// --- Pagination Component ---
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  if (totalPages <= 1) return null;
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
      <span className="text-sm text-gray-600">
        Showing {startItem}-{endItem} of {totalItems} students
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 border rounded-lg"
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded-lg"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="font-semibold">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-lg"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-lg"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default AdminStudents;
