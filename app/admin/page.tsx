'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    subjects: 0,
    homework: 0,
    resources: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function getCount(table: string) {
    const { count, error } = await supabase.from(table).select('*', {
      count: 'exact',
      head: true,
    });

    if (error) {
      console.log(error.message);
      return 0;
    }

    return count || 0;
  }

  async function loadStats() {
    const students = await getCount('students');

    const teachers = await getCount('teachers');

    const subjects = await getCount('subjects');

    const homework = await getCount('homework');

    const resources = await getCount('resources');

    setStats({
      students,
      teachers,
      subjects,
      homework,
      resources,
    });

    setLoading(false);
  }

  if (loading) {
    return <div className="p-10">Loading dashboard...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-600">Students</h2>

          <p className="text-4xl font-bold mt-3">{stats.students}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-600">Teachers</h2>

          <p className="text-4xl font-bold mt-3">{stats.teachers}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-600">Subjects</h2>

          <p className="text-4xl font-bold mt-3">{stats.subjects}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-600">Homework</h2>

          <p className="text-4xl font-bold mt-3">{stats.homework}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-600">Resources</h2>

          <p className="text-4xl font-bold mt-3">{stats.resources}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Welcome Admin</h2>

        <p>Manage your complete school system from this dashboard.</p>
      </div>
    </div>
  );
}
