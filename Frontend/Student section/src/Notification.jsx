const Notification = ({ message, isVisible }) => {
    return (
        <div className={`fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'transform-none opacity-100' : 'translate-y-full opacity-0'}`}>
            {message}
        </div>
    );
};
export default Notification;