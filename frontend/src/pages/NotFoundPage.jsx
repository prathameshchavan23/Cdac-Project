import { Link } from 'react-router-dom';
const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
    <h1 className="text-5xl font-bold">404</h1>
    <h2 className="text-2xl mt-2">Page Not Found</h2>
    <p className="mt-4">The page you are looking for does not exist.</p>
    <Link
      to="/"
      className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
    >
      Back to Home
    </Link>
  </div>
);
export default NotFoundPage;
