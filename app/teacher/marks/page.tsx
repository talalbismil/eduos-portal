'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Save, GraduationCap, ClipboardCheck } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function TeacherMarksPage() {
  const [className, setClassName] = useState('');

  const [subject, setSubject] = useState('');

  const [exam, setExam] = useState('');

  const [totalMarks, setTotalMarks] = useState('');

  const [students, setStudents] = useState<any[]>([]);

  const [marks, setMarks] = useState<any>({});

  async function loadStudents() {
    if (!className) return;

    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('class', className);

    if (error) {
      alert(error.message);
      return;
    }

    setStudents(data || []);
  }

  useEffect(() => {
    loadStudents();
  }, [className]);

  async function saveMarks() {
    if (!subject || !exam || !totalMarks) {
      alert('Fill all fields');
      return;
    }

    const records = students.map((student) => ({
      student_id: student.id,

      class: className,

      subject,

      exam,

      total_marks: Number(totalMarks),

      obtained_marks: Number(marks[student.id] || 0),
    }));

    const { error } = await supabase.from('marks').insert(records);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Marks saved successfully');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex items-center gap-3 mb-8">
        <ClipboardCheck size={42} className="text-blue-600" />

        <h1 className="text-4xl font-bold">Teacher Marks Management</h1>
      </div>

      <div className="bg-white rounded-xl shadow p-8 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <select
            className="border p-3 rounded"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          >
            <option value="">Select Class</option>

            <option value="9">Class 9</option>
          </select>

          <input
            className="border p-3 rounded"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            className="border p-3 rounded"
            placeholder="Exam Name"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          />

          <input
            className="border p-3 rounded"
            placeholder="Total Marks"
            type="number"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Roll No</th>

              <th className="border p-3">Student Name</th>

              <th className="border p-3">Obtained Marks</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border p-3">{student.roll_number}</td>

                <td className="border p-3">{student.name}</td>

                <td className="border p-3">
                  <input
                    type="number"
                    className="border p-2 rounded w-32"
                    value={marks[student.id] || ''}
                    onChange={(e) =>
                      setMarks({
                        ...marks,
                        [student.id]: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length > 0 && (
          <button
            onClick={saveMarks}
            className="
          mt-8
          bg-blue-600
          text-white
          px-8
          py-3
          rounded-lg
          flex
          items-center
          gap-2
          "
          >
            <Save size={20} />
            Save Marks
          </button>
        )}
      </div>
    </div>
  );
}
