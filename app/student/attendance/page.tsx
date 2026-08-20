'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CalendarCheck, CheckCircle, XCircle } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function StudentAttendancePage() {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  async function loadAttendance() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('Please login again');
      return;
    }

    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!student) {
      alert('Student record not found');
      return;
    }

    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', student.id)
      .order('date', {
        ascending: false,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setAttendance(data || []);

    setLoading(false);
  }

  if (loading) {
    return <div className="p-10">Loading attendance...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex items-center gap-3 mb-8">
        <CalendarCheck size={40} className="text-blue-600" />

        <h1 className="text-4xl font-bold">My Attendance</h1>
      </div>

      <div className="bg-white rounded-xl shadow p-8">
        {attendance.length === 0 ? (
          <p className="text-gray-600">No attendance record found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3">Date</th>

                <th className="border p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item) => (
                <tr key={item.id}>
                  <td className="border p-3">{item.date}</td>

                  <td className="border p-3">
                    {item.status === 'Present' ? (
                      <span className="flex items-center gap-2 text-green-600">
                        <CheckCircle size={20} />
                        Present
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-600">
                        <XCircle size={20} />
                        Absent
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
