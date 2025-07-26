import { PackageSearch } from "lucide-react"; // Optional Lucide icon

const LostandFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <PackageSearch size={80} className="text-gray-400 mb-6" />
      <h1 className="text-4xl font-bold text-gray-700 mb-2">Lost and Found</h1>
      <p className="text-gray-500 text-lg text-center max-w-xl">
        This feature is <strong>coming soon</strong>! We’re working on a Lost
        and Found system for students and staff. Stay tuned!
      </p>
    </div>
  );
};

export default LostandFound;
