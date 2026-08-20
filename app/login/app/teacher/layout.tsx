import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    { name: 'Dashboard', href: '/teacher' },
    { name: 'Students', href: '/teacher/students' },
    { name: 'Homework', href: '/teacher/homework' },
    { name: 'Marks', href: '/teacher/marks' },
    { name: 'Attendance', href: '/teacher/attendance' },
    { name: 'Courses', href: '/teacher/courses' },
    { name: 'Results', href: '/teacher/results' },
  ];

  return (
    <div className="flex min-h-screen w-full">
      {/* Compact Teacher Sidebar */}
      <aside
        className="
          w-48
          flex-shrink-0
          bg-white
          border-r
          min-h-screen
          p-4
          flex
          flex-col
        "
      >
        <h1 className="text-xl font-bold mb-2">EduOS</h1>

        <p className="text-xs text-gray-500 mb-6">Teacher Portal</p>

        <nav className="space-y-2 flex-1">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                block
                px-3
                py-2
                rounded-lg
                text-sm
                text-gray-700
                hover:bg-blue-50
                hover:text-blue-600
                transition
              "
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <LogoutButton />
      </aside>

      {/* Expanded Teacher Workspace */}
      <main
        className="
          flex-1
          min-w-0
          min-h-screen
          bg-gray-100
          p-8
          overflow-y-auto
        "
      >
        {children}
      </main>
    </div>
  );
}
