import React, { useState, useMemo } from "react";
import { PlusCircle, Edit, Trash2, X, Search, Users, Calendar, Mail, Phone, MapPin, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, User, GraduationCap } from "lucide-react";

// --- Mock Data ---
const initialStudents = [
  {
    prn: "240340120011",
    firstName: "Rohan",
    lastName: "Sharma",
    phone: "9876543210",
    dob: "2002-05-15",
    address: "123 Pine St, Mumbai",
    email: "rohan.sharma@example.com",
    departmentId: "DAC",
  },
  {
    prn: "240340120012",
    firstName: "Priya",
    lastName: "Patel",
    phone: "9876543211",
    dob: "2001-08-22",
    address: "456 Oak Ave, Pune",
    email: "priya.patel@example.com",
    departmentId: "DAC",
  },
  {
    prn: "240340120013",
    firstName: "Amit",
    lastName: "Singh",
    phone: "9876543212",
    dob: "2002-01-10",
    address: "789 Maple Dr, Delhi",
    email: "amit.singh@example.com",
    departmentId: "DBDA",
  },
  {
    prn: "240340120014",
    firstName: "Sneha",
    lastName: "Verma",
    phone: "9876543213",
    dob: "2001-11-30",
    address: "101 Birch Ln, Bangalore",
    email: "sneha.verma@example.com",
    departmentId: "DBDA",
  },
  {
    prn: "240340120015",
    firstName: "Vikram",
    lastName: "Reddy",
    phone: "9876543214",
    dob: "2002-03-25",
    address: "212 Cedar Rd, Hyderabad",
    email: "vikram.reddy@example.com",
    departmentId: "DAC",
  },
  {
    prn: "240340120016",
    firstName: "Anita",
    lastName: "Gupta",
    phone: "9876543215",
    dob: "2001-07-12",
    address: "567 Elm St, Chennai",
    email: "anita.gupta@example.com",
    departmentId: "DBDA",
  },
  {
    prn: "240340120017",
    firstName: "Rajesh",
    lastName: "Kumar",
    phone: "9876543216",
    dob: "2002-09-05",
    address: "890 Willow Ave, Kolkata",
    email: "rajesh.kumar@example.com",
    departmentId: "DAC",
  },
  {
    prn: "240340120018",
    firstName: "Kavya",
    lastName: "Nair",
    phone: "9876543217",
    dob: "2001-12-18",
    address: "345 Spruce Dr, Kochi",
    email: "kavya.nair@example.com",
    departmentId: "DBDA",
  },
  {
    prn: "240340120019",
    firstName: "Arjun",
    lastName: "Mehta",
    phone: "9876543218",
    dob: "2002-04-08",
    address: "678 Poplar Rd, Ahmedabad",
    email: "arjun.mehta@example.com",
    departmentId: "DAC",
  },
  {
    prn: "240340120020",
    firstName: "Riya",
    lastName: "Shah",
    phone: "9876543219",
    dob: "2001-10-25",
    address: "901 Ash St, Surat",
    email: "riya.shah@example.com",
    departmentId: "DBDA",
  },
];

const DEFAULT_ITEMS_PER_PAGE = 10;

