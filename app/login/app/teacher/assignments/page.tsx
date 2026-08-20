'use client';

import { useState } from 'react';

export default function AssignmentsPage() {
  const [student, setStudent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Assignments</h1>

      <div className="max-w-xl space-y-5">
        <div>
          <label className="block mb-2 font-semibold">Select Student</label>

          <select
            className="border p-3 w-full rounded"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          >
            <option value="">Choose student</option>

            <option value="Ali">Ali</option>

            <option value="Ahmed">Ahmed</option>

            <option value="Sara">Sara</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Assignment Title</label>

          <input
            className="border p-3 w-full rounded"
            placeholder="Enter assignment title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Description</label>

          <textarea
            className="border p-3 w-full rounded"
            placeholder="Enter assignment details"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Due Date</label>

          <input
            type="date"
            className="border p-3 w-full rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button className="bg-black text-white px-6 py-3 rounded">
          Add Assignment
        </button>
      </div>

      <hr className="my-10" />

      <h2 className="text-2xl font-bold">Assignment List</h2>

      <p className="mt-3 text-gray-600">No assignments yet.</p>
    </div>
  );
}
