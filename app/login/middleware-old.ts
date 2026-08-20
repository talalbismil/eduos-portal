import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedRoutes =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/teacher') ||
    pathname.startsWith('/student');

  // User not logged in
  if (!user && protectedRoutes) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (user) {
    const { data: profile, error } = await supabase
      .from('users')
      .select('role')
      .eq('email', user.email)
      .maybeSingle();

    console.log('AUTH USER:', user.email);
    console.log('USER PROFILE:', profile);
    console.log('PROFILE ERROR:', error);

    // Auth user exists but no users table record
    if (!profile) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const role = profile.role?.toLowerCase();

    // Admin protection
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Teacher protection
    if (pathname.startsWith('/teacher') && role !== 'teacher') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Student protection
    if (pathname.startsWith('/student') && role !== 'student') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/teacher/:path*', '/student/:path*'],
};
