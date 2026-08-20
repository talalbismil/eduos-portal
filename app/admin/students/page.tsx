'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    father_name: '',
    phone: '',
    class: '',
    section: '',
    roll_number: '',
    gender: '',
    dob: '',
    address: '',
    admission_date: '',
    registration_no: '',
    status: 'active',
  });

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setStudents(data || []);

    setLoading(false);
  }

  async function addStudent() {
    const { error } = await supabase.from('students').insert([
      {
        name: form.name,
        email: form.email,
        father_name: form.father_name,
        phone: form.phone,
        class: form.class,
        section: form.section,
        roll_number: form.roll_number,
        gender: form.gender || null,
        dob: form.dob || null,
        address: form.address,
        admission_date: form.admission_date || null,
        registration_no: form.registration_no,
        status: form.status,
        role: 'student',
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Student added successfully');

    setShowForm(false);

    setForm({
      name: '',
      email: '',
      father_name: '',
      phone: '',
      class: '',
      section: '',
      roll_number: '',
      gender: '',
      dob: '',
      address: '',
      admission_date: '',
      registration_no: '',
      status: 'active',
    });

    loadStudents();
  }

  async function deleteStudent(id: number) {
    const confirmDelete = confirm('Delete this student?');

    if (!confirmDelete) return;

    const { error } = await supabase.from('students').delete().eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    loadStudents();
  }

  if (loading) {
    return <div className="p-10">Loading students...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Manage Students</h1>

      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Student List</h2>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Student
          </button>
        </div>

        {showForm && (
          <div className="border rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-5">Add New Student</h2>

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
                placeholder="Father Name"
                value={form.father_name}
                onChange={(e) =>
                  setForm({ ...form, father_name: e.target.value })
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                className="border p-3 rounded"
                placeholder="Class"
                value={form.class}
                onChange={(e) => setForm({ ...form, class: e.target.value })}
              />

              <input
                className="border p-3 rounded"
                placeholder="Section"
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
              />

              <input
                className="border p-3 rounded"
                placeholder="Roll Number"
                value={form.roll_number}
                onChange={(e) =>
                  setForm({ ...form, roll_number: e.target.value })
                }
              />

              <input
                className="border p-3 rounded"
                placeholder="Registration No"
                value={form.registration_no}
                onChange={(e) =>
                  setForm({ ...form, registration_no: e.target.value })
                }
              />
            </div>

            <button
              onClick={addStudent}
              className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg"
            >
              Save Student
            </button>
          </div>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Roll No</th>

              <th className="border p-3">Name</th>

              <th className="border p-3">Class</th>

              <th className="border p-3">Phone</th>

              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border p-3">{student.roll_number}</td>

                <td className="border p-3">{student.name}</td>

                <td className="border p-3">{student.class}</td>

                <td className="border p-3">{student.phone}</td>

                <td className="border p-3">
                  <button
                    onClick={() => deleteStudent(student.id)}
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
