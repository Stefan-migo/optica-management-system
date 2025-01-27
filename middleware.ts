// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('Middleware is being executed');
  console.log('Request URL:', req.url);
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log('Session details:', session ? 'Session exists' : 'No session');

  if (!session) {
    console.log('No session found, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }
  console.log('Session found in middleware:', session);
  return res;
}

export const config = {
  matcher: ['/(admin)/:path*'],
};
