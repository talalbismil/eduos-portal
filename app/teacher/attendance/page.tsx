'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type ClassItem = {
  id: number;
  name: string;
  section: string | null;
};

type Student = {
  id: number;
  name: string;
  roll_number: string | null;
  status: string;
};

export default function TeacherAttendancePage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [className, setClassName] = useState('');
  const [date, setDate] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    const { data, error } = await supabase
      .from('classes')
      .select('id,name,section,status')
      .eq('status', 'Active')
      .order('name', { ascending: true });

    if (error) {
      alert(error.message);
      return;
    }

    setClasses((data as ClassItem[]) || []);
  }

  async function loadStudents() {
    if (!className) {
      alert('Please select a class.');
      return;
    }

    const { data, error } = await supabase
      .from('students')
      .select('id,name,roll_number')
      .eq('class', className)
      .order('roll_number', { ascending: true });

    if (error) {
      alert(error.message);
      return;
    }

    const list: Student[] = (data || []).map((student: any) => ({
      ...student,
      status: 'Present',
    }));

    setStudents(list);
  }

  function updateStatus(studentId: number, status: string) {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  }

  async function saveAttendance() {
    if (!date) {
      alert('Please select a date.');
      return;
    }

    if (students.length === 0) {
      alert('Load students first.');
      return;
    }

    setLoading(true);

    for (const student of students) {
      const { data: existing } = await supabase
        .from('attendance')
        .select('id')
        .eq('student_id', student.id)
        .eq('date', date);

      if (existing && existing.length > 0) {
        const { error } = await supabase
          .from('attendance')
          .update({
            status: student.status,
          })
          .eq('student_id', student.id)
          .eq('date', date);

        if (error) {
          alert(error.message);
          setLoading(false);
          return;
        }
      } else {
        const { error } = await supabase.from('attendance').insert({
          student_id: student.id,
          date: date,
          status: student.status,
        });

        if (error) {
          alert(error.message);
          setLoading(false);
          return;
        }
      }
    }

    setLoading(false);

    alert('Attendance saved successfully.');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Class Attendance</h1>

      <div className="bg-white rounded-xl shadow p-8">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <select
            className="border p-3 rounded"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          >
            <option value="">Select Class</option>

            {classes.map((cls) => (
              <option key={cls.id} value={cls.name}>
                Class {cls.name}
                {cls.section ? ` - ${cls.section}` : ''}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-3 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            onClick={loadStudents}
            className="bg-blue-600 text-white rounded px-4"
          >
            Load Students
          </button>
        </div>

        {students.length > 0 && (
          <>
            <table className="w-full border border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3">Roll No</th>

                  <th className="border p-3">Student</th>

                  <th className="border p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="border p-3">{student.roll_number}</td>

                    <td className="border p-3">{student.name}</td>

                    <td className="border p-3">
                      <select
                        className="border p-2 rounded"
                        value={student.status}
                        onChange={(e) =>
                          updateStatus(student.id, e.target.value)
                        }
                      >
                        <option value="Present">Present</option>

                        <option value="Absent">Absent</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={saveAttendance}
              disabled={loading}
              className="mt-6 bg-green-600 text-white px-8 py-3 rounded"
            >
              {loading ? 'Saving...' : 'Save Attendance'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
