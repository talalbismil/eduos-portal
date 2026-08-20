'use client';

import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type Student = {
  id: number;
  name: string;
  class: string | null;
  section: string | null;
  roll_number: string | null;
  status: string | null;
};

type Props = {
  students: Student[];
};

export default function StudentTable({ students }: Props) {
  const router = useRouter();

  async function deleteStudent(id: number) {
    const confirmDelete = confirm('Delete this student?');

    if (!confirmDelete) return;

    await supabase.from('students').delete().eq('id', id);

    router.refresh();
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border p-3">Name</th>
            <th className="border p-3">Class</th>
            <th className="border p-3">Section</th>
            <th className="border p-3">Roll No</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border p-3">{student.name}</td>

              <td className="border p-3">{student.class || '-'}</td>

              <td className="border p-3">{student.section || '-'}</td>

              <td className="border p-3">{student.roll_number || '-'}</td>

              <td className="border p-3">{student.status || 'Active'}</td>

              <td className="border p-3 space-x-2">
                <Link
                  href={`/teacher/students/${student.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteStudent(student.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
