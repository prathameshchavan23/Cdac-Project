import React, { useState, useMemo, useEffect } from "react";
import { Plus, Edit, FileText, X } from "lucide-react";
import {
    getAllModules,
    getMarksSheetForExam,
    saveBulkScores,
    updateScore,
    createExam,
    getExamsByModule,
    getScoreForStudent,
    getScoresForExam,
} from "../../services/marksService";

const RECORDS_PER_PAGE = 10;

// ===================================================================================
// --- Main Component: Manages Views & State ---
// ===================================================================================
const Marks = () => {
    const [view, setView] = useState("dashboard");
    const [marksSheet, setMarksSheet] = useState([]);
    const [selectedExamInfo, setSelectedExamInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleNavigate = async (targetView, data = null) => {
        setError(null);
        if (targetView === "add" && data) {
            try {
                setLoading(true);
                const response = await getMarksSheetForExam(data.examId);
                setMarksSheet(response.content || []);
                setSelectedExamInfo(data);
                setView("add");
            } catch (err) {
                setError("Failed to fetch marks sheet.");
            } finally {
                setLoading(false);
            }
        } else {
            setView(targetView);
        }
    };

    const handleSaveMarks = async (examId, newMarks) => {
        try {
            setLoading(true);
            await saveBulkScores(examId, newMarks);
            alert("Marks saved successfully!");
            setView("dashboard");
        } catch (err) {
            setError("Failed to save marks.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateMarks = async (updatedMark) => {
        try {
            await updateScore(updatedMark.scoreId, {
                labExamMarks: updatedMark.labExamMarks,
                internalMarks: updatedMark.internalMarks,
            });
            alert("Marks updated successfully!");
        } catch (err) {
            setError("Failed to update mark.");
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    switch (view) {
        case "add":
            return <AddMarksView marksSheet={marksSheet} examInfo={selectedExamInfo} onSave={handleSaveMarks} onBack={() => setView("dashboard")} />;
        case "display":
            return <DisplayRecordsView onBack={() => setView("dashboard")} />;
        default:
            return <DashboardView onNavigate={handleNavigate} onUpdate={handleUpdateMarks} />;
    }
};


// ===================================================================================
// --- View 1: Dashboard ---
// ===================================================================================
const DashboardView = ({ onNavigate, onUpdate }) => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const handleProceedToAdd = (data) => {
        setAddModalOpen(false);
        onNavigate("add", data);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans flex flex-col items-center justify-center">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold text-gray-800">Marks Management</h1>
            </header>
            <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ActionButton
                        icon={<Plus />}
                        label="Add New Marks"
                        onClick={() => setAddModalOpen(true)}
                    />
                    <ActionButton
                        icon={<Edit />}
                        label="Edit Marks"
                        onClick={() => setEditModalOpen(true)}
                    />
                    <ActionButton
                        icon={<FileText />}
                        label="Check Past Records"
                        onClick={() => onNavigate("display")}
                    />
                </div>
            </div>
            <SelectExamModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onProceed={handleProceedToAdd}
            />
            <EditMarksModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onUpdate={onUpdate}
            />
        </div>
    );
};


// ===================================================================================
// --- View 2: Add Marks (with Validation) ---
// ===================================================================================
const AddMarksView = ({ marksSheet, examInfo, onSave, onBack }) => {
    const [marks, setMarks] = useState(() => {
        const initialState = {};
        marksSheet.forEach((item) => {
            initialState[item.studentPrn] = {
                labExamMarks: item.labExamMarks ?? "",
                internalMarks: item.internalMarks ?? "",
            };
        });
        return initialState;
    });
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedStudents = useMemo(() => {
        const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
        return marksSheet.slice(startIndex, startIndex + RECORDS_PER_PAGE);
    }, [marksSheet, currentPage]);
    const totalPages = Math.ceil(marksSheet.length / RECORDS_PER_PAGE);

    const handleMarkChange = (prn, field, value) => {
        setMarks((prev) => ({
            ...prev,
            [prn]: { ...prev[prn], [field]: value }
        }));
    };

    const handleSave = () => {
        const validationErrors = [];
        
        // Validate ALL students in the marksheet, not just the paginated ones.
        marksSheet.forEach(student => {
            const studentMarks = marks[student.studentPrn];
            const lab = studentMarks?.labExamMarks;
            const internal = studentMarks?.internalMarks;

            if (lab === "" || lab === null || internal === "" || internal === null) {
                validationErrors.push(`${student.studentName} (PRN: ${student.studentPrn}) - All fields required.`);
            } else {
                const labNum = parseFloat(lab);
                const internalNum = parseFloat(internal);
                if (isNaN(labNum) || labNum < 0 || labNum > 40) {
                    validationErrors.push(`${student.studentName} (Invalid Lab Marks)`);
                }
                if (isNaN(internalNum) || internalNum < 0 || internalNum > 20) {
                    validationErrors.push(`${student.studentName} (Invalid Internal Marks)`);
                }
            }
        });

        if (validationErrors.length > 0) {
            alert(`Validation failed. Please ensure all marks are filled correctly for all students.\n\nIssues found for:\n- ${validationErrors.join('\n- ')}`);
            return;
        }

        // If validation passes, map over the entire marks state object to save all data.
        const marksToSave = Object.entries(marks).map(([prn, studentMarks]) => ({
            studentPrn: prn,
            labExamMarks: parseInt(studentMarks.labExamMarks, 10),
            internalMarks: parseInt(studentMarks.internalMarks, 10),
        }));
        
        onSave(examInfo.examId, marksToSave);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800">Add Marks</h1>
                <button onClick={onBack} className="px-5 py-2 bg-[#0d214f] text-white font-semibold rounded-lg">Back to Dashboard</button>
            </header>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-4">
                    <p><span className="font-semibold">Exam:</span> {examInfo.examName}</p>
                    <p><span className="font-semibold">Module:</span> {examInfo.moduleName}</p>
                </div>
                <AddMarksTable students={paginatedStudents} marks={marks} onMarkChange={handleMarkChange} />
                <div className="flex justify-between items-center mt-6">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    <button onClick={handleSave} className="px-8 py-2 bg-green-600 text-white font-semibold rounded-lg">Save All Marks</button>
                </div>
            </div>
        </div>
    );
};

// ===================================================================================
// --- View 3: Display Past Records ---
// ===================================================================================
const DisplayRecordsView = ({ onBack }) => {
    const [modules, setModules] = useState([]);
    const [exams, setExams] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState("");
    const [selectedExamId, setSelectedExamId] = useState("");
    const [records, setRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchModules = async () => {
            const moduleData = await getAllModules();
            setModules(moduleData);
        };
        fetchModules();
    }, []);

    useEffect(() => {
        if (selectedModuleId) {
            const fetchExams = async () => {
                const examData = await getExamsByModule(selectedModuleId);
                setExams(examData);
                setSelectedExamId("");
                setRecords([]);
            };
            fetchExams();
        }
    }, [selectedModuleId]);

    const handleShowRecords = async () => {
        if (!selectedExamId) {
            alert("Please select an exam.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await getScoresForExam(selectedExamId, 0, RECORDS_PER_PAGE);
            setRecords(response.content || []);
            setTotalPages(response.totalPages || 1);
            setCurrentPage(1);
        } catch (error) {
            alert("Failed to fetch records.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handlePageChange = async (page) => {
        setIsLoading(true);
        try {
            const response = await getScoresForExam(selectedExamId, page - 1, RECORDS_PER_PAGE);
            setRecords(response.content || []);
            setCurrentPage(page);
        } catch (error) {
            alert("Failed to load page.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800">Check Past Records</h1>
                <button onClick={onBack} className="px-5 py-2 bg-[#0d214f] text-white font-semibold rounded-lg shadow-md hover:bg-[#0a1a3e] transition">Back to Dashboard</button>
            </header>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-end gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-2">1. Select Module</label>
                        <select value={selectedModuleId} onChange={(e) => setSelectedModuleId(e.target.value)} className="w-full p-2 border rounded-lg">
                            <option value="">-- Choose Module --</option>
                            {modules.map((mod) => (
                                <option key={mod.moduleId} value={mod.moduleId}>{mod.moduleName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-2">2. Select Exam</label>
                        <select value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)} disabled={!selectedModuleId} className="w-full p-2 border rounded-lg disabled:bg-gray-100">
                            <option value="">-- Choose Exam --</option>
                            {exams.map((exam) => (
                                <option key={exam.examId} value={exam.examId}>{exam.examName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button onClick={handleShowRecords} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Show Records"}
                        </button>
                    </div>
                </div>
                {isLoading ? (
                    <div className="text-center p-4">Loading...</div>
                ) : records.length > 0 ? (
                    <>
                        <DisplayMarksTable records={records} />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </>
                ) : (
                    <div className="text-center p-4">{selectedExamId ? "No records found." : "Select an exam to show records."}</div>
                )}
            </div>
        </div>
    );
};


// ===================================================================================
// --- Reusable Components ---
// ===================================================================================
const ActionButton = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="p-6 bg-slate-100 border border-slate-300 rounded-xl text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
    >
        <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center text-blue-600 mb-3 shadow-inner">
            {icon}
        </div>
        <p className="font-semibold text-slate-700">{label}</p>
    </button>
);

const AddMarksTable = ({ students, marks, onMarkChange }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead className="bg-[#0d214f] text-white">
                <tr>
                    <th className="p-3">Sr. No</th>
                    <th className="p-3">PRN</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Lab Marks (40)</th>
                    <th className="p-3">Internal Marks (20)</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => {
                    const studentMarks = marks[student.studentPrn] || {};
                    return (
                        <tr key={student.studentPrn} className="border-b hover:bg-gray-50">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2 text-gray-700">{student.studentPrn}</td>
                            <td className="p-2 text-gray-700">{student.studentName}</td>
                            <td className="p-2">
                                <input
                                    type="number"
                                    max="40"
                                    min="0"
                                    value={studentMarks.labExamMarks}
                                    onChange={(e) => onMarkChange(student.studentPrn, 'labExamMarks', e.target.value)}
                                    className="w-24 p-1 border rounded"
                                />
                            </td>
                            <td className="p-2">
                                <input
                                    type="number"
                                    max="20"
                                    min="0"
                                    value={studentMarks.internalMarks}
                                    onChange={(e) => onMarkChange(student.studentPrn, 'internalMarks', e.target.value)}
                                    className="w-24 p-1 border rounded"
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);

const DisplayMarksTable = ({ records }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead className="bg-[#0d214f] text-white">
                <tr>
                    <th className="p-3">PRN</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Module Name</th>
                    <th className="p-3">Exam Name</th>
                    <th className="p-3">Lab Marks</th>
                    <th className="p-3">Internal Marks</th>
                </tr>
            </thead>
            <tbody>
                {records.map((rec) => (
                    <tr key={rec.scoreId} className="border-b hover:bg-gray-50">
                        <td className="p-3">{rec.studentPrn}</td>
                        <td className="p-3">{rec.studentName}</td>
                        <td className="p-3">{rec.moduleName}</td>
                        <td className="p-3">{rec.examName}</td>
                        <td className="p-3 font-semibold">{rec.labExamMarks}</td>
                        <td className="p-3 font-semibold">{rec.internalMarks}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                previous
            </button>
            <span className="font-semibold">
                {currentPage} / {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                next
            </button>
        </div>
    );
};

const SelectExamModal = ({ isOpen, onClose, onProceed }) => {
    const [modules, setModules] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState("");
    const [examDate, setExamDate] = useState("");
    const [examName, setExamName] = useState("");

    useEffect(() => {
        if (isOpen) {
            const fetchModules = async () => {
                try {
                    const moduleData = await getAllModules();
                    setModules(moduleData);
                } catch (error) {
                    console.error("Failed to fetch modules");
                }
            };
            fetchModules();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleProceed = async () => {
        if (!selectedModuleId || !examDate || !examName) {
            alert("Please select a module, enter an exam name, and pick a date.");
            return;
        }
        try {
            const newExam = await createExam({
                moduleId: selectedModuleId,
                examName: examName,
                examDate: examDate,
            });
            onProceed(newExam);
        } catch (error) {
            alert("Failed to create the exam.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-bold">Create New Exam</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block font-semibold mb-2">Exam Name</label>
                        <input
                            type="text"
                            value={examName}
                            onChange={(e) => setExamName(e.target.value)}
                            placeholder="e.g., Mid-Term Exam"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Module</label>
                        <select
                            value={selectedModuleId}
                            onChange={(e) => setSelectedModuleId(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="" disabled>
                                -- Choose a Module --
                            </option>
                            {modules.map((mod) => (
                                <option key={mod.moduleId} value={mod.moduleId}>
                                    {mod.moduleName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Exam Date</label>
                        <input
                            type="date"
                            value={examDate}
                            onChange={(e) => setExamDate(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleProceed}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                        >
                            Create & Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EditMarksModal = ({ isOpen, onClose, onUpdate }) => {
    const [modules, setModules] = useState([]);
    const [exams, setExams] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState("");
    const [selectedExamId, setSelectedExamId] = useState("");
    const [studentPrn, setStudentPrn] = useState("");
    const [scoreDetails, setScoreDetails] = useState(null);
    const [marks, setMarks] = useState({ lab: "", internal: "" });

    useEffect(() => {
        if (isOpen) {
            const fetchModules = async () => {
                const moduleData = await getAllModules();
                setModules(moduleData);
            };
            fetchModules();
        } else {
            setScoreDetails(null);
            setStudentPrn("");
            setSelectedExamId("");
            setSelectedModuleId("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (selectedModuleId) {
            const fetchExams = async () => {
                const examData = await getExamsByModule(selectedModuleId);
                setExams(examData);
                setSelectedExamId("");
            };
            fetchExams();
        }
    }, [selectedModuleId]);

    const handleShowRecord = async () => {
        if (!selectedExamId || !studentPrn) {
            alert("Please select an exam and enter a PRN.");
            return;
        }
        const score = await getScoreForStudent(
            parseInt(selectedExamId),
            studentPrn
        );
        if (score) {
            setScoreDetails(score);
            setMarks({
                lab: score.labExamMarks || "",
                internal: score.internalMarks || "",
            });
        } else {
            alert("No record found for this student in the selected exam.");
        }
    };

    const handleUpdate = () => {
        const lab = parseFloat(marks.lab);
        const internal = parseFloat(marks.internal);

        if (isNaN(lab) || lab < 0 || lab > 40) {
            alert("Invalid Lab Marks. Must be between 0 and 40.");
            return;
        }
        if (isNaN(internal) || internal < 0 || internal > 20) {
            alert("Invalid Internal Marks. Must be between 0 and 20.");
            return;
        }
        onUpdate({ ...scoreDetails, labExamMarks: lab, internalMarks: internal });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-bold">Edit Student Marks</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    {!scoreDetails ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold mb-2">
                                    1. Select Module
                                </label>
                                <select
                                    value={selectedModuleId}
                                    onChange={(e) => setSelectedModuleId(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="">-- Choose Module --</option>
                                    {modules.map((mod) => (
                                        <option key={mod.moduleId} value={mod.moduleId}>
                                            {mod.moduleName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">
                                    2. Select Exam
                                </label>
                                <select
                                    value={selectedExamId}
                                    onChange={(e) => setSelectedExamId(e.target.value)}
                                    disabled={!selectedModuleId}
                                    className="w-full p-2 border rounded-lg disabled:bg-gray-100"
                                >
                                    <option value="">-- Choose Exam --</option>
                                    {exams.map((exam) => (
                                        <option key={exam.examId} value={exam.examId}>
                                            {exam.examName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">
                                    3. Enter Student PRN
                                </label>
                                <input
                                    type="text"
                                    value={studentPrn}
                                    onChange={(e) => setStudentPrn(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={handleShowRecord}
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                                >
                                    Show Record
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <p>
                                    <span className="font-semibold">PRN:</span>{" "}
                                    {scoreDetails.studentPrn}
                                </p>
                                <p>
                                    <span className="font-semibold">Student:</span>{" "}
                                    {scoreDetails.studentName}
                                </p>
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">
                                    Lab Marks (out of 40)
                                </label>
                                <input
                                    type="number"
                                    value={marks.lab}
                                    onChange={(e) => setMarks({ ...marks, lab: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">
                                    Internal Marks (out of 20)
                                </label>
                                <input
                                    type="number"
                                    value={marks.internal}
                                    onChange={(e) =>
                                        setMarks({ ...marks, internal: e.target.value })
                                    }
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={handleUpdate}
                                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
                                >
                                    Update Marks
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Marks;
