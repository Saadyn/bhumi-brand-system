import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANTE: getUser() deve ser chamado para refresh do token — não getSession()
  // Timeout de 3s para evitar MIDDLEWARE_INVOCATION_TIMEOUT no Vercel
  const timeout = new Promise<{ data: { user: null } }>((resolve) =>
    setTimeout(() => resolve({ data: { user: null } }), 3000)
  )
  const { data: { user } } = await Promise.race([
    supabase.auth.getUser(),
    timeout,
  ])

  return { supabase, supabaseResponse, user }
}
