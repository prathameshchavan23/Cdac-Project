const LeftSidebar = () => (
    <aside className="w-full lg:w-1/4 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                <button className="text-gray-600 hover:text-gray-800"><Icon name="chevron_left" /></button>
                <h2 className="text-lg font-semibold text-gray-800">October 2024</h2>
                <button className="text-gray-600 hover:text-gray-800"><Icon name="chevron_right" /></button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500">
                {/* FIX: Added index to key to ensure uniqueness, as 'S' and 'T' are duplicated. */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <div key={`${day}-${index}`}>{day}</div>)}
                <div className="text-gray-400"></div><div className="text-gray-400"></div>
                {[...Array(30).keys()].map(i => (
                    <div key={i} className={i + 1 === 5 ? "bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" : ""}>{i + 1}</div>
                ))}
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
            <div className="space-y-4">
                <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3"><Icon name="calendar_today" className="text-gray-600" /></div>
                    <div>
                        <p className="font-medium text-gray-800">Math 101 Exam</p>
                        <p className="text-sm text-gray-500">Oct 21, 2024</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3"><Icon name="calendar_today" className="text-gray-600" /></div>
                    <div>
                        <p className="font-medium text-gray-800">History 202 Lecture</p>
                        <p className="text-sm text-gray-500">Oct 22, 2024</p>
                    </div>
                </div>
            </div>
        </div>
    </aside>
);
export default LeftSidebar;