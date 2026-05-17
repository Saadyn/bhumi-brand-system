import Link from 'next/link'
import { requireRole } from '@/lib/auth'
import { InviteForm } from '@/components/admin/InviteForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convidar Usuário · Admin',
}

export default async function ConvidarPage() {
  await requireRole('admin')

  return (
    <div style={{ maxWidth: '600px' }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '28px' }}>
        <Link
          href="/admin/usuarios"
          style={{
            fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 400,
            color: 'var(--color-muted)', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Usuários
        </Link>
      </nav>

      {/* Page header */}
      <div style={{ marginBottom: '32px' }}>
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
          Convidar usuário
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400,
          color: 'var(--color-muted)', marginTop: '8px',
        }}>
          O convite será enviado por email. O usuário receberá um link para definir sua senha e acessar o sistema.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--color-hairline)', marginBottom: '32px' }} />

      {/* Form */}
      <div style={{
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 28px 32px',
      }}>
        <InviteForm />
      </div>
    </div>
  )
}
