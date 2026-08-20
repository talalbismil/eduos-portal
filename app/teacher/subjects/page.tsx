'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function SubjectsPage() {
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('M. Talal');
  const [subjects, setSubjects] = useState<any[]>([]);

  async function loadSubjects() {
    const { data } = await supabase.from('subjects').select('*');

    setSubjects(data || []);
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  async function addSubject() {
    if (!name) return;

    await supabase.from('subjects').insert([
      {
        name,
        teacher,
      },
    ]);

    setName('');
    loadSubjects();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Subjects</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-lg">
        <input
          className="border p-2 w-full mb-4"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
        />

        <button
          onClick={addSubject}
          className="bg-blue-900 text-white px-5 py-2 rounded"
        >
          Add Subject
        </button>
      </div>

      <h2 className="text-2xl font-bold mt-8">Existing Subjects</h2>

      <div className="mt-4 grid gap-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{subject.name}</h3>

            <p>Teacher: {subject.teacher}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
