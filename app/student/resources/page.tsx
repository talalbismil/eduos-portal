'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function StudentResourcesPage() {
  const [student, setStudent] = useState<any>(null);

  const [resources, setResources] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert('Please login again.');
      setLoading(false);
      return;
    }

    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('email', user.email)
      .single();

    if (studentError) {
      alert(studentError.message);
      setLoading(false);
      return;
    }

    setStudent(studentData);

    const { data: resourceData, error: resourceError } = await supabase
      .from('resources')
      .select('*')
      .eq('class', studentData.class)
      .order('id', { ascending: false });

    if (resourceError) {
      alert(resourceError.message);
      setLoading(false);
      return;
    }

    setResources(resourceData || []);

    setLoading(false);
  }

  if (loading) {
    return <div className="p-10">Loading resources...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Study Resources</h1>

      {student && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold">Student Information</h2>

          <p>Name: {student.name}</p>

          <p>Class: {student.class}</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-3">{resource.title}</h2>

              <p className="text-gray-600 mb-3">Subject: {resource.subject}</p>

              <p className="mb-4">{resource.description}</p>

              {resource.file_url && (
                <a
                  href={resource.file_url}
                  target="_blank"
                  className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  Open File
                </a>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-xl shadow">
            No resources available for your class.
          </div>
        )}
      </div>
    </div>
  );
}
