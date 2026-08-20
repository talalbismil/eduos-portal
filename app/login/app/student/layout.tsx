'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { name: '🏠 Dashboard', href: '/student' },
    { name: '📚 Subjects', href: '/student/subjects' },
    { name: '📝 Homework', href: '/student/homework' },
    { name: '📊 Results', href: '/student/results' },
    { name: '📅 Attendance', href: '/student/attendance' },
    { name: '📖 Resources', href: '/student/resources' },
  ];

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '224px',
          flexShrink: 0,
          background: '#111827',
          color: 'white',
          padding: '20px',
        }}
      >
        <h1
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
            marginBottom: '6px',
          }}
        >
          EduOS
        </h1>

        <p
          style={{
            color: '#9ca3af',
            marginBottom: '30px',
            fontSize: '14px',
          }}
        >
          Student Portal
        </p>

        <nav>
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '12px 16px',
                marginBottom: '10px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                background: pathname === item.href ? '#2563eb' : 'transparent',
              }}
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={logout}
            style={{
              width: '100%',
              marginTop: '30px',
              padding: '12px',
              border: 'none',
              borderRadius: '12px',
              background: '#dc2626',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          width: 'calc(100vw - 224px)',
          minWidth: 0,
          padding: '32px',
          overflowY: 'auto',
          background: '#f3f4f6',
        }}
      >
        {children}
      </main>
    </div>
  );
}
