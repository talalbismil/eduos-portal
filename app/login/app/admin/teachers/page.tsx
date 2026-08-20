'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    qualification: '',
    status: 'active',
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setTeachers(data || []);

    setLoading(false);
  }

  async function addTeacher() {
    const { error } = await supabase.from('teachers').insert([form]);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Teacher added successfully');

    setShowForm(false);

    setForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      qualification: '',
      status: 'active',
    });

    loadTeachers();
  }

  async function deleteTeacher(id: number) {
    const confirmDelete = confirm('Delete this teacher?');

    if (!confirmDelete) return;

    const { error } = await supabase.from('teachers').delete().eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    loadTeachers();
  }

  if (loading) {
    return <div className="p-10">Loading teachers...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Manage Teachers</h1>

      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Teacher List</h2>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Teacher
          </button>
        </div>

        {showForm && (
          <div className="border rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-5">Add New Teacher</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                className="border p-3 rounded"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="border p-3 rounded"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                className="border p-3 rounded"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                className="border p-3 rounded"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />

              <input
                className="border p-3 rounded"
                placeholder="Qualification"
                value={form.qualification}
                onChange={(e) =>
                  setForm({ ...form, qualification: e.target.value })
                }
              />
            </div>

            <button
              onClick={addTeacher}
              className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg"
            >
              Save Teacher
            </button>
          </div>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Name</th>

              <th className="border p-3">Email</th>

              <th className="border p-3">Subject</th>

              <th className="border p-3">Qualification</th>

              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="border p-3">{teacher.name}</td>

                <td className="border p-3">{teacher.email}</td>

                <td className="border p-3">{teacher.subject}</td>

                <td className="border p-3">{teacher.qualification}</td>

                <td className="border p-3">
                  <button
                    onClick={() => deleteTeacher(teacher.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
