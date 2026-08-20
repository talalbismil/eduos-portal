'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const [student, setStudent] = useState({
    name: '',
    father_name: '',
    email: '',
    phone: '',
    class: '',
    section: '',
    roll_number: '',
    registration_no: '',
    gender: '',
    status: 'Active',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function saveStudent() {
    const { error } = await supabase.from('students').insert(student);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Student Added');

    router.push('/teacher/students');
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Add New Student</h1>

      <div className="max-w-xl space-y-4">
        <input
          name="name"
          placeholder="Name"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="father_name"
          placeholder="Father Name"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="class"
          placeholder="Class"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="section"
          placeholder="Section"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="roll_number"
          placeholder="Roll Number"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="registration_no"
          placeholder="Registration No"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <input
          name="gender"
          placeholder="Gender"
          className="border p-3 w-full rounded"
          onChange={handleChange}
        />

        <button
          onClick={saveStudent}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add Student
        </button>
      </div>
    </div>
  );
}
