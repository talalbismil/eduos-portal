'use client';

import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <button
      onClick={logout}
      className="
        w-full
        mt-8
        px-3
        py-2
        rounded-lg
        text-sm
        text-red-600
        hover:bg-red-50
        transition
      "
    >
      Logout
    </button>
  );
}
