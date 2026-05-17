import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { UserTable } from '@/components/admin/UserTable'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usuários · Admin',
}

interface UserRow {
  id: string
  name: string
  role: 'admin' | 'staff' | 'viewer'
  created_at: string
  email: string
}

export default async function UsuariosPage() {
  const currentUser = await requireRole('admin')
  const supabase = createAdminClient()

  const [profilesResult, usersResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, name, role, created_at')
      .order('created_at', { ascending: true }),
    supabase.auth.admin.listUsers(),
  ])

  const profiles = profilesResult.data ?? []
  const authUsers = usersResult.data?.users ?? []

  const usersWithEmail: UserRow[] = profiles.map((profile) => ({
    id: profile.id as string,
    name: profile.name as string,
    role: profile.role as 'admin' | 'staff' | 'viewer',
    created_at: profile.created_at as string,
    email: authUsers.find((u) => u.id === profile.id)?.email ?? '',
  }))

  return (
    <div style={{ maxWidth: '900px' }}>
      {/* Page header */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        marginBottom: '32px',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 500,
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--color-muted-soft)', marginBottom: '8px',
          }}>
            Painel Admin
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 400,
            letterSpacing: '-0.5px', lineHeight: 1.15,
            color: 'var(--color-ink)', margin: 0,
          }}>
            Usuários
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400,
            color: 'var(--color-muted)', marginTop: '8px',
          }}>
            {usersWithEmail.length} {usersWithEmail.length === 1 ? 'usuário registrado' : 'usuários registrados'}
          </p>
        </div>

        <Link
          href="/admin/usuarios/convidar"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '9px 18px',
            background: 'var(--color-primary)', color: 'var(--color-canvas)',
            fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
            textDecoration: 'none', borderRadius: 'var(--radius-sm)',
            transition: 'background 150ms ease',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1.5V11.5M1.5 6.5H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Convidar usuário
        </Link>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--color-hairline)', marginBottom: '24px' }} />

      {/* Table */}
      <UserTable users={usersWithEmail} currentUserId={currentUser.id} />
    </div>
  )
}
