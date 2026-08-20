'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [registrationNo, setRegistrationNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!registrationNo.trim() || !password) {
      alert('Enter registration number and password');
      return;
    }

    setLoading(true);

    /*
     * Students use their registration number.
     *
     * Example:
     * EDU-OS-004
     *
     * Internally this becomes:
     * edu-os-004@eduos.local
     *
     * This is the email identifier used by Supabase Auth.
     */
    const registration = registrationNo.trim().toUpperCase();

    const authEmail = `${registration.toLowerCase()}@eduos.local`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      alert('User not found');
      setLoading(false);
      return;
    }

    /*
     * Get the user's role.
     */
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('email', data.user.email)
      .single();

    if (profileError || !profile) {
      alert('User profile not found');
      setLoading(false);
      return;
    }

    const role = profile.role.toLowerCase();

    if (role === 'admin') {
      window.location.href = '/admin';
    } else if (role === 'teacher') {
      window.location.href = '/teacher';
    } else if (role === 'student') {
      window.location.href = '/student';
    } else {
      alert('Invalid user role');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[400px] bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          EduOS Login
        </h1>

        <input
          type="text"
          placeholder="Registration Number"
          className="w-full border p-3 mb-4 rounded"
          value={registrationNo}
          onChange={(e) => setRegistrationNo(e.target.value)}
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-6 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {loading ? 'Please wait...' : 'Login'}
        </button>

      </div>
    </div>
  );
}
