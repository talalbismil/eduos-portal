'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Page() {
  const [students, setStudents] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);

  const [form, setForm] = useState({
    student_id: '',
    subject: '',
    marks: '',
  });

  async function loadData() {
    const { data: studentsData } = await supabase.from('students').select('*');

    const { data: resultsData } = await supabase.from('results').select('*');

    const combined = (resultsData || []).map((r) => {
      const student = studentsData?.find((s) => s.id === r.student_id);

      return {
        ...r,
        student_name: student?.name || 'Unknown',
      };
    });

    setStudents(studentsData || []);
    setResults(combined);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function saveResult() {
    const { error } = await supabase.from('results').insert({
      student_id: Number(form.student_id),

      subject: form.subject,

      marks: Number(form.marks),

      total_marks: 100,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert('Result Saved');

    loadData();
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Enter Results</h1>

      <select
        className="border p-3 w-full mb-4"
        value={form.student_id}
        onChange={(e) =>
          setForm({
            ...form,

            student_id: e.target.value,
          })
        }
      >
        <option value="">Select Student</option>

        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <input
        className="border p-3 w-full mb-4"
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
        className="border p-3 w-full mb-4"
        placeholder="Marks"
        type="number"
        value={form.marks}
        onChange={(e) =>
          setForm({
            ...form,

            marks: e.target.value,
          })
        }
      />

      <button
        onClick={saveResult}
        className="
        bg-blue-600
        text-white
        px-6
        py-2
        rounded
        "
      >
        Save Result
      </button>

      <h2 className="text-2xl font-bold mt-10 mb-5">Saved Results</h2>

      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-3">Student</th>

            <th className="border p-3">Subject</th>

            <th className="border p-3">Marks</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r) => (
            <tr key={r.id}>
              <td className="border p-3">{r.student_name}</td>

              <td className="border p-3">{r.subject}</td>

              <td className="border p-3">{r.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
