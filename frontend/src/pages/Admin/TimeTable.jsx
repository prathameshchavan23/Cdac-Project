import React, { useState } from "react";
import { Search, Calendar, ChevronLeft, ChevronRight, Plus, Trash2, X } from 'lucide-react';

// --- Mock Data ---
// In a real application, this would come from an API.
const initialEvents = [
  {
    id: "M101",
    moduleId: "MATH101",
    date: "2025-07-23",
    moduleName: "Math 101 Exam",
    instructor: "Dr. Eleanor Vance",
    startTime: "09:00 AM",
    endTime: "09:50 AM",
    room: "Room 201",
  },
  {
    id: "H202",
    moduleId: "HIST202",
    date: "2025-07-24",
    moduleName: "History 202 Lecture",
    instructor: "Prof. Samuel Bennett",
    startTime: "10:00 AM",
    endTime: "10:50 AM",
    room: "Room 305",
  },
  {
    id: "P102",
    moduleId: "PHYS102",
    date: "2025-07-25",
    moduleName: "Physics Lab",
    instructor: "Dr. Olivia Carter",
    startTime: "11:00 AM",
    endTime: "11:50 AM",
    room: "Lab 102",
  },
  {
    id: "CS301",
    moduleId: "CS301",
    date: "2025-07-23",
    moduleName: "Computer Science",
    instructor: "Dr. Alan Grant",
    startTime: "01:00 PM",
    endTime: "01:50 PM",
    room: "Room 404",
  },
];

// --- Helper to generate time slots for dropdowns ---
const timeSlots = Array.from({ length: 28 }, (_, i) => { // 8 AM to 9:30 PM
  const hour = Math.floor(i / 2) + 8;
  const minute = i % 2 === 0 ? "00" : "30";
  const period = hour >= 12 ? "PM" : "AM";
  let hour12 = hour > 12 ? hour - 12 : hour;
  if (hour === 0) hour12 = 12;
  return `${String(hour12).padStart(2, "0")}:${minute} ${period}`;
});

// --- Helper to convert time string to minutes for comparison ---
const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (period === 'AM' && hours === 12) {
        hours = 0;
    }
    return hours * 60 + minutes;
};


