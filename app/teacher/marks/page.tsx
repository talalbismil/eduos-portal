```tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Save,
  GraduationCap,
  ClipboardCheck,
  Loader2,
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Student = {
  id: number;
  name: string;
  roll_number: string | number | null;
  class: string | null;
};

type Subject = {
  id: number;
  name: string;
  class: string | null;
  teacher?: string | null;
};

export default function TeacherMarksPage() {
  const [classes, setClasses] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [className, setClassName] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [exam, setExam] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

  const [marks, setMarks] = useState<Record<number, string>>({});

  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    setLoadingClasses(true);

    const { data, error } = await supabase
      .from('students')
      .select('class');

    if (error) {
      console.error('Error loading classes:', error.message);
      alert(error.message);
      setLoadingClasses(false);
      return;
    }

    const uniqueClasses = Array.from(
      new Set(
        (data || [])
          .map((student) => student.class?.trim())
          .filter(
            (value): value is string =>
              Boolean(value)
          )
      )
    ).sort((a, b) => {
      const numberA = Number(a);
      const numberB = Number(b);

      if (
        !Number.isNaN(numberA) &&
        !Number.isNaN(numberB)
      ) {
        return numberA - numberB;
      }

      return a.localeCompare(b);
    });

    setClasses(uniqueClasses);
    setLoadingClasses(false);
  }

  useEffect(() => {
    if (!className) {
      setSubjects([]);
      setStudents([]);
      setSubjectId('');
      setMarks({});
      return;
    }

    setSubjectId('');
    setMarks({});

    loadSubjects(className);
    loadStudents(className);
  }, [className]);

  async function loadSubjects(selectedClass: string) {
    setLoadingSubjects(true);

    /*
     * IMPORTANT:
     * Load ALL subjects first.
     *
     * We do not use:
     *
     * .eq('class', selectedClass)
     *
     * because the subjects.class field can contain
     * whitespace or inconsistent formatting.
     */

    const { data, error } = await supabase
      .from('subjects')
      .select('id, name, class, teacher')
      .order('id');

    if (error) {
      console.error(
        'Error loading subjects:',
        error.message
      );

      alert(error.message);

      setSubjects([]);
      setLoadingSubjects(false);
      return;
    }

    /*
     * Match class safely after trimming whitespace.
     */
    const normalizedClass =
      selectedClass.trim();

    const filteredSubjects = (
      (data || []) as Subject[]
    ).filter((subject) => {
      if (!subject.class) {
        return false;
      }

      return (
        subject.class.trim() ===
        normalizedClass
      );
    });

    console.log(
      `Subjects available for Class ${normalizedClass}:`,
      filteredSubjects
    );

    setSubjects(filteredSubjects);
    setLoadingSubjects(false);
  }

  async function loadStudents(selectedClass: string) {
    setLoadingStudents(true);

    const { data, error } = await supabase
      .from('students')
      .select(
        'id, name, roll_number, class'
      )
      .eq('class', selectedClass)
      .order('roll_number');

    if (error) {
      console.error(
        'Error loading students:',
        error.message
      );

      alert(error.message);

      setStudents([]);
      setLoadingStudents(false);
      return;
    }

    setStudents(
      (data || []) as Student[]
    );

    setLoadingStudents(false);
  }

  function handleMarkChange(
    studentId: number,
    value: string
  ) {
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

    if (!subjectId) {
      alert('Please select a subject.');
      return;
    }

    if (!exam.trim()) {
      alert('Please enter the exam or activity name.');
      return;
    }

    if (
      !totalMarks ||
      Number(totalMarks) <= 0
    ) {
      alert('Please enter valid total marks.');
      return;
    }

    if (students.length === 0) {
      alert('No students found in this class.');
      return;
    }

    const selectedSubject =
      subjects.find(
        (subject) =>
          String(subject.id) ===
          subjectId
      );

    if (!selectedSubject) {
      alert(
        'Selected subject could not be found.'
      );
      return;
    }

    const total = Number(totalMarks);

    /*
     * Validate every student's marks.
     */
    for (const student of students) {
      const value =
        marks[student.id];

      if (
        value === undefined ||
        value === ''
      ) {
        alert(
          `Please enter marks for ${student.name}.`
        );
        return;
      }

      const obtained = Number(value);

      if (
        Number.isNaN(obtained) ||
        obtained < 0 ||
        obtained > total
      ) {
        alert(
          `Invalid marks for ${student.name}. Marks must be between 0 and ${total}.`
        );
        return;
      }
    }

    setSaving(true);

    const records = students.map(
      (student) => ({
        student_id: student.id,
        subject: selectedSubject.name,
        exam: exam.trim(),
        obtained_marks:
          Number(marks[student.id]),
        total_marks: total,
        class: className,
      })
    );

    const { error } =
      await supabase
        .from('marks')
        .insert(records);

    setSaving(false);

    if (error) {
      console.error(
        'Error saving marks:',
        error.message
      );

      alert(
        `Error saving marks: ${error.message}`
      );

      return;
    }

    alert(
      'Marks saved successfully.'
    );

    setMarks({});
    setExam('');
    setTotalMarks('');
  }

  const selectedSubjectName =
    subjects.find(
      (subject) =>
        String(subject.id) ===
        subjectId
    )?.name;

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 md:p-10">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">

        <div className="rounded-2xl bg-blue-100 p-4">
          <ClipboardCheck
            size={40}
            className="text-blue-600"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Teacher Marks Management
          </h1>

          <p className="mt-1 text-gray-600">
            Enter and save marks for your students.
          </p>
        </div>

      </div>

      {/* Examination Details */}
      <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg md:p-8">

        <h2 className="mb-6 text-xl font-bold text-gray-800">
          Examination / Activity Details
        </h2>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {/* Class */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Class
            </label>

            <select
              className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={className}
              onChange={(e) =>
                setClassName(
                  e.target.value
                )
              }
              disabled={loadingClasses}
            >
              <option value="">
                {loadingClasses
                  ? 'Loading classes...'
                  : 'Select Class'}
              </option>

              {classes.map(
                (classValue) => (
                  <option
                    key={classValue}
                    value={classValue}
                  >
                    Class {classValue}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Subject
            </label>

            <select
              className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={subjectId}
              onChange={(e) =>
                setSubjectId(
                  e.target.value
                )
              }
              disabled={
                !className ||
                loadingSubjects
              }
            >
              <option value="">
                {!className
                  ? 'Select class first'
                  : loadingSubjects
                  ? 'Loading subjects...'
                  : subjects.length === 0
                  ? 'No subjects found'
                  : 'Select Subject'}
              </option>

              {subjects.map(
                (subject) => (
                  <option
                    key={subject.id}
                    value={String(
                      subject.id
                    )}
                  >
                    {subject.name}
                  </option>
                )
              )}
            </select>

            {className &&
              !loadingSubjects &&
              subjects.length === 0 && (
                <p className="mt-2 text-sm text-red-600">
                  No subjects found for Class{' '}
                  {className}.
                </p>
              )}
          </div>

          {/* Exam / Activity */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Exam / Activity
            </label>

            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. Daily Activity"
              value={exam}
              onChange={(e) =>
                setExam(e.target.value)
              }
            />
          </div>

          {/* Total Marks */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Total Marks
            </label>

            <input
              type="number"
              min="1"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. 10"
              value={totalMarks}
              onChange={(e) =>
                setTotalMarks(
                  e.target.value
                )
              }
            />
          </div>

        </div>
      </div>

      {/* Students */}
      <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Students
            </h2>

            {className && (
              <p className="mt-1 text-sm text-gray-500">
                Class {className} —{' '}
                {students.length}{' '}
                student
                {students.length !==
                1
                  ? 's'
                  : ''}
              </p>
            )}
          </div>

          {selectedSubjectName && (
            <div className="hidden rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 md:block">
              {selectedSubjectName}
            </div>
          )}

        </div>

        {/* Loading Students */}
        {loadingStudents && (
          <div className="flex items-center justify-center py-16">

            <Loader2
              size={32}
              className="animate-spin text-blue-600"
            />

            <span className="ml-3 text-gray-600">
              Loading students...
            </span>

          </div>
        )}

        {/* No Class */}
        {!loadingStudents &&
          !className && (
            <div className="rounded-2xl bg-gray-50 p-12 text-center">

              <GraduationCap
                size={52}
                className="mx-auto text-gray-400"
              />

              <h3 className="mt-5 text-xl font-bold text-gray-700">
                Select a class
              </h3>

              <p className="mt-2 text-gray-500">
                Choose a class above to load its students.
              </p>

            </div>
          )}

        {/* No Students */}
        {!loadingStudents &&
          className &&
          students.length === 0 && (
            <div className="rounded-2xl bg-gray-50 p-12 text-center">

              <GraduationCap
                size={52}
                className="mx-auto text-gray-400"
              />

              <h3 className="mt-5 text-xl font-bold text-gray-700">
                No students found
              </h3>

              <p className="mt-2 text-gray-500">
                There are currently no students registered in Class{' '}
                {className}.
              </p>

            </div>
          )}

        {/* Students Table */}
        {!loadingStudents &&
          students.length > 0 && (
            <>
              <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                  <thead>
                    <tr className="bg-gray-100">

                      <th className="border p-4 text-left">
                        #
                      </th>

                      <th className="border p-4 text-left">
                        Roll No
                      </th>

                      <th className="border p-4 text-left">
                        Student Name
                      </th>

                      <th className="border p-4 text-left">
                        Obtained Marks
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {students.map(
                      (
                        student,
                        index
                      ) => (
                        <tr
                          key={
                            student.id
                          }
                          className="transition hover:bg-blue-50"
                        >

                          <td className="border p-4 text-gray-500">
                            {index + 1}
                          </td>

                          <td className="border p-4 font-medium">
                            {student.roll_number ||
                              '—'}
                          </td>

                          <td className="border p-4 font-semibold text-gray-800">
                            {student.name}
                          </td>

                          <td className="border p-4">

                            <input
                              type="number"
                              min="0"
                              max={
                                totalMarks
                                  ? Number(
                                      totalMarks
                                    )
                                  : undefined
                              }
                              className="w-36 rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              placeholder={
                                totalMarks
                                  ? `0-${totalMarks}`
                                  : 'Marks'
                              }
                              value={
                                marks[
                                  student.id
                                ] ||
                                ''
                              }
                              onChange={(
                                e
                              ) =>
                                handleMarkChange(
                                  student.id,
                                  e.target
                                    .value
                                )
                              }
                            />

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

              {/* Save */}
              <div className="mt-8 flex justify-end">

                <button
                  onClick={
                    saveMarks
                  }
                  disabled={
                    saving
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <Save
                        size={20}
                      />

                      Save Marks
                    </>
                  )}

                </button>

              </div>
            </>
          )}

      </div>
    </div>
  );
}
```
