'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';

export default function TeacherHomeworkPage() {
  const [teacherEmail, setTeacherEmail] = useState('');

  const [classes] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ]);

  const [className, setClassName] = useState('');
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subject, setSubject] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const [homework, setHomework] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTeacher();
  }, []);

  async function getTeacher() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      console.log('No active session');
      return;
    }

    const user = session.user;
    setTeacherEmail(user.email || '');

    loadHomework(user.email || '');
  }

  async function loadSubjects(selectedClass: string) {
    setClassName(selectedClass);
    setSubject('');

    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('class', selectedClass);

    if (error) {
      alert(error.message);
      return;
    }

    setSubjects(data || []);
  }

  async function loadHomework(email: string) {
    const { data, error } = await supabase
      .from('homework')
      .select('*')
      .eq('teacher_email', email)
      .order('id', { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setHomework(data || []);
  }

  async function addHomework() {
    if (!className || !subject || !title || !description) {
      alert('Please fill required fields.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('homework').insert([
      {
        title,
        description,
        class: className,
        subject,
        file_url: fileUrl,
        teacher_email: teacherEmail,
        due_date: dueDate,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Homework added successfully.');

    setTitle('');
    setDescription('');
    setFileUrl('');
    setDueDate('');

    loadHomework(teacherEmail);
  }
  async function deleteHomework(id: number) {
    const confirmDelete = confirm('Delete this homework?');

    if (!confirmDelete) return;

    const { error } = await supabase.from('homework').delete().eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    loadHomework(teacherEmail);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">Teacher Homework</h1>

      <div className="bg-white rounded-xl shadow p-8 mb-8">
        <h2 className="text-2xl font-bold mb-5">Create Homework</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="border p-3 rounded"
            value={className}
            onChange={(e) => loadSubjects(e.target.value)}
          >
            <option value="">Select Class</option>

            {classes.map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>

          <select
            className="border p-3 rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>

            {subjects.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            className="border p-3 rounded"
            placeholder="Homework Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            className="border p-3 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <textarea
          className="border p-3 rounded w-full mt-4"
          rows={5}
          placeholder="Homework Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full mt-4"
          placeholder="File URL (optional)"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />

        <button
          onClick={addHomework}
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          {loading ? 'Saving...' : 'Add Homework'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-5">My Homework</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Title</th>

              <th className="border p-3">Subject</th>

              <th className="border p-3">Class</th>

              <th className="border p-3">Due Date</th>

              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {homework.map((h) => (
              <tr key={h.id}>
                <td className="border p-3">{h.title}</td>

                <td className="border p-3">{h.subject}</td>

                <td className="border p-3">{h.class}</td>

                <td className="border p-3">{h.due_date}</td>

                <td className="border p-3">
                  <button
                    onClick={() => deleteHomework(h.id)}
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
