'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    teacher: '',
    class: '',
  });

  useEffect(() => {
    loadSubjects();
  }, []);

  async function loadSubjects() {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setSubjects(data || []);

    setLoading(false);
  }

  async function addSubject() {
    const { error } = await supabase.from('subjects').insert([form]);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Subject added successfully');

    setShowForm(false);

    setForm({
      name: '',
      teacher: '',
      class: '',
    });

    loadSubjects();
  }

  async function deleteSubject(id: number) {
    const confirmDelete = confirm('Delete this subject?');

    if (!confirmDelete) return;

    const { error } = await supabase.from('subjects').delete().eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    loadSubjects();
  }

  if (loading) {
    return <div className="p-10">Loading subjects...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Manage Subjects</h1>

      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Subject List</h2>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Subject
          </button>
        </div>

        {showForm && (
          <div className="border rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-5">Add New Subject</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                className="border p-3 rounded"
                placeholder="Subject Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="Teacher Name"
                value={form.teacher}
                onChange={(e) =>
                  setForm({
                    ...form,
                    teacher: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="Class"
                value={form.class}
                onChange={(e) =>
                  setForm({
                    ...form,
                    class: e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={addSubject}
              className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg"
            >
              Save Subject
            </button>
          </div>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Subject</th>

              <th className="border p-3">Teacher</th>

              <th className="border p-3">Class</th>

              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td className="border p-3">{subject.name}</td>

                <td className="border p-3">{subject.teacher}</td>

                <td className="border p-3">{subject.class}</td>

                <td className="border p-3">
                  <button
                    onClick={() => deleteSubject(subject.id)}
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
