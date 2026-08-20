'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function StudentMarksPage() {
  const [marks, setMarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarks();
  }, []);

  async function loadMarks() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: students, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('email', user.email);

    if (studentError) {
      console.log(studentError.message);
      setLoading(false);
      return;
    }

    if (!students || students.length === 0) {
      setLoading(false);
      return;
    }

    const student = students[0];

    const { data: marksData, error: marksError } = await supabase
      .from('marks')
      .select('*')
      .eq('student_id', student.id)
      .order('id', { ascending: false });

    if (marksError) {
      console.log(marksError.message);
      setLoading(false);
      return;
    }

    setMarks(marksData || []);
    setLoading(false);
  }

  if (loading) {
    return <div className="p-10">Loading marks...</div>;
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">My Marks</h1>

      {marks.length > 0 ? (
        <div className="space-y-5">
          {marks.map((m) => (
            <div key={m.id} className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold">{m.subject}</h2>

              <p className="mt-2">
                <b>Exam:</b> {m.exam}
              </p>

              <p>
                <b>Marks:</b> {m.obtained_marks} / {m.total_marks}
              </p>

              <p className="mt-2 text-gray-600">
                Percentage:{' '}
                {((m.obtained_marks / m.total_marks) * 100).toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow">
          No marks available yet.
        </div>
      )}
    </div>
  );
}
