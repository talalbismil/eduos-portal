'use client';

import Link from 'next/link';

import {
  BookOpen,
  ClipboardCheck,
  Users,
  CalendarCheck,
  FolderOpen,
  GraduationCap,
  FileText,
} from 'lucide-react';

export default function TeacherDashboard() {
  const cards = [
    {
      title: 'Homework',
      description: 'Create and manage student assignments',
      href: '/teacher/homework',
      icon: <BookOpen size={38} />,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Marks',
      description: 'Enter and manage student results',
      href: '/teacher/marks',
      icon: <ClipboardCheck size={38} />,
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'Attendance',
      description: 'Mark and track daily attendance',
      href: '/teacher/attendance',
      icon: <CalendarCheck size={38} />,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      title: 'Resources',
      description: 'Upload learning materials',
      href: '/teacher/resources',
      icon: <FolderOpen size={38} />,
      color: 'text-orange-600 bg-orange-100',
    },
    {
      title: 'Subjects',
      description: 'Manage assigned subjects',
      href: '/teacher/subjects',
      icon: <GraduationCap size={38} />,
      color: 'text-pink-600 bg-pink-100',
    },
    {
      title: 'Students',
      description: 'View and manage students',
      href: '/teacher/students',
      icon: <Users size={38} />,
      color: 'text-gray-700 bg-gray-100',
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Header */}
      <section className="mb-10">
        <div className="flex items-center gap-3">
          <FileText size={42} className="text-blue-600" />

          <h1 className="text-4xl font-bold text-gray-900">
            Teacher Dashboard
          </h1>
        </div>

        <p className="mt-3 text-gray-600 text-lg">
          Welcome to EduOS Teacher Portal. Manage your classes, students, and
          academic activities.
        </p>
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Students</p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">--</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Classes</p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">--</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Homework</p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">--</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Subjects</p>

          <h2 className="text-3xl font-bold text-orange-600 mt-2">--</h2>
        </div>
      </section>

      {/* Modules */}

      <h2 className="text-3xl font-bold mb-6">Teacher Modules</h2>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="block">
            <div
              className="
                bg-white
                rounded-xl
                shadow
                p-6
                h-full
                hover:shadow-xl
                hover:-translate-y-1
                transition
                cursor-pointer
              "
            >
              <div
                className={`
                  w-16
                  h-16
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  ${card.color}
                `}
              >
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold mt-5">{card.title}</h3>

              <p className="mt-2 text-gray-600">{card.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
