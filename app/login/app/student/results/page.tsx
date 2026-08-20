'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function StudentResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  async function loadResults() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert('Please login again.');
      setLoading(false);
      return;
    }

    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('email', user.email)
      .single();

    if (studentError) {
      alert(studentError.message);
      setLoading(false);
      return;
    }

    setStudent(studentData);

    const { data: marksData, error: marksError } = await supabase
      .from('marks')
      .select('*')
      .eq('student_id', studentData.id)
      .order('id', { ascending: false });

    if (marksError) {
      alert(marksError.message);
      setLoading(false);
      return;
    }

    setResults(marksData || []);

    setLoading(false);
  }

  if (loading) {
    return <div className="p-10">Loading results...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-6">My Results</h1>

      {student && (
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold">Student Information</h2>

          <p>Name: {student.name}</p>

          <p>Class: {student.class}</p>

          <p>Roll Number: {student.roll_number}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow p-8">
        {results.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3">Subject</th>

                <th className="border p-3">Exam</th>

                <th className="border p-3">Obtained Marks</th>

                <th className="border p-3">Total Marks</th>

                <th className="border p-3">Percentage</th>
              </tr>
            </thead>

            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td className="border p-3">{result.subject}</td>

                  <td className="border p-3">{result.exam}</td>

                  <td className="border p-3">{result.obtained_marks}</td>

                  <td className="border p-3">{result.total_marks}</td>

                  <td className="border p-3">
                    {(
                      (Number(result.obtained_marks) /
                        Number(result.total_marks)) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-5">No results available yet.</div>
        )}
      </div>
    </div>
  );
}