// --- Enhanced Modal Component ---
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} transform transition-all duration-300 scale-100`}>
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
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};

// --- Enhanced Student Form ---
const StudentForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      firstName: "",
      lastName: "",
      phone: "",
      dob: "",
      address: "",
      email: "",
      departmentId: "",
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    
    // First Name Validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    else if (!nameRegex.test(formData.firstName)) newErrors.firstName = "Name can only contain letters and spaces";
    
    // Last Name Validation
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (!nameRegex.test(formData.lastName)) newErrors.lastName = "Name can only contain letters and spaces";

    // Phone Number Validation
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    
    // Email Validation
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    // Date of Birth Validation
    if (!formData.dob) {
        newErrors.dob = "Date of birth is required";
    } else {
        const today = new Date();
        const dobDate = new Date(formData.dob);
        today.setHours(0, 0, 0, 0); // Reset time to compare dates only
        if (dobDate > today) {
            newErrors.dob = "Date of birth cannot be in the future";
        }
    }

    // Address validation
    if (!formData.address.trim()) newErrors.address = "Address is required";
    
    // Department validation
    if (!formData.departmentId.trim()) newErrors.departmentId = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const prn = initialData ? initialData.prn : "Auto Generated";
  const password = initialData ? initialData.prn : "Default PRN";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User size={16} className="inline mr-1" />
            PRN
          </label>
          <input
            type="text"
            value={prn}
            disabled
            className="w-full px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm text-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="text"
            value={password}
            disabled
            className="w-full px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm text-gray-600"
          />
        </div>
      </div>

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
            placeholder="Enter first name"
            className={`w-full px-4 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
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
            placeholder="Enter last name"
            className={`w-full px-4 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone size={16} className="inline mr-1" />
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className={`w-full px-4 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Calendar size={16} className="inline mr-1" />
            Date of Birth *
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.dob ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          />
          {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Mail size={16} className="inline mr-1" />
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className={`w-full px-4 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <MapPin size={16} className="inline mr-1" />
          Address *
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter full address"
          rows="2"
          className={`w-full px-4 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
            errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Department *
        </label>
        <select
          name="departmentId"
          value={formData.departmentId}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.departmentId ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <option value="">Select Department</option>
          <option value="DAC">DAC - Diploma in Advanced Computing</option>
          <option value="DBDA">DBDA - PG Diploma in Big Data Analytics</option>
          <option value="DITISS">DITISS - PG Diploma in IT Infrastructure</option>
        </select>
        {errors.departmentId && <p className="text-red-500 text-xs mt-1">{errors.departmentId}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          Save Student
        </button>
      </div>
    </form>
  );
};

// --- Enhanced Delete Modal ---
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const [prn, setPrn] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!prn.trim()) {
      alert("Please enter a PRN to delete.");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      onConfirm(prn);
      setPrn("");
      setIsLoading(false);
    }, 500);
  };

  const handleClose = () => {
    setPrn("");
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Delete Student" size="sm">
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-gray-600 mb-4">
            This action cannot be undone. Please enter the student's PRN to confirm deletion.
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter PRN to confirm
          </label>
          <input
            type="text"
            value={prn}
            onChange={(e) => setPrn(e.target.value)}
            placeholder="e.g., 240340120011"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading || !prn.trim()}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Student
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// --- Enhanced Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
  
  const getPageNumbers = () => {
    if (totalPages <= 1) return [];

    // Create a unique set of page numbers to display
    const pages = new Set();
    pages.add(1); // Always show the first page

    // Logic for adding pages and ellipsis
    if (currentPage > 3) {
      pages.add('...');
    }
    if (currentPage > 2) {
      pages.add(currentPage - 1);
    }
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.add(currentPage);
    }
    if (currentPage < totalPages - 1) {
      pages.add(currentPage + 1);
    }
    if (currentPage < totalPages - 2) {
      pages.add('...');
    }
    
    pages.add(totalPages); // Always show the last page
    return Array.from(pages);
  };

  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Showing {startItem}-{endItem} of {totalItems} students
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || totalPages === 0}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          title="First page"
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          title="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex gap-1">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">...</span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          title="Next page"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          title="Last page"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};

