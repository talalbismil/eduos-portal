'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="space-y-2">
      <Link
        href="/student"
        className="block rounded-lg px-4 py-3 hover:bg-gray-100"
      >
        Dashboard
      </Link>

      <Link
        href="/student/subjects"
        className="block rounded-lg px-4 py-3 hover:bg-gray-100"
      >
        Subjects
      </Link>

      <Link
        href="/student/homework"
        className="block rounded-lg px-4 py-3 hover:bg-gray-100"
      >
        Homework
      </Link>

      <Link
        href="/student/marks"
        className="block rounded-lg px-4 py-3 hover:bg-gray-100"
      >
        Marks
      </Link>

      <Link
        href="/student/attendance"
        className="block rounded-lg px-4 py-3 hover:bg-gray-100"
      >
        Attendance
      </Link>

      <Link
        href="/student/resources"
        className="block rounded-lg px-4 py-3 hover:bg-gray-100"
      >
        Resources
      </Link>
    </nav>
  );
}
