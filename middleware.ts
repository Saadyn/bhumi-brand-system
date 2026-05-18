import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse, user } = await updateSession(request)
  const { pathname } = request.nextUrl

  // Callback route — always allow through
  if (pathname === '/api/auth/callback') {
    return supabaseResponse
  }

  // Login route
  if (pathname === '/login') {
    if (user) {
      // Already authenticated — redirect to home
      return NextResponse.redirect(new URL('/', request.url))
    }
    return supabaseResponse
  }

  // All other routes require authentication
  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf)$).*)',
  ],
}
