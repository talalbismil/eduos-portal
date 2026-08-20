'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function TeacherResourcesPage() {
  const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const [resources, setResources] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setResources(data || []);
  }

  async function addResource() {
    if (!className || !subject || !title) {
      alert('Please fill required fields.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('resources').insert([
      {
        title,
        description,
        class: className,
        subject,
        file_url: fileUrl,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Resource added successfully.');

    setTitle('');
    setDescription('');
    setFileUrl('');
    setSubject('');
    setClassName('');

    loadResources();
  }

  async function deleteResource(id: number) {
    const confirmDelete = confirm('Delete this resource?');

    if (!confirmDelete) return;

    const { error } = await supabase.from('resources').delete().eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    loadResources();
  }
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Teacher Resources</h1>

      <div className="bg-white rounded-xl shadow p-8 mb-8">
        <h2 className="text-2xl font-bold mb-5">Add New Resource</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <select
            className="border p-3 rounded"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          >
            <option value="">Select Class</option>

            {classes.map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>

          <input
            className="border p-3 rounded"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            className="border p-3 rounded"
            placeholder="Resource Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <textarea
          className="border p-3 rounded w-full mt-4"
          rows={4}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full mt-4"
          placeholder="File URL"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />

        <button
          onClick={addResource}
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          {loading ? 'Saving...' : 'Add Resource'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-5">Resources List</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Title</th>

              <th className="border p-3">Subject</th>

              <th className="border p-3">Class</th>

              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td className="border p-3">{resource.title}</td>

                <td className="border p-3">{resource.subject}</td>

                <td className="border p-3">{resource.class}</td>

                <td className="border p-3">
                  <button
                    onClick={() => deleteResource(resource.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
