'use client';

import { useState } from 'react';

export default function TeacherSettingPage() {
  const [schoolName, setSchoolName] = useState('EduOS School');
  const [teacherName, setTeacherName] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);

  function saveSettings() {
    alert('Settings saved successfully.');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8">Teacher Settings</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              School Name
            </label>

            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Teacher Name
            </label>

            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="notifications"
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />

            <label htmlFor="notifications">Enable Email Notifications</label>
          </div>

          <button
            onClick={saveSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
