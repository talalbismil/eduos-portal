export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>

        <p className="text-gray-600">
          You do not have permission to view this page.
        </p>

        <a
          href="/"
          className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
