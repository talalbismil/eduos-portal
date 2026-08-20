'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Save,
  ClipboardCheck,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type Student = {
  id: number;
  name: string;
  roll_number?: string | number | null;
  class?: string | null;
};

type Subject = {
  id: number;
  name: string;
  class: string;
  teacher?: string | null;
};

type MarkRecord = {
  id: number;
  student_id: number;
  subject: string;
  exam: string;
  obtained_marks: number;
  total_marks: number;
  class: string | null;
};

export default function TeacherMarksPage() {
  const [className, setClassName] = useState('9');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subject, setSubject] = useState('');

  const [exam, setExam] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<Record<number, string>>({});

  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  /*
   * Load Class 9 subjects
   */
  async function loadSubjects() {
    setLoadingSubjects(true);
    setSuccess('');

    const { data, error } = await supabase
      .from('subjects')
      .select('id, name, class, teacher')
      .eq('class', className)
      .order('id');

    if (error) {
      alert(`Error loading subjects: ${error.message}`);
      setSubjects([]);
      setLoadingSubjects(false);
      return;
    }

    setSubjects((data as Subject[]) || []);
    setLoadingSubjects(false);
  }

  /*
   * Load students who are actually assigned
   * to the selected subject.
   */
  async function loadStudents() {
    setSuccess('');
    setMarks({});

    if (!className || !subject) {
      setStudents([]);
      return;
    }

    setLoadingStudents(true);

    /*
     * Find the subject ID from the selected subject name.
     */
    const selectedSubject = subjects.find(
      (item) => item.name === subject
    );

    if (!selectedSubject) {
      setStudents([]);
      setLoadingStudents(false);
      return;
    }

    /*
     * Get student IDs assigned to this subject.
     */
    const {
      data: assignments,
      error: assignmentError,
    } = await supabase
      .from('student_subjects')
      .select('student_id')
      .eq('subject_id', selectedSubject.id);

    if (assignmentError) {
      alert(
        `Error loading subject assignments: ${assignmentError.message}`
      );
      setStudents([]);
      setLoadingStudents(false);
      return;
    }

    if (!assignments || assignments.length === 0) {
      setStudents([]);
      setLoadingStudents(false);
      return;
    }

    const studentIds = assignments
      .map((item) => item.student_id)
      .filter(
        (id): id is number =>
          id !== null && id !== undefined
      );

    if (studentIds.length === 0) {
      setStudents([]);
      setLoadingStudents(false);
      return;
    }

    /*
     * Get only students from the selected class.
     */
    const {
      data: studentData,
      error: studentError,
    } = await supabase
      .from('students')
      .select('id, name, roll_number, class')
      .in('id', studentIds)
      .eq('class', className)
      .order('roll_number');

    if (studentError) {
      alert(
        `Error loading students: ${studentError.message}`
      );
      setStudents([]);
      setLoadingStudents(false);
      return;
    }

    setStudents((studentData as Student[]) || []);

    setLoadingStudents(false);
  }

  /*
   * Load existing marks when:
   *
   * subject + exam + class
   *
   * are selected.
   */
  async function loadExistingMarks() {
    if (!subject || !exam || !className) {
      return;
    }

    const {
      data,
      error,
    } = await supabase
      .from('marks')
      .select(
        'id, student_id, subject, exam, obtained_marks, total_marks, class'
      )
      .eq('subject', subject)
      .eq('exam', exam)
      .eq('class', className);

    if (error) {
      console.error(
        'Error loading existing marks:',
        error.message
      );
      return;
    }

    const existingMarks: Record<number, string> = {};

    (data as MarkRecord[] | null)?.forEach((record) => {
      existingMarks[record.student_id] =
        String(record.obtained_marks);

      /*
       * Automatically use the existing total marks
       * if the teacher has not entered one.
       */
      if (!totalMarks && record.total_marks) {
        setTotalMarks(String(record.total_marks));
      }
    });

    setMarks(existingMarks);
  }

  /*
   * Load subjects when class changes.
   */
  useEffect(() => {
    loadSubjects();
  }, [className]);

  /*
   * Load students whenever subject changes.
   */
  useEffect(() => {
    if (subject) {
      loadStudents();
    } else {
      setStudents([]);
      setMarks({});
    }
  }, [subject, className, subjects]);

  /*
   * Load existing marks when exam is selected.
   */
  useEffect(() => {
    if (subject && exam && students.length > 0) {
      loadExistingMarks();
    }
  }, [subject, exam, className, students]);

  /*
   * Update one student's mark.
   */
  function updateMark(
    studentId: number,
    value: string
  ) {
    setMarks((previous) => ({
      ...previous,
      [studentId]: value,
    }));
  }

  /*
   * Save marks.
   *
   * If a mark already exists for:
   *
   * student + subject + exam + class
   *
   * we UPDATE it.
   *
   * Otherwise we INSERT it.
   */
  async function saveMarks() {
    setSuccess('');

    if (!className) {
      alert('Please select a class.');
      return;
    }

    if (!subject) {
      alert('Please select a subject.');
      return;
    }

    if (!exam.trim()) {
      alert('Please enter an exam name.');
      return;
    }

    const total = Number(totalMarks);

    if (!Number.isFinite(total) || total <= 0) {
      alert('Please enter a valid total marks value.');
      return;
    }

    if (students.length === 0) {
      alert(
        'No students are assigned to this subject.'
      );
      return;
    }

    /*
     * Validate every entered mark.
     */
    for (const student of students) {
      const value = marks[student.id];

      if (
        value === undefined ||
        value === ''
      ) {
        continue;
      }

      const obtained = Number(value);

      if (
        !Number.isFinite(obtained) ||
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

    try {
      /*
       * Process each student individually.
       *
       * This avoids requiring a database unique constraint.
       */
      for (const student of students) {
        const value = marks[student.id];

        /*
         * Don't create a mark if teacher left it blank.
         */
        if (
          value === undefined ||
          value === ''
        ) {
          continue;
        }

        const obtained = Number(value);

        /*
         * Check whether this mark already exists.
         */
        const {
          data: existing,
          error: existingError,
        } = await supabase
          .from('marks')
          .select('id')
          .eq('student_id', student.id)
          .eq('subject', subject)
          .eq('exam', exam.trim())
          .eq('class', className)
          .maybeSingle();

        if (existingError) {
          throw new Error(
            `Could not check marks for ${student.name}: ${existingError.message}`
          );
        }

        /*
         * UPDATE existing record.
         */
        if (existing) {
          const { error: updateError } =
            await supabase
              .from('marks')
              .update({
                obtained_marks: obtained,
                total_marks: total,
                class: className,
                subject,
                exam: exam.trim(),
              })
              .eq('id', existing.id);

          if (updateError) {
            throw new Error(
              `Could not update marks for ${student.name}: ${updateError.message}`
            );
          }
        }

        /*
         * INSERT new record.
         */
        else {
          const { error: insertError } =
            await supabase
              .from('marks')
              .insert({
                student_id: student.id,
                subject,
                exam: exam.trim(),
                obtained_marks: obtained,
                total_marks: total,
                class: className,
              });

          if (insertError) {
            throw new Error(
              `Could not save marks for ${student.name}: ${insertError.message}`
            );
          }
        }
      }

      setSuccess(
        'Marks saved successfully.'
      );

      /*
       * Reload marks so the screen reflects
       * the saved database values.
       */
      await loadExistingMarks();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while saving marks.'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">

        <div className="rounded-2xl bg-blue-100 p-3">
          <ClipboardCheck
            size={40}
            className="text-blue-600"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Teacher Marks
          </h1>

          <p className="mt-1 text-gray-600">
            Enter and manage student examination marks.
          </p>
        </div>

      </div>

      {/* Selection panel */}
      <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg md:p-8">

        <h2 className="mb-6 text-xl font-bold text-gray-900">
          Examination Details
        </h2>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {/* Class */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Class
            </label>

            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={className}
              onChange={(e) => {
                setClassName(e.target.value);
                setSubject('');
                setStudents([]);
                setMarks({});
              }}
            >
              <option value="9">
                Class 9
              </option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Subject
            </label>

            <select
              className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setMarks({});
                setSuccess('');
              }}
              disabled={loadingSubjects}
            >
              <option value="">
                {loadingSubjects
                  ? 'Loading subjects...'
                  : 'Select Subject'}
              </option>

              {subjects.map((item) => (
                <option
                  key={item.id}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Exam */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Exam
            </label>

            <input
              type="text"
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. Mid Term"
              value={exam}
              onChange={(e) => {
                setExam(e.target.value);
                setSuccess('');
              }}
            />
          </div>

          {/* Total */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Total Marks
            </label>

            <input
              type="number"
              min="1"
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. 50"
              value={totalMarks}
              onChange={(e) => {
                setTotalMarks(e.target.value);
                setSuccess('');
              }}
            />
          </div>

        </div>

        {/* Status */}
        <div className="mt-6 flex flex-wrap items-center gap-3">

          {subject && (
            <button
              type="button"
              onClick={loadStudents}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-200"
            >
              <RefreshCw size={18} />
              Refresh Students
            </button>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-xl bg-green-50 px-5 py-3 font-semibold text-green-700">
              <CheckCircle2 size={20} />
              {success}
            </div>
          )}

        </div>

      </div>

      {/* Students */}
      <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">

        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Student Marks
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Only students assigned to the selected subject are shown.
            </p>
          </div>

          {students.length > 0 && (
            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {students.length}{' '}
              {students.length === 1
                ? 'Student'
                : 'Students'}
            </div>
          )}

        </div>

        {/* Loading */}
        {loadingStudents && (
          <div className="py-16 text-center">

            <RefreshCw
              size={32}
              className="mx-auto animate-spin text-blue-600"
            />

            <p className="mt-4 font-medium text-gray-600">
              Loading students...
            </p>

          </div>
        )}

        {/* No subject selected */}
        {!loadingStudents && !subject && (
          <div className="rounded-2xl bg-gray-50 p-12 text-center">

            <GraduationCap
              size={52}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 text-xl font-bold text-gray-800">
              Select a Subject
            </h3>

            <p className="mt-2 text-gray-500">
              Choose a subject above to load its students.
            </p>

          </div>
        )}

        {/* No students */}
        {!loadingStudents &&
          subject &&
          students.length === 0 && (
            <div className="rounded-2xl bg-yellow-50 p-12 text-center">

              <h3 className="text-xl font-bold text-yellow-800">
                No Students Assigned
              </h3>

              <p className="mt-2 text-yellow-700">
                No students from this class are assigned to{' '}
                {subject}.
              </p>

            </div>
          )}

        {/* Student table */}
        {!loadingStudents &&
          students.length > 0 && (
            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>
                  <tr className="bg-gray-50">

                    <th className="border-b p-4 text-left text-sm font-bold text-gray-700">
                      #
                    </th>

                    <th className="border-b p-4 text-left text-sm font-bold text-gray-700">
                      Roll No
                    </th>

                    <th className="border-b p-4 text-left text-sm font-bold text-gray-700">
                      Student Name
                    </th>

                    <th className="border-b p-4 text-left text-sm font-bold text-gray-700">
                      Obtained Marks
                    </th>

                    <th className="border-b p-4 text-left text-sm font-bold text-gray-700">
                      Total
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {students.map(
                    (student, index) => (
                      <tr
                        key={student.id}
                        className="transition hover:bg-blue-50"
                      >

                        <td className="border-b p-4 font-medium text-gray-500">
                          {index + 1}
                        </td>

                        <td className="border-b p-4 font-medium text-gray-700">
                          {student.roll_number ||
                            '—'}
                        </td>

                        <td className="border-b p-4">

                          <div className="font-semibold text-gray-900">
                            {student.name}
                          </div>

                        </td>

                        <td className="border-b p-4">

                          <input
                            type="number"
                            min="0"
                            max={
                              totalMarks ||
                              undefined
                            }
                            step="1"
                            className="w-32 rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Marks"
                            value={
                              marks[
                                student.id
                              ] ?? ''
                            }
                            onChange={(e) =>
                              updateMark(
                                student.id,
                                e.target.value
                              )
                            }
                          />

                        </td>

                        <td className="border-b p-4 font-semibold text-gray-600">
                          {totalMarks || '—'}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        {/* Save */}
        {!loadingStudents &&
          students.length > 0 && (
            <div className="mt-8 flex justify-end">

              <button
                type="button"
                onClick={saveMarks}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {saving ? (
                  <>
                    <RefreshCw
                      size={20}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save Marks
                  </>
                )}

              </button>

            </div>
          )}

      </div>

    </div>
  );
}