const Timetable = () => {
  // --- State Management ---
  const [currentDate, setCurrentDate] = useState(new Date("2025-07-23"));
  const [selectedDate, setSelectedDate] = useState(new Date("2025-07-23"));
  const [events, setEvents] = useState(initialEvents);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    moduleId: "",
    moduleName: "",
    instructor: "",
    startTime: "",
    endTime: "",
    room: "",
  });
  const [errors, setErrors] = useState({});
  const [moduleIdToDelete, setModuleIdToDelete] = useState("");
  const [deleteError, setDeleteError] = useState("");

  // --- Derived State & Date Logic ---
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the start of the day
  const isSelectedDateInPast = selectedDate < today;

  const eventsForSelectedDate = events
    .filter((e) => e.date === selectedDate.toISOString().split("T")[0])
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  // --- Form Validation ---
  const validateForm = () => {
      const newErrors = {};

      if (!newEvent.moduleId.trim()) newErrors.moduleId = "Module ID is required.";
      else if (!/^[A-Z0-9]+$/.test(newEvent.moduleId)) newErrors.moduleId = "Module ID must be uppercase letters and numbers only.";
      
      if (!newEvent.moduleName.trim()) newErrors.moduleName = "Module name is required.";
      
      if (!newEvent.instructor.trim()) newErrors.instructor = "Instructor name is required.";
      else if (!/^[a-zA-Z.\s]+$/.test(newEvent.instructor)) newErrors.instructor = "Please enter a valid name.";

      if (!newEvent.startTime) newErrors.startTime = "Start time is required.";
      if (!newEvent.endTime) newErrors.endTime = "End time is required.";
      
      if (newEvent.startTime && newEvent.endTime && timeToMinutes(newEvent.endTime) <= timeToMinutes(newEvent.startTime)) {
          newErrors.endTime = "End time must be after start time.";
      }

      if (!newEvent.room.trim()) newErrors.room = "Room is required.";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewEvent(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
          setErrors(prev => ({ ...prev, [name]: null }));
      }
  };


  // --- Handlers ---
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isSelectedDateInPast) {
      alert("Cannot add events to past dates.");
      return;
    }
    const newId = "EVT_" + Date.now();
    setEvents([
      ...events,
      {
        id: newId,
        date: selectedDate.toISOString().split("T")[0],
        ...newEvent,
      },
    ]);
    setNewEvent({
      moduleId: "",
      moduleName: "",
      instructor: "",
      startTime: "",
      endTime: "",
      room: "",
    });
    setErrors({});
    setAddModalOpen(false);
  };

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    const eventExists = events.some(
      (event) => event.moduleId === moduleIdToDelete
    );
    if (eventExists) {
      setEvents(events.filter((event) => event.moduleId !== moduleIdToDelete));
      setModuleIdToDelete("");
      setDeleteError("");
      setDeleteModalOpen(false);
    } else {
      setDeleteError("Module ID not found. Please try again.");
    }
  };

  // --- Calendar Logic ---
  const changeMonth = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

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
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth });

  // --- JSX ---
  return (
    <>
      {/* --- Modals --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Add Class Details
            </h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label htmlFor="moduleId" className="block text-sm font-medium text-gray-700 mb-1">Module ID</label>
                <input id="moduleId" name="moduleId" type="text" placeholder="e.g., CS101" value={newEvent.moduleId}
                  onChange={(e) => handleInputChange({ target: { name: 'moduleId', value: e.target.value.toUpperCase() } })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.moduleId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.moduleId && <p className="text-red-500 text-xs mt-1">{errors.moduleId}</p>}
              </div>
              <div>
                <label htmlFor="moduleName" className="block text-sm font-medium text-gray-700 mb-1">Module Name</label>
                <input id="moduleName" name="moduleName" type="text" placeholder="e.g., Advanced Algorithms" value={newEvent.moduleName} onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.moduleName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.moduleName && <p className="text-red-500 text-xs mt-1">{errors.moduleName}</p>}
              </div>
              <div>
                <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                <input id="instructor" name="instructor" type="text" placeholder="e.g., Dr. Alan Grant" value={newEvent.instructor} onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.instructor ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.instructor && <p className="text-red-500 text-xs mt-1">{errors.instructor}</p>}
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <select id="startTime" name="startTime" value={newEvent.startTime} onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 ${errors.startTime ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  >
                    <option value="" disabled>Select time</option>
                    {timeSlots.map((time) => (<option key={`start-${time}`} value={time}>{time}</option>))}
                  </select>
                   {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
                </div>
                <div className="w-1/2">
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <select id="endTime" name="endTime" value={newEvent.endTime} onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 ${errors.endTime ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  >
                    <option value="" disabled>Select time</option>
                    {timeSlots.map((time) => (<option key={`end-${time}`} value={time}>{time}</option>))}
                  </select>
                   {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <input id="room" name="room" type="text" placeholder="e.g., Room 101 or Lab A" value={newEvent.room} onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.room ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {errors.room && <p className="text-red-500 text-xs mt-1">{errors.room}</p>}
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => setAddModalOpen(false)} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm relative">
            <button
              onClick={() => {
                setDeleteModalOpen(false);
                setDeleteError("");
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Delete Class
            </h2>
            <form onSubmit={handleDeleteEvent} className="space-y-4">
              <div>
                <label htmlFor="deleteModuleId" className="block text-sm font-medium text-gray-700 mb-1">Enter Module ID</label>
                <input id="deleteModuleId" type="text" placeholder="e.g., MATH101" value={moduleIdToDelete}
                  onChange={(e) => setModuleIdToDelete(e.target.value.toUpperCase())}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required autoFocus
                />
              </div>
              {deleteError && (
                <p className="text-sm text-red-500 text-center">{deleteError}</p>
              )}
              <button type="submit" className="w-full mt-4 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center gap-2 focus:outline-none">
                <Trash2 size={18} /> Delete Class
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- Main Layout --- */}
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Calendar & Upcoming Events */}
        <div className="lg:col-span-1 space-y-8">
          {/* Calendar */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
                <ChevronLeft size={20} />
              </button>
              <h3 className="text-lg font-semibold">
                {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
              </h3>
              <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="grid grid-cols-7 text-center text-sm text-gray-500">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div key={`${day}-${index}`} className="font-medium p-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center mt-2">
              {emptyDays.map((_, i) => (<div key={`empty-${i}`}></div>))}
              {monthDays.map((day) => {
                const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear();
                const isToday = today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
                return (
                  <div key={day} onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                    className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full cursor-pointer transition-colors ${isSelected ? "bg-blue-600 text-white font-bold" : isToday ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                        <Calendar size={20} className="text-gray-600"/>
                    </div>
                    <div>
                      <p className="font-semibold">{event.moduleName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No upcoming events.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Timetable */}
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Timetable</h1>
              <p className="text-gray-500">
                {selectedDate.toLocaleDateString("en-US", { weekday: 'long', month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
            <div className="flex space-x-2 mt-4 sm:mt-0">
              <button onClick={() => setAddModalOpen(true)} disabled={isSelectedDateInPast}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none"
                title={isSelectedDateInPast ? "Cannot add events to past dates" : "Add a new class or event"}
              >
                <Plus size={18} /> Add
              </button>
              <button onClick={() => setDeleteModalOpen(true)} disabled={isSelectedDateInPast}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-700 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none"
                title={isSelectedDateInPast ? "Cannot delete events from past dates" : "Delete a class or event"}
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="p-3 font-semibold">Time</th>
                  <th className="p-3 font-semibold">Module ID</th>
                  <th className="p-3 font-semibold">Module</th>
                  <th className="p-3 font-semibold">Instructor</th>
                  <th className="p-3 font-semibold">Room</th>
                </tr>
              </thead>
              <tbody>
                {eventsForSelectedDate.length > 0 ? (
                  eventsForSelectedDate.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 text-gray-600">{`${item.startTime} - ${item.endTime}`}</td>
                      <td className="p-3 text-blue-600 font-semibold">{item.moduleId}</td>
                      <td className="p-3 text-gray-800 font-medium">{item.moduleName}</td>
                      <td className="p-3 text-gray-600">{item.instructor}</td>
                      <td className="p-3 text-gray-600">{item.room}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-8 text-gray-500">No classes scheduled for this day.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timetable;
