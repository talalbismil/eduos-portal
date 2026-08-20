'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!identifier.trim() || !password.trim()) {
      alert('Enter your registration number/email and password');
      return;
    }

    setLoading(true);

    /*
     * Students can use a registration number.
     * Teachers/Admins can continue using their existing email.
     *
     * Example:
     * EDU-2026-001
     * becomes
     * EDU-2026-001@eduos.local
     *
     * Existing email addresses are left unchanged.
     */
    let loginEmail = identifier.trim();

    if (!loginEmail.includes('@')) {
      loginEmail = `${loginEmail.toLowerCase()}@eduos.local`;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: password.trim(),
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
     * Get the user's role from the users table.
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
        <h1 className="text-3xl font-bold mb-2">EduOS Login</h1>

        <p className="text-gray-500 mb-6">
          Students can use their registration number.
        </p>

        <input
          type="text"
          placeholder="Registration Number or Email"
          className="w-full border p-3 mb-4 rounded"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Please wait...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
