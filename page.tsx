import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow text-center">
        <h1 className="text-4xl font-bold mb-4">EduOS</h1>

        <p className="text-gray-600 mb-8">Education Operating System</p>

        <Link
          href="/login"
          className="block bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
