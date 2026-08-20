'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!email || !password) {
      alert('Enter email and password');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
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

    // Get user role from users table
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

    alert('Login successful');

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
        <h1 className="text-3xl font-bold mb-6">EduOS Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-6 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
