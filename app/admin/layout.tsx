import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { UserProvider } from '@/context/UserContext'
import { LogoutButton } from '@/components/auth/LogoutButton'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireRole('admin')

  return (
    <UserProvider user={user}>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-canvas)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Top bar */}
        <header
          className="sidebar-dark"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            height: '56px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
          }}
        >
          {/* Left — wordmark + breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 400,
                letterSpacing: '-0.3px', color: 'rgba(250,247,242,0.9)',
              }}>
                bhumi
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 500,
                letterSpacing: '2.5px', textTransform: 'uppercase', color: '#D4784E',
              }}>
                Brand System
              </span>
            </Link>

            <span style={{ color: 'rgba(250,247,242,0.18)', fontSize: '14px' }}>/</span>

            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500,
              letterSpacing: '0.5px', color: 'rgba(250,247,242,0.55)',
            }}>
              Painel Admin
            </span>
          </div>

          {/* Right — nav links + logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link
              href="/admin/usuarios"
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 400,
                color: 'rgba(250,247,242,0.45)', textDecoration: 'none',
                letterSpacing: '0.2px',
              }}
            >
              Usuários
            </Link>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 400,
                color: 'rgba(250,247,242,0.35)', textDecoration: 'none',
                letterSpacing: '0.2px',
              }}
            >
              ← Brand System
            </Link>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '20px' }}>
              <LogoutButton />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '40px 32px' }}>
          {children}
        </main>
      </div>
    </UserProvider>
  )
}
