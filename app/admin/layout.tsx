'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { name: '🏠 Dashboard', href: '/admin' },
    { name: '👨‍🎓 Students', href: '/admin/students' },
    { name: '👨‍🏫 Teachers', href: '/admin/teachers' },
    { name: '📚 Subjects', href: '/admin/subjects' },
    { name: '📝 Homework', href: '/admin/homework' },
    { name: '📊 Marks', href: '/admin/marks' },
    { name: '📅 Attendance', href: '/admin/attendance' },
    { name: '📂 Resources', href: '/admin/resources' },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-8">EduOS</h1>

        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block p-3 rounded-lg ${
                pathname === item.href ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => {
              sessionStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="w-full text-left mt-6 p-3 rounded-lg bg-red-600 hover:bg-red-700"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
