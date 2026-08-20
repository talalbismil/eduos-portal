'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function StudentHomeworkPage() {
  const [homework, setHomework] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomework();
  }, []);

  async function loadHomework() {
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

    const { data: homeworkData, error: homeworkError } = await supabase
      .from('homework')
      .select('*')
      .eq('class', student.class)
      .order('id', { ascending: false });

    if (homeworkError) {
      console.log(homeworkError.message);
      setLoading(false);
      return;
    }

    setHomework(homeworkData || []);
    setLoading(false);
  }

  if (loading) {
    return <div className="p-10">Loading homework...</div>;
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">My Homework</h1>

      {homework.length > 0 ? (
        <div className="space-y-5">
          {homework.map((h) => (
            <div key={h.id} className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold">{h.title}</h2>

              <p className="mt-2">
                <b>Subject:</b> {h.subject}
              </p>

              <p>
                <b>Class:</b> {h.class}
              </p>

              <p className="mt-3">{h.description}</p>

              <p className="mt-3 text-gray-600">Due Date: {h.due_date}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow">
          No homework assigned yet.
        </div>
      )}
    </div>
  );
}
