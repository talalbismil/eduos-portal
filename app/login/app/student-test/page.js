import { supabase } from '@/lib/supabase';

export default async function StudentDashboard() {
  const { data: students, error } = await supabase
    .from('students')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div>
      <h1>EduOS Student Dashboard</h1>

      {students.map((student) => (
        <div key={student.id}>
          <h2>{student.name || 'No Name'}</h2>

          <p>Email: {student.email || 'Not Provided'}</p>

          <p>Class: {student.class || 'Not Assigned'}</p>

          <p>Roll Number: {student.roll_number || 'Not Assigned'}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}
