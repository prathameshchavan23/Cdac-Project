import React, { useState, useEffect } from 'react';

// Mock data to start with, similar to your example
const initialStudents = [
    { id: 1, prn: '290240120133', name: 'Saad Shaikh', lab: 34, internal: 19, total: 53, remark: 'P', isEditing: false },
    { id: 2, prn: '290240120134', name: 'Jane Doe', lab: 38, internal: 18, total: 56, remark: 'P', isEditing: false },
    { id: 3, prn: '290240120135', name: 'John Smith', lab: 30, internal: 15, total: 45, remark: 'P', isEditing: false },
    { id: 4, prn: '290240120136', name: 'Emily Jones', lab: 40, internal: 20, total: 60, remark: 'P', isEditing: false },
    { id: 5, prn: '290240120137', name: 'Michael Johnson', lab: 25, internal: 12, total: 37, remark: 'F', isEditing: false },
];

const RECORDS_PER_PAGE = 10;

const Marks = () => {
    const [students, setStudents] = useState(initialStudents);
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditingAny, setIsEditingAny] = useState(false);
    
    // State for the delete confirmation modal
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const totalPages = Math.ceil(students.length / RECORDS_PER_PAGE);
    const paginatedStudents = students.slice((currentPage - 1) * RECORDS_PER_PAGE, currentPage * RECORDS_PER_PAGE);

    // Function to handle changes in the input fields for a student
    const handleMarkChange = (id, field, value) => {
        const newStudents = students.map(student => {
            if (student.id === id) {
                const newStudent = { ...student, [field]: value };
                const lab = field === 'lab' ? parseInt(value) || 0 : parseInt(newStudent.lab) || 0;
                const internal = field === 'internal' ? parseInt(value) || 0 : parseInt(newStudent.internal) || 0;
                const total = lab + internal;
                const remark = total >= 40 ? 'P' : 'F';
                return { ...newStudent, total, remark };
            }
            return student;
        });
        setStudents(newStudents);
    };

    // Toggle the editing state for a specific student
    const toggleEdit = (id) => {
        const newStudents = students.map(student => 
            student.id === id ? { ...student, isEditing: !student.isEditing } : student
        );
        setStudents(newStudents);
    };
    
    // Check if any row is in editing mode
    useEffect(() => {
        setIsEditingAny(students.some(s => s.isEditing));
    }, [students]);

    // Add a new empty student record
    const addNewMarks = () => {
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        const newStudent = {
            id: newId, prn: '', name: '', lab: 0, internal: 0, total: 0, remark: 'F', isEditing: true
        };
        setStudents([...students, newStudent]);
        // Switch to the page with the new record if not already there
        const newTotalPages = Math.ceil((students.length + 1) / RECORDS_PER_PAGE);
        if(currentPage < newTotalPages) {
            setCurrentPage(newTotalPages);
        }
    };

    // --- Delete Functionality ---
    const openDeleteModal = (student) => {
        setStudentToDelete(student);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setStudentToDelete(null);
        setDeleteModalOpen(false);
    };

    const handleDelete = () => {
        if (!studentToDelete) return;
        
        const newStudents = students.filter(s => s.id !== studentToDelete.id);
        setStudents(newStudents);

        // Adjust current page if the last item on a page is deleted
        const newTotalPages = Math.ceil(newStudents.length / RECORDS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        } else if (newStudents.length === 0) {
            setCurrentPage(1);
        }

        closeDeleteModal();
    };

    return (
        <>
            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Deletion</h2>
                        <p className="text-gray-600">
                            Are you sure you want to delete the marks for <span className="font-semibold">{studentToDelete?.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button onClick={closeDeleteModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2">
                                <span className="material-icons text-sm">delete</span> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-4 sm:p-8 bg-gray-50 min-h-full font-sans">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Registration - Student Marks</h1>
                    <div className="flex space-x-2">
                        <button onClick={addNewMarks} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <span className="material-icons">add</span> Add New Marks
                        </button>
                        <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
                            <span className="material-icons">history</span> Check past records
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="mb-4">
                        <p><span className="font-semibold">Module:</span> DSA</p>
                        <p><span className="font-semibold">Exam Date:</span> 19/07/2025</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="p-3">Sr. No</th>
                                    <th className="p-3">PRN</th>
                                    <th className="p-3">Student Name</th>
                                    <th className="p-3">Lab Exam Marks</th>
                                    <th className="p-3">Internal Marks</th>
                                    <th className="p-3">Total Marks</th>
                                    <th className="p-3">Remark</th>
                                    <th className="p-3 text-center min-w-[160px]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedStudents.map((student, index) => (
                                    <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3">{(currentPage - 1) * RECORDS_PER_PAGE + index + 1}</td>
                                        <td className="p-3">
                                            {student.isEditing ? <input type="text" defaultValue={student.prn} className="w-full p-1 border rounded-md"/> : student.prn}
                                        </td>
                                        <td className="p-3 font-medium">
                                            {student.isEditing ? <input type="text" defaultValue={student.name} className="w-full p-1 border rounded-md"/> : student.name}
                                        </td>
                                        <td className="p-3">
                                            {student.isEditing ? <input type="number" value={student.lab} onChange={(e) => handleMarkChange(student.id, 'lab', e.target.value)} className="w-20 p-1 border rounded-md"/> : student.lab}
                                        </td>
                                        <td className="p-3">
                                            {student.isEditing ? <input type="number" value={student.internal} onChange={(e) => handleMarkChange(student.id, 'internal', e.target.value)} className="w-20 p-1 border rounded-md"/> : student.internal}
                                        </td>
                                        <td className="p-3 font-semibold">{student.total}</td>
                                        <td className={`p-3 font-bold ${student.remark === 'P' ? 'text-green-600' : 'text-red-600'}`}>{student.remark}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => toggleEdit(student.id)} className={`px-3 py-1 text-sm rounded-md text-white ${student.isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-500 hover:bg-yellow-600'}`}>
                                                    {student.isEditing ? 'Save' : 'Edit'}
                                                </button>
                                                <button onClick={() => openDeleteModal(student)} className="px-3 py-1 text-sm rounded-md text-white bg-red-600 hover:bg-red-700">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-6 space-x-2">
                            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50">previous</button>
                            {[...Array(totalPages).keys()].map(page => (
                                <button key={page + 1} onClick={() => setCurrentPage(page + 1)} className={`px-3 py-1 border rounded-md ${currentPage === page + 1 ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}>
                                    {page + 1}
                                </button>
                            ))}
                            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50">next</button>
                        </div>
                    )}

                     {/* Save/Update All Button */}
                     {isEditingAny && (
                         <div className="flex justify-end mt-6">
                             <button className="bg-green-600 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-all">
                                 Update All
                             </button>
                         </div>
                     )}
                </div>
            </div>
        </>
    );
};

export default Marks;
