'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Student {
  id: number;
  name: string;
  class: string;
  section: string;
  roll_number: string;
}

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('id');

    if (error) {
      console.error(error);
    } else {
      setStudents(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <div className="p-10">Loading students...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">Students</h1>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="border rounded-lg p-5 bg-white shadow"
            >
              <h2 className="text-2xl font-bold">{student.name}</h2>

              <p>Class: {student.class}</p>
              <p>Section: {student.section}</p>
              <p>Roll Number: {student.roll_number}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