// --- Main Student Page Component ---
const AdminStudents = () => {
  const [students, setStudents] = useState(initialStudents);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE); // State is now fixed
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Filter students based on search and department
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === "" || 
        student.firstName.toLowerCase().includes(lowerCaseSearch) ||
        student.lastName.toLowerCase().includes(lowerCaseSearch) ||
        student.prn.toLowerCase().includes(lowerCaseSearch) ||
        student.email.toLowerCase().includes(lowerCaseSearch);
      
      const matchesDepartment = selectedDepartment === "" || student.departmentId === selectedDepartment;
      
      return matchesSearch && matchesDepartment;
    });
  }, [students, searchTerm, selectedDepartment]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const handleAddStudent = (newStudentData) => {
    const newStudent = {
      ...newStudentData,
      prn: `24034012${String(students.length + 101).padStart(4, "0")}`,
    };
    setStudents((prev) => [newStudent, ...prev]);
    setAddModalOpen(false);
    setCurrentPage(1);
  };

  const handleEditStudent = (updatedStudentData) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.prn === editingStudent.prn ? { ...s, ...updatedStudentData } : s
      )
    );
    setEditModalOpen(false);
    setEditingStudent(null);
  };

  const handleDeleteByPrn = (prnToDelete) => {
    const studentExists = students.some(s => s.prn === prnToDelete);
    if (!studentExists) {
        alert("Student with the provided PRN not found.");
        return;
    }
    setStudents((prev) => prev.filter((s) => s.prn !== prnToDelete));
    setDeleteModalOpen(false);
    
    const newTotal = students.length - 1;
    const newTotalPages = Math.ceil(newTotal / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (newTotal === 0) {
      setCurrentPage(1);
    }
  };

  const handleDeleteFromRow = (prnToDelete) => {
    if (window.confirm(`Are you sure you want to delete student with PRN: ${prnToDelete}?`)) {
      handleDeleteByPrn(prnToDelete);
    }
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setEditModalOpen(true);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const departments = [...new Set(initialStudents.map(s => s.departmentId))];

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>

      {/* Header */}
      <header className="mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <GraduationCap size={36} />
                Student Management System
              </h1>
              <p className="text-blue-100 flex items-center gap-2">
                <Calendar size={16} />
                {today}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Controls Bar */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <select
                value={selectedDepartment}
                onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setCurrentPage(1);
                }}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                    onClick={() => setAddModalOpen(true)}
                    className="flex-grow justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 transition-all duration-200"
                >
                    <PlusCircle size={18} />
                    Add
                </button>
                <button
                    onClick={() => setDeleteModalOpen(true)}
                    className="flex-grow justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-sm hover:from-red-600 hover:to-red-700 flex items-center gap-2 transition-all duration-200"
                >
                    <Trash2 size={18} />
                    Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-gray-600">PRN</th>
                <th className="p-4 font-semibold text-gray-600">Name</th>
                <th className="p-4 font-semibold text-gray-600">Department</th>
                <th className="p-4 font-semibold text-gray-600">Contact Info</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <tr key={student.prn} className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="p-4 font-mono text-gray-700">{student.prn}</td>
                    <td className="p-4 font-medium text-gray-900">{`${student.firstName} ${student.lastName}`}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          student.departmentId === 'DAC' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                          {student.departmentId}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                        <div className="flex items-center gap-2 text-sm"><Mail size={14}/> {student.email}</div>
                        <div className="flex items-center gap-2 text-sm mt-1"><Phone size={14}/> {student.phone}</div>
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
                        <button
                          onClick={() => handleDeleteFromRow(student.prn)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition"
                          title="Delete Student"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                        <Search size={48} className="text-gray-300"/>
                        <p className="font-semibold">No students found</p>
                        <p className="text-sm">Try adjusting your search or filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredStudents.length > 0 && (
           <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={handlePageChange}
             itemsPerPage={itemsPerPage}
             totalItems={filteredStudents.length}
           />
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Add New Student" size="lg">
        <StudentForm onSave={handleAddStudent} onCancel={() => setAddModalOpen(false)} />
      </Modal>

      {editingStudent && (
        <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Student Details" size="lg">
          <StudentForm
            initialData={editingStudent}
            onSave={handleEditStudent}
            onCancel={() => {
              setEditModalOpen(false);
              setEditingStudent(null);
            }}
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

export default AdminStudents;
