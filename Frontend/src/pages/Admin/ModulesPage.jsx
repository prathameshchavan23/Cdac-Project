import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Plus,
  Edit,
  Trash2,
  X,
} from "lucide-react";

// --- Mock Data ---
const initialModules = [
  { id: "CS101", name: "COSSDM", departmentId: "10" },
  { id: "CS102", name: "ADV JAVA", departmentId: "10" },
  { id: "CS103", name: "Dot Net", departmentId: "10" },
  { id: "CS201", name: "Database Management", departmentId: "20" },
  { id: "CS202", name: "Operating Systems", departmentId: "20" },
  { id: "CS301", name: "Networking", departmentId: "30" },
  { id: "CS302", name: "Software Engineering", departmentId: "30" },
  { id: "CS303", name: "Web Technologies", departmentId: "30" },
  { id: "CS401", name: "Machine Learning", departmentId: "40" },
  { id: "CS402", name: "Artificial Intelligence", departmentId: "40" },
];

const upcomingEventsData = [
  { title: "Math 101 Exam", date: "2024-10-21" },
  { title: "History 202 Lecture", date: "2024-10-22" },
  { title: "Physics Lab", date: "2024-10-24" },
];

const ITEMS_PER_PAGE = 5;

// --- Main Component ---
const ModulesPage = () => {
  const [modules, setModules] = useState(initialModules);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [deletingModuleId, setDeletingModuleId] = useState(null);

  // --- Dynamic Data ---
  const todayFormatted = selectedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // --- Pagination Logic ---
  const paginatedModules = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return modules.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [modules, currentPage]);
  const totalPages = Math.ceil(modules.length / ITEMS_PER_PAGE);

  // --- Handlers ---
  const handleAddModule = () => {
    setEditingModule(null);
    setAddEditModalOpen(true);
  };

  const handleEditModule = (module) => {
    setEditingModule(module);
    setAddEditModalOpen(true);
  };

  const handleSaveModule = (moduleData) => {
    if (editingModule) {
      // Update existing module
      setModules((prev) =>
        prev.map((m) =>
          m.id === editingModule.id ? { ...m, ...moduleData } : m
        )
      );
    } else {
      // Add new module with validation for unique ID
      if (modules.some((m) => m.id === moduleData.id)) {
        alert("Module ID already exists. Please use a unique ID.");
        return;
      }
      setModules((prev) => [moduleData, ...prev]);
    }
    setAddEditModalOpen(false);
    setEditingModule(null);
  };

  const handleDeleteRequest = (moduleId) => {
    setDeletingModuleId(moduleId);
  };

  const handleConfirmDelete = () => {
    if (deletingModuleId) {
      setModules((prev) => prev.filter((m) => m.id !== deletingModuleId));
      setDeletingModuleId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <CalendarView
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <UpcomingEvents events={upcomingEventsData} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Modules</h1>
              <p className="text-md text-gray-500">{todayFormatted}</p>
            </div>
            <button
              onClick={handleAddModule}
              className="flex items-center gap-2 px-4 py-2 bg-[#0d214f] text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition"
            >
              <Plus size={18} />
              Add New Module
            </button>
          </header>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <ModulesTable
              modules={paginatedModules}
              onEdit={handleEditModule}
              onDelete={handleDeleteRequest}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ModuleModal
        isOpen={isAddEditModalOpen}
        onClose={() => setAddEditModalOpen(false)}
        onSave={handleSaveModule}
        module={editingModule}
      />
      <ConfirmDeleteModal
        isOpen={!!deletingModuleId}
        onClose={() => setDeletingModuleId(null)}
        onConfirm={handleConfirmDelete}
        moduleName={modules.find((m) => m.id === deletingModuleId)?.name || ""}
      />
    </div>
  );
};

// --- Calendar Component ---
const CalendarView = ({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
}) => {
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const today = new Date();

  const changeMonth = (offset) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-bold text-lg">{monthYear}</h3>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={`${day}-${index}`}>{day}</div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const dayNumber = day + 1;
          const isToday =
            dayNumber === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
          const isSelected =
            dayNumber === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear();
          return (
            <button
              key={dayNumber}
              onClick={() =>
                setSelectedDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    dayNumber
                  )
                )
              }
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isSelected
                  ? "bg-[#0d214f] text-white"
                  : isToday
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Upcoming Events Component ---
const UpcomingEvents = ({ events }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="font-bold text-lg mb-4">Upcoming Events</h3>
    <div className="space-y-4">
      {events.map((event, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Calendar size={20} className="text-gray-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{event.title}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Modules Table Component ---
const ModulesTable = ({ modules, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b-2 border-gray-100">
          <th className="p-4 font-semibold text-gray-600">Module Name</th>
          <th className="p-4 font-semibold text-gray-600 text-center">Edit</th>
          <th className="p-4 font-semibold text-gray-600 text-center">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {modules.map((module) => (
          <tr
            key={module.id}
            className="border-b border-gray-100 hover:bg-gray-50"
          >
            <td className="p-4 font-medium text-gray-800">{module.name}</td>
            <td className="p-4 text-center">
              <button
                onClick={() => onEdit(module)}
                className="px-4 py-2 bg-[#0d214f] text-white font-semibold rounded-lg shadow-sm hover:bg-opacity-90 transition flex items-center gap-2 mx-auto"
              >
                <Edit size={16} /> Edit
              </button>
            </td>
            <td className="p-4 text-center">
              <button
                onClick={() => onDelete(module.id)}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-sm hover:bg-red-700 transition flex items-center gap-2 mx-auto"
              >
                <Trash2 size={16} /> Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    if (currentPage > 2) pages.push(currentPage - 1);
    if (currentPage !== 1 && currentPage !== totalPages)
      pages.push(currentPage);
    if (currentPage < totalPages - 1) pages.push(currentPage + 1);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-[#0d214f] text-white font-semibold rounded-lg disabled:opacity-50"
      >
        previous
      </button>
      {Array.from(new Set(pages)).map((page, i) =>
        page === "..." ? (
          <span key={i} className="px-4 py-2">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === page ? "bg-[#0d214f] text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-[#0d214f] text-white font-semibold rounded-lg disabled:opacity-50"
      >
        next
      </button>
    </div>
  );
};

// --- Reusable Modal Shell ---
const ModalShell = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// --- Add/Edit Module Modal ---
const ModuleModal = ({ isOpen, onClose, onSave, module }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    departmentId: "",
  });

  React.useEffect(() => {
    setFormData(module || { id: "", name: "", departmentId: "" });
  }, [module, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleReset = () => {
    setFormData(module || { id: "", name: "", departmentId: "" });
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={module ? "Edit Module Details" : "Enter New Module Details"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Module ID
          </label>
          <input
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="CS101"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            disabled={!!module}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Module Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ADV JAVA etc......."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department ID
          </label>
          <input
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            placeholder="10,20,...."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-[#0d214f] text-white font-semibold rounded-lg"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

// --- Confirmation Modal for Deletion ---
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, moduleName }) => {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Delete Module">
      <div className="text-center">
        <p className="text-lg text-gray-700 mb-6">
          Are you sure you want to delete the module{" "}
          <span className="font-bold">"{moduleName}"</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-8 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            No
          </button>
        </div>
      </div>
    </ModalShell>
  );
};

export default ModulesPage;
