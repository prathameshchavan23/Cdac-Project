const PlaceholderPage = ({ title }) => (
    <div className="w-full lg:w-3/4">
        <div className="bg-white p-10 rounded-lg shadow">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
            <p className="text-gray-600">This is a placeholder page for the {title} section. Content will be added here.</p>
        </div>
    </div>
);
export default PlaceholderPage;