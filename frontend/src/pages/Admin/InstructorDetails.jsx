import React, { useState, useMemo } from "react";
import { Edit, X, Plus } from "lucide-react";

// --- Mock Data ---
const initialInstructors = [
  {
    id: "ID1584852",
    firstName: "Praful",
    lastName: "Sharma",
    email: "praful69@gmail.com",
    phone: "9876543210",
  },
  {
    id: "ID1584853",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "9876543211",
  },
  {
    id: "ID1584854",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "9876543212",
  },
];

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div
        className={`bg-white rounded-2xl shadow-xl w-full ${sizeClasses[size]} transform transition-all duration-300`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors"
          >
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
    initialData || { firstName: "", lastName: "", email: "", phone: "" }
  );
  const [errors, setErrors] = useState({});

  const originalData = useMemo(
    () => initialData || { firstName: "", lastName: "", email: "", phone: "" },
    [initialData]
  );

  const validate = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (!/^[A-Za-z]{2,}$/.test(formData.firstName)) {
      newErrors.firstName =
        "First name must be at least 2 letters and contain no numbers or symbols.";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z]{2,}$/.test(formData.lastName)) {
      newErrors.lastName =
        "Last name must be at least 2 letters and contain no numbers or symbols.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleReset = () => {
    setFormData(originalData);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name here..."
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 transition-colors ${
            errors.firstName
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.firstName && (
          <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name here..."
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 transition-colors ${
            errors.lastName
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.lastName && (
          <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Example@email.com"
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 transition-colors ${
            errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="9876543210"
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 transition-colors ${
            errors.phone
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.phone && (
          <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
        )}
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2 bg-[#0d214f] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};

// --- Edit Instructor ID Prompt Modal ---
const EditPromptModal = ({ isOpen, onClose, onConfirm }) => {
  const [instructorId, setInstructorId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!instructorId.trim()) {
      setError("Please enter an Instructor ID.");
      return;
    }
    onConfirm(instructorId);
    setInstructorId("");
    setError("");
  };

  const handleClose = () => {
    setInstructorId("");
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Instructor"
      size="sm"
    >
      <div className="space-y-4 text-center">
        <p className="text-gray-600">
          Enter the ID of the instructor you wish to edit.
        </p>
        <input
          type="text"
          value={instructorId}
          onChange={(e) => {
            setInstructorId(e.target.value.toUpperCase());
            if (error) setError("");
          }}
          placeholder="Enter ID here..."
          className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Find Instructor
        </button>
      </div>
    </Modal>
  );
};

// --- Delete Confirmation Modal ---
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  instructorName,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion" size="sm">
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the instructor{" "}
          <span className="font-bold">{instructorName}</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Yes, Delete
          </button>
        </div>
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
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState(null);

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
    setInstructors((prev) => [newInstructor, ...prev]);
    setRegisterModalOpen(false);
  };

  const handleEditPrompt = (instructorId) => {
    const instructorToEdit = instructors.find(
      (inst) => inst.id === instructorId
    );
    if (instructorToEdit) {
      setEditingInstructor(instructorToEdit);
      setEditPromptOpen(false);
      setEditFormOpen(true);
    } else {
      alert("Instructor with this ID not found.");
    }
  };

  const handleUpdateInstructor = (updatedData) => {
    setInstructors((prev) =>
      prev.map((inst) =>
        inst.id === editingInstructor.id ? { ...inst, ...updatedData } : inst
      )
    );
    setEditFormOpen(false);
    setEditingInstructor(null);
  };

  const handleDeleteClick = (instructor) => {
    setInstructorToDelete(instructor);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (instructorToDelete) {
      setInstructors((prev) =>
        prev.filter((inst) => inst.id !== instructorToDelete.id)
      );
      setDeleteConfirmOpen(false);
      setInstructorToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Instructor Details
          </h1>
          <p className="text-md text-gray-500">{today}</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-end gap-4 mb-6">
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-[#0d214f] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition"
            >
              <Plus size={18} />
              Register New Instructor
            </button>
            <button
              onClick={() => setEditPromptOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-[#0d214f] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition"
            >
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
                  <tr
                    key={inst.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-3 text-gray-700">{inst.id}</td>
                    <td className="p-3 text-gray-900 font-medium">{`${inst.firstName} ${inst.lastName}`}</td>
                    <td className="p-3 text-gray-700">{inst.email}</td>
                    <td className="p-3 text-gray-700">{inst.phone}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteClick(inst)}
                        className="px-4 py-1 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition flex items-center gap-1 mx-auto"
                      >
                        <X size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Empty rows for styling */}
                {[...Array(Math.max(0, 5 - instructors.length))].map((_, i) => (
                  <tr
                    key={`empty-${i}`}
                    className="border-b border-gray-200 h-12"
                  >
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
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        title="Enter New Instructor Details :"
      >
        <InstructorForm
          onSave={handleRegister}
          onCancel={() => setRegisterModalOpen(false)}
        />
      </Modal>

      <EditPromptModal
        isOpen={isEditPromptOpen}
        onClose={() => setEditPromptOpen(false)}
        onConfirm={handleEditPrompt}
      />

      {editingInstructor && (
        <Modal
          isOpen={isEditFormOpen}
          onClose={() => setEditFormOpen(false)}
          title="Edit Instructor Details :"
        >
          <InstructorForm
            initialData={editingInstructor}
            onSave={handleUpdateInstructor}
            onCancel={() => setEditFormOpen(false)}
          />
        </Modal>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        instructorName={
          instructorToDelete
            ? `${instructorToDelete.firstName} ${instructorToDelete.lastName}`
            : ""
        }
      />
    </div>
  );
};

export default InstructorDetails;
