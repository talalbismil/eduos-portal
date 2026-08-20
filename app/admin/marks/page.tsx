'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function AdminMarksPage() {
  const [marks, setMarks] = useState<any[]>([]);

  const [students, setStudents] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    student_id: '',
    subject: '',
    obtained_marks: '',
    exam: '',
    total_marks: '',
  });

  useEffect(() => {
    loadMarks();

    loadStudents();
  }, []);

  async function loadMarks() {
    const { data, error } = await supabase
      .from('marks')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setMarks(data || []);
  }

  async function loadStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('id,name,roll_number');

    if (error) {
      alert(error.message);
      return;
    }

    setStudents(data || []);

    setLoading(false);
  }

  async function addMarks() {
    if (!form.student_id || !form.obtained_marks || !form.total_marks) {
      alert('Please fill all marks fields');
      return;
    }
    const { error } = await supabase.from('marks').insert([
      {
        student_id: Number(form.student_id),
        subject: form.subject,
        obtained_marks: Number(form.obtained_marks),
        exam: form.exam,
        total_marks: Number(form.total_marks),
      },
    ]);
    if (error) {
      alert(error.message);
      return;
    }

    alert('Marks added successfully');

    setShowForm(false);

    setForm({
      student_id: '',
      subject: '',
      obtained_marks: '',
      exam: '',
      total_marks: '',
    });

    loadMarks();
  }

  async function deleteMarks(id: number) {
    const confirmDelete = confirm('Delete these marks?');

    if (!confirmDelete) return;

    const { error } = await supabase.from('marks').delete().eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    loadMarks();
  }

  if (loading) {
    return <div className="p-10">Loading marks...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Manage Marks</h1>

      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Marks List</h2>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Marks
          </button>
        </div>

        {showForm && (
          <div className="border rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-5">Add Student Marks</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <select
                className="border p-3 rounded"
                value={form.student_id}
                onChange={(e) =>
                  setForm({
                    ...form,
                    student_id: e.target.value,
                  })
                }
              >
                <option value="">Select Student</option>

                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.roll_number})
                  </option>
                ))}
              </select>

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
                placeholder="Exam"
                value={form.exam}
                onChange={(e) =>
                  setForm({
                    ...form,
                    exam: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="Obtained Marks"
                value={form.obtained_marks}
                onChange={(e) =>
                  setForm({
                    ...form,
                    obtained_marks: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="Total Marks"
                value={form.total_marks}
                onChange={(e) =>
                  setForm({
                    ...form,
                    total_marks: e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={addMarks}
              className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg"
            >
              Save Marks
            </button>
          </div>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Student ID</th>

              <th className="border p-3">Subject</th>

              <th className="border p-3">Exam</th>

              <th className="border p-3">Marks</th>

              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {marks.map((item) => (
              <tr key={item.id}>
                <td className="border p-3">{item.student_id}</td>

                <td className="border p-3">{item.subject}</td>

                <td className="border p-3">{item.exam}</td>

                <td className="border p-3">
                  {item.obtained_marks} / {item.total_marks}
                </td>

                <td className="border p-3">
                  <button
                    onClick={() => deleteMarks(item.id)}
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
