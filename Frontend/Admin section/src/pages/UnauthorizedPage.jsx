const UnauthorizedPage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-700">
    <h1 className="text-5xl font-bold">403</h1>
    <h2 className="text-2xl mt-2">Unauthorized</h2>
    <p className="mt-4">You do not have permission to view this page.</p>
    <Link
      to="/"
      className="mt-6 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
    >
      Back to Home
    </Link>
  </div>
);
export default UnauthorizedPage;
