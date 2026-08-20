'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function AdminHomeworkPage() {
  const [homework, setHomework] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    class: '',
    subject: '',
  });

  useEffect(() => {
    loadHomework();
  }, []);

  async function loadHomework() {
    const { data, error } = await supabase
      .from('homework')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setHomework(data || []);

    setLoading(false);
  }

  async function addHomework() {
    const { error } = await supabase.from('homework').insert([form]);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Homework added successfully');

    setShowForm(false);

    setForm({
      title: '',
      description: '',
      class: '',
      subject: '',
    });

    loadHomework();
  }

  async function deleteHomework(id: number) {
    const confirmDelete = confirm('Delete this homework?');

    if (!confirmDelete) return;

    const { error } = await supabase.from('homework').delete().eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    loadHomework();
  }

  if (loading) {
    return <div className="p-10">Loading homework...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Manage Homework</h1>

      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Homework List</h2>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Homework
          </button>
        </div>

        {showForm && (
          <div className="border rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-5">Add New Homework</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="border p-3 rounded"
                placeholder="Homework Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subject: e.target.value,
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

              <textarea
                className="border p-3 rounded md:col-span-2"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={addHomework}
              className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg"
            >
              Save Homework
            </button>
          </div>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Title</th>

              <th className="border p-3">Subject</th>

              <th className="border p-3">Class</th>

              <th className="border p-3">Description</th>

              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {homework.map((item) => (
              <tr key={item.id}>
                <td className="border p-3">{item.title}</td>

                <td className="border p-3">{item.subject}</td>

                <td className="border p-3">{item.class}</td>

                <td className="border p-3">{item.description}</td>

                <td className="border p-3">
                  <button
                    onClick={() => deleteHomework(item.id)}
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
