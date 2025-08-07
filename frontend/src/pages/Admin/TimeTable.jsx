import React, { useState, useEffect } from "react";
import { Search, Calendar, ChevronLeft, ChevronRight, Plus, Trash2, X, Mail } from 'lucide-react';
import {
    getAllTimetableEntries,
    createTimetableEntry,
    deleteTimetableEntry,
    getAllModules,
    getAllInstructors,
    sendTimetableNotification
} from "../../services/timetableService";

// --- Helper to convert 12-hour AM/PM time to 24-hour format for the backend ---
const convertTo24HourFormat = (timeStr) => {
    if (!timeStr) return null;
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (period === 'AM' && hours === 12) {
        hours = 0;
    }
    return `${String(hours).padStart(2, '0')}:${minutes}:00`;
};

// --- Helper to generate time slots for dropdowns ---
const timeSlots = Array.from({ length: 28 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? "00" : "30";
    const period = hour >= 12 ? "PM" : "AM";
    let hour12 = hour > 12 ? hour - 12 : hour;
    if (hour === 0 || hour === 12) hour12 = 12;
    return `${String(hour12).padStart(2, "0")}:${minute} ${period}`;
});

// A simple, self-contained notification component
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


const Timetable = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [modules, setModules] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isNotifyModalOpen, setNotifyModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        moduleId: "",
        instructorId: "",
        startTime: "",
        endTime: "",
        roomNumber: "",
        isLab: false,
    });
    const [entryToDelete, setEntryToDelete] = useState(null);
    const [uiNotification, setUiNotification] = useState({ message: '', type: '' });
    const [notification, setNotification] = useState({
        subject: 'Regarding Timetable Update',
        message: 'Dear Student, please check the ERP system for a new/updated timetable.',
    });

    // Effect to auto-hide notification after 3 seconds
    useEffect(() => {
        if (uiNotification.message) {
            const timer = setTimeout(() => {
                setUiNotification({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [uiNotification]);


    // --- Data Fetching ---
    useEffect(() => {
        fetchTimetable();
        fetchDropdownData();
    }, []);

    const fetchTimetable = async () => {
        try {
            const data = await getAllTimetableEntries();
            setEvents(data);
        } catch (error) {
            setUiNotification({ message: "Failed to load timetable data.", type: 'error' });
        }
    };

    const fetchDropdownData = async () => {
        try {
            const modulesData = await getAllModules();
            const instructorsData = await getAllInstructors();
            setModules(modulesData);
            setInstructors(instructorsData);
        } catch (error) {
            setUiNotification({ message: "Failed to load modules or instructors.", type: 'error' });
        }
    };

    // --- Derived State ---
    const eventsForSelectedDate = events
        .filter((e) => e.lectureDate === selectedDate.toISOString().split("T")[0])
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

    // --- Handlers ---
    const handleAddEvent = async (e) => {
        e.preventDefault();
        const payload = {
            ...newEvent,
            lectureDate: selectedDate.toISOString().split("T")[0],
            dayOfWeek: selectedDate.toLocaleDateString('en-US', { weekday: 'long' }),
            startTime: convertTo24HourFormat(newEvent.startTime),
            endTime: convertTo24HourFormat(newEvent.endTime),
        };
        try {
            await createTimetableEntry(payload);
            setAddModalOpen(false);
            setNewEvent({ moduleId: "", instructorId: "", startTime: "", endTime: "", roomNumber: "", isLab: false });
            fetchTimetable(); 
            setUiNotification({ message: "Class scheduled successfully!", type: 'success' });
        } catch (error) {
            setUiNotification({ message: "Failed to schedule class.", type: 'error' });
        }
    };

    const handleDeleteEvent = async () => {
        if (!entryToDelete) return;
        try {
            await deleteTimetableEntry(entryToDelete.timetableEntryId);
            setDeleteModalOpen(false);
            setEntryToDelete(null);
            fetchTimetable();
            setUiNotification({ message: "Class deleted successfully!", type: 'success' });
        } catch (error) {
            setUiNotification({ message: "Failed to delete class. It may be linked to attendance records.", type: 'error' });
        }
    };

    const openDeleteModal = (event) => {
        setEntryToDelete(event);
        setDeleteModalOpen(true);
    };
    
    // --- Notification Handlers ---
    const handleNotificationChange = (e) => {
        const { name, value } = e.target;
        setNotification(prev => ({ ...prev, [name]: value }));
    };

    const handleSendNotification = async (e) => {
        e.preventDefault();
        try {
            await sendTimetableNotification(notification);
            setNotifyModalOpen(false);
            setUiNotification({ message: "Notification sent successfully!", type: 'success' });
        } catch (error) {
            setUiNotification({ message: "Failed to send notification.", type: 'error' });
        }
    };

    // --- Calendar Logic ---
    const changeMonth = (offset) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth });

    return (
        <>
            {/* Add/Edit Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Add Class Details">
                <form onSubmit={handleAddEvent} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Module</label>
                        <select name="moduleId" value={newEvent.moduleId} onChange={(e) => setNewEvent({...newEvent, moduleId: e.target.value})} className="w-full p-3 border rounded-lg">
                            <option value="">Select Module</option>
                            {modules.map(mod => <option key={mod.moduleId} value={mod.moduleId}>{mod.moduleName}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                        <select name="instructorId" value={newEvent.instructorId} onChange={(e) => setNewEvent({...newEvent, instructorId: e.target.value})} className="w-full p-3 border rounded-lg">
                            <option value="">Select Instructor</option>
                            {instructors.map(inst => <option key={inst.instructorId} value={inst.instructorId}>{`${inst.firstName} ${inst.lastName}`}</option>)}
                        </select>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                            <select name="startTime" value={newEvent.startTime} onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})} className="w-full p-3 border rounded-lg">
                                <option value="">Select</option>
                                {timeSlots.map(time => <option key={`start-${time}`} value={time}>{time}</option>)}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                            <select name="endTime" value={newEvent.endTime} onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})} className="w-full p-3 border rounded-lg">
                                <option value="">Select</option>
                                {timeSlots.map(time => <option key={`end-${time}`} value={time}>{time}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room / Lab</label>
                        <input name="roomNumber" value={newEvent.roomNumber} onChange={(e) => setNewEvent({...newEvent, roomNumber: e.target.value})} type="text" placeholder="e.g., Room 101" className="w-full p-3 border rounded-lg" />
                    </div>
                     <div className="flex items-center">
                        <input type="checkbox" id="isLab" name="isLab" checked={newEvent.isLab} onChange={(e) => setNewEvent({...newEvent, isLab: e.target.checked})} className="h-4 w-4 text-blue-600 border-gray-300 rounded"/>
                        <label htmlFor="isLab" className="ml-2 block text-sm text-gray-900">This is a Lab session</label>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={() => setAddModalOpen(false)} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Save</button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Deletion">
                <p>Are you sure you want to delete the class "{entryToDelete?.moduleName}" scheduled for {entryToDelete?.startTime}?</p>
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={() => setDeleteModalOpen(false)} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={handleDeleteEvent} className="px-6 py-2 bg-red-600 text-white rounded-lg">Delete</button>
                </div>
            </Modal>

            {/* Notification Modal */}
            <Modal isOpen={isNotifyModalOpen} onClose={() => setNotifyModalOpen(false)} title="Send Notification to Students">
                <form onSubmit={handleSendNotification} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input 
                            type="text" 
                            name="subject"
                            value={notification.subject}
                            onChange={handleNotificationChange}
                            className="w-full p-3 border rounded-lg" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea 
                            rows="4"
                            name="message"
                            value={notification.message}
                            onChange={handleNotificationChange}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                    <p className="text-sm text-gray-600">This notification will be sent to all students.</p>
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={() => setNotifyModalOpen(false)} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg">Confirm & Send</button>
                    </div>
                </form>
            </Modal>

            {/* Main Layout */}
            <div className="p-4 sm:p-8 bg-gray-50 min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        {/* Calendar JSX */}
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100">
                                <ChevronLeft />
                            </button>
                            <h2 className="text-xl font-bold">
                                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                            </h2>
                            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100">
                                <ChevronRight />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="font-semibold">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2 mt-2">
                            {emptyDays.map((_, i) => (
                                <div key={`empty-${i}`}></div>
                            ))}
                            {monthDays.map(day => {
                                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                const isSelected = selectedDate.toDateString() === date.toDateString();
                                const isToday = new Date().toDateString() === date.toDateString();
                                const hasEvents = events.some(e => e.lectureDate === date.toISOString().split('T')[0]);

                                return (
                                    <div key={day}
                                        onClick={() => setSelectedDate(date)}
                                        className={`p-2 rounded-full text-center cursor-pointer relative
                                        ${isSelected ? "bg-blue-600 text-white" : ""}
                                        ${!isSelected && isToday ? "bg-blue-100 text-blue-700" : ""}
                                        ${!isSelected && !isToday ? "hover:bg-gray-100" : ""}`}
                                    >
                                        {day}
                                        {hasEvents && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* Right Column */}
                <div className="lg:col-span-2">
                    <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Timetable</h1>
                            <p className="text-gray-500">{selectedDate.toLocaleDateString("en-US", { weekday: 'long', month: "long", day: "numeric" })}</p>
                        </div>
                        <div className="flex gap-2">
                             <button onClick={() => setAddModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                <Plus size={18} /> Add Class
                            </button>
                            <button onClick={() => setNotifyModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                <Mail size={18} /> Notify
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b-2 border-slate-200 text-slate-600">
                                    <tr>
                                        <th className="p-4 font-semibold">Time</th>
                                        <th className="p-4 font-semibold">Module</th>
                                        <th className="p-4 font-semibold">Instructor</th>
                                        <th className="p-4 font-semibold">Room</th>
                                        <th className="p-4 font-semibold text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventsForSelectedDate.length > 0 ? (
                                        eventsForSelectedDate.map((item) => (
                                            <tr key={item.timetableEntryId} className="border-b border-slate-100 hover:bg-slate-50">
                                                <td className="p-4 text-slate-600">{`${item.startTime.substring(0,5)} - ${item.endTime.substring(0,5)}`}</td>
                                                <td className="p-4 font-medium text-slate-800">{item.moduleName}</td>
                                                <td className="p-4 text-slate-600">{item.instructorName}</td>
                                                <td className="p-4 text-slate-600">{item.roomNumber}</td>
                                                <td className="p-4 text-center">
                                                    <button onClick={() => openDeleteModal(item)} className="text-red-500 hover:text-red-700">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5" className="text-center p-8 text-slate-500">No classes scheduled for this date.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Notification 
                message={uiNotification.message} 
                type={uiNotification.type} 
                onclose={() => setUiNotification({ message: '', type: '' })} 
            />
        </>
    );
};

// --- Reusable Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Timetable;
