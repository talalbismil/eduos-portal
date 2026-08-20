'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Save,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Student = {
  id: number;
  name: string;
  roll_number?: string | number | null;
  registration_no?: string | null;
  class?: string | null;
};

type Marks = {
  [studentId: number]: string;
};

export default function TeacherMarksPage() {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [exam, setExam] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<Marks>({});

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadStudents() {
    if (!className) {
      setStudents([]);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from('students')
      .select(
        'id, name, roll_number, registration_no, class'
      )
      .eq('class', className)
      .order('roll_number');

    if (error) {
      console.error('Error loading students:', error.message);
      alert(error.message);
      setStudents([]);
      setLoading(false);
      return;
    }

    setStudents(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
  }, [className]);

  function updateMark(studentId: number, value: string) {
    setMarks((previous) => ({
      ...previous,
      [studentId]: value,
    }));
  }

  async function saveMarks() {
    if (!className) {
      alert('Please select a class.');
      return;
    }

    if (!subject.trim()) {
      alert('Please enter the subject.');
      return;
    }

    if (!exam.trim()) {
      alert('Please enter the exam name.');
      return;
    }

    if (!totalMarks) {
      alert('Please enter total marks.');
      return;
    }

    const total = Number(totalMarks);

    if (total <= 0) {
      alert('Total marks must be greater than 0.');
      return;
    }

    if (students.length === 0) {
      alert('No students found for this class.');
      return;
    }

    const invalidMarks = students.find((student) => {
      const value = marks[student.id];

      if (value === undefined || value === '') {
        return false;
      }

      const obtained = Number(value);

      return obtained < 0 || obtained > total;
    });

    if (invalidMarks) {
      alert(
        `Obtained marks for ${invalidMarks.name} must be between 0 and ${total}.`
      );
      return;
    }

    setSaving(true);

    const records = students.map((student) => ({
      student_id: student.id,
      class: className,
      subject: subject.trim(),
      exam: exam.trim(),
      total_marks: total,
      obtained_marks: Number(marks[student.id] || 0),
    }));

    const { error } = await supabase
      .from('marks')
      .insert(records);

    if (error) {
      console.error('Error saving marks:', error.message);
      alert(error.message);
      setSaving(false);
      return;
    }

    alert('Marks saved successfully.');

    setMarks({});
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">

        <div className="rounded-2xl bg-blue-100 p-3">
          <GraduationCap
            size={42}
            className="text-blue-600"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Teacher Marks Management
          </h1>

          <p className="mt-1 text-gray-600">
            Enter and save examination marks for your students.
          </p>
        </div>

      </div>

      {/* Exam Information */}
      <div className="mb-8 rounded-2xl bg-white p-6 shadow-md md:p-8">

        <div className="mb-6 flex items-center gap-3">

          <ClipboardCheck
            size={28}
            className="text-blue-600"
          />

          <h2 className="text-2xl font-bold text-gray-800">
            Examination Information
          </h2>

        </div>

        <div className="grid gap-5 md:grid-cols-4">

          {/* Class */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Class
            </label>

            <select
              className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={className}
              onChange={(e) =>
                setClassName(e.target.value)
              }
            >
              <option value="">
                Select Class
              </option>

              <option value="9">
                Class 9
              </option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Subject
            </label>

            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. Physics"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
            />
          </div>

          {/* Exam */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Exam
            </label>

            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. Mid Term"
              value={exam}
              onChange={(e) =>
                setExam(e.target.value)
              }
            />
          </div>

          {/* Total Marks */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Total Marks
            </label>

            <input
              type="number"
              min="1"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. 50"
              value={totalMarks}
              onChange={(e) =>
                setTotalMarks(e.target.value)
              }
            />
          </div>

        </div>

      </div>

      {/* Students */}
      <div className="rounded-2xl bg-white p-6 shadow-md md:p-8">

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Student Marks
          </h2>

          <p className="mt-1 text-gray-500">
            Select a class above to load its students.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl bg-gray-50 p-10 text-center">
            <p className="text-lg font-medium text-gray-600">
              Loading students...
            </p>
          </div>
        )}

        {/* No class */}
        {!loading && !className && (
          <div className="rounded-xl bg-gray-50 p-10 text-center">

            <GraduationCap
              size={52}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 text-xl font-bold text-gray-700">
              Select a Class
            </h3>

            <p className="mt-2 text-gray-500">
              Choose a class to display its students.
            </p>

          </div>
        )}

        {/* No students */}
        {!loading &&
          className &&
          students.length === 0 && (
            <div className="rounded-xl bg-gray-50 p-10 text-center">

              <GraduationCap
                size={52}
                className="mx-auto text-gray-400"
              />

              <h3 className="mt-4 text-xl font-bold text-gray-700">
                No Students Found
              </h3>

              <p className="mt-2 text-gray-500">
                There are no students registered in this class.
              </p>

            </div>
          )}

        {/* Student table */}
        {!loading && students.length > 0 && (
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-gray-100">

                  <th className="border p-3 text-left">
                    Roll No
                  </th>

                  <th className="border p-3 text-left">
                    Student Name
                  </th>

                  <th className="border p-3 text-left">
                    Registration No
                  </th>

                  <th className="border p-3 text-left">
                    Obtained Marks
                  </th>

                </tr>
              </thead>

              <tbody>

                {students.map((student) => (

                  <tr
                    key={student.id}
                    className="hover:bg-gray-50"
                  >

                    <td className="border p-3">
                      {student.roll_number ?? '-'}
                    </td>

                    <td className="border p-3 font-medium">
                      {student.name}
                    </td>

                    <td className="border p-3 text-gray-600">
                      {student.registration_no ?? '-'}
                    </td>

                    <td className="border p-3">

                      <input
                        type="number"
                        min="0"
                        max={
                          totalMarks
                            ? Number(totalMarks)
                            : undefined
                        }
                        className="w-32 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Marks"
                        value={
                          marks[student.id] ?? ''
                        }
                        onChange={(e) =>
                          updateMark(
                            student.id,
                            e.target.value
                          )
                        }
                      />

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {/* Save */}
            <button
              onClick={saveMarks}
              disabled={saving}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <Save size={20} />

              {saving
                ? 'Saving Marks...'
                : 'Save Marks'}

            </button>

          </div>
        )}

      </div>

    </div>
  );
}
