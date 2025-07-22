const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-lg w-full">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <Icon name="close" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
export default Modal;