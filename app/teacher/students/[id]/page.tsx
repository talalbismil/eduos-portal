import StudentTable from '@/components/teacher/StudentTable';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function Page() {
  const { data: students } = await supabase
    .from('students')
    .select('*')
    .order('id', { ascending: true });

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Students</h1>

        <Link
          href="/teacher/students/new"
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Add Student
        </Link>
      </div>

      <StudentTable students={students || []} />
    </div>
  );
}
