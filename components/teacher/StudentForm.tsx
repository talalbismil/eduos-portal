'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function StudentForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    father_name: '',
    email: '',
    phone: '',
    class: '',
    section: '',
    roll_number: '',
    registration_no: '',
    gender: '',
    dob: '',
    address: '',
    admission_date: '',
    status: 'Active',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const studentData = {
      ...form,
      dob: form.dob || null,
      admission_date: form.admission_date || null,
    };

    const { error } = await supabase.from('students').insert([studentData]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Student Added Successfully');

    setForm({
      name: '',
      father_name: '',
      email: '',
      phone: '',
      class: '',
      section: '',
      roll_number: '',
      registration_no: '',
      gender: '',
      dob: '',
      address: '',
      admission_date: '',
      status: 'Active',
    });

    router.refresh();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-bold mb-6">Add New Student</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Full Name"
        />

        <input
          name="father_name"
          value={form.father_name}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Father Name"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Email"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Phone"
        />

        <input
          name="class"
          value={form.class}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Class"
        />

        <input
          name="section"
          value={form.section}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Section"
        />

        <input
          name="roll_number"
          value={form.roll_number}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Roll Number"
        />

        <input
          name="registration_no"
          value={form.registration_no}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Registration Number"
        />

        <input
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Gender"
        />

        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="admission_date"
          type="date"
          value={form.admission_date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Status"
        />
      </div>

      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 rounded w-full mt-4"
        rows={4}
        placeholder="Address"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Saving...' : 'Save Student'}
      </button>
    </div>
  );
}
