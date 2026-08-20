'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  CalendarCheck,
  Users,
  GraduationCap,
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 text-white">

      {/* Logo */}
      <div className="border-b border-slate-700 p-6">
        <Link
          href="/student"
          className="flex items-center gap-3"
        >
          <GraduationCap
            size={32}
            className="text-blue-400"
          />

          <div>
            <h1 className="text-xl font-bold">
              EduOS
            </h1>

            <p className="text-xs text-slate-400">
              Student Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">

        <Link
          href="/student"
          className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/student/subjects"
          className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-800"
        >
          <BookOpen size={20} />
          My Subjects
        </Link>

        <Link
          href="/student/homework"
          className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-800"
        >
          <ClipboardList size={20} />
          Homework
        </Link>

        <Link
          href="/student/marks"
          className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-800"
        >
          <BarChart3 size={20} />
          Marks
        </Link>

        <Link
          href="/student/attendance"
          className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-800"
        >
          <CalendarCheck size={20} />
          Attendance
        </Link>

        <Link
          href="/student/resources"
          className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-800"
        >
          <BookOpen size={20} />
          Resources
        </Link>

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-3">

          <Users
            size={20}
            className="text-slate-400"
          />

          <span className="text-sm text-slate-300">
            Student Portal
          </span>

        </div>
      </div>

    </aside>
  );
}
