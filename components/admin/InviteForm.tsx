'use client'

import { useState, useTransition } from 'react'
import { inviteUser } from '@/app/admin/usuarios/actions'
import type { UserRole } from '@/types/auth'

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '10px 12px',
  fontFamily: 'var(--font-sans)',
  fontSize: '14px',
  fontWeight: 400,
  color: 'var(--color-ink)',
  background: 'var(--color-canvas)',
  border: '1px solid var(--color-hairline)',
  borderRadius: 'var(--radius-sm)',
  outline: 'none',
  transition: 'border-color 150ms ease',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  marginBottom: '6px',
}

export function InviteForm() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('viewer')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('idle')
    setErrorMessage('')

    startTransition(async () => {
      const result = await inviteUser(email.trim(), role)
      if (result.error) {
        setStatus('error')
        setErrorMessage(result.error)
      } else {
        setStatus('success')
        setEmail('')
        setRole('viewer')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '480px' }}>
      {/* Email */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="invite-email" style={labelStyle}>
          Email
        </label>
        <input
          id="invite-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nome@exemplo.com"
          disabled={isPending}
          style={{
            ...inputStyle,
            opacity: isPending ? 0.6 : 1,
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-hairline)' }}
        />
      </div>

      {/* Role */}
      <div style={{ marginBottom: '28px' }}>
        <label htmlFor="invite-role" style={labelStyle}>
          Perfil de acesso
        </label>
        <select
          id="invite-role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          disabled={isPending}
          style={{
            ...inputStyle,
            cursor: isPending ? 'not-allowed' : 'pointer',
            opacity: isPending ? 0.6 : 1,
          }}
        >
          <option value="viewer">Viewer — acesso de leitura</option>
          <option value="staff">Staff — colaborador interno</option>
          <option value="admin">Admin — acesso total</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending || !email.trim()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: isPending ? 'var(--color-primary-active)' : 'var(--color-primary)',
          color: 'var(--color-canvas)',
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          fontWeight: 500,
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: isPending || !email.trim() ? 'not-allowed' : 'pointer',
          opacity: !email.trim() ? 0.5 : 1,
          transition: 'background 150ms ease, opacity 150ms ease',
        }}
      >
        {isPending ? (
          <>
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              style={{ animation: 'spin 1s linear infinite' }}
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" strokeLinecap="round"/>
            </svg>
            Enviando…
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M11.5 1.5L5.5 7.5M11.5 1.5H7.5M11.5 1.5V5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.5 2.5H2.5C1.95 2.5 1.5 2.95 1.5 3.5V10.5C1.5 11.05 1.95 11.5 2.5 11.5H9.5C10.05 11.5 10.5 11.05 10.5 10.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Enviar convite
          </>
        )}
      </button>

      {/* Feedback */}
      {status === 'success' && (
        <div style={{
          marginTop: '16px',
          padding: '12px 14px',
          background: 'rgba(92,140,90,0.1)',
          border: '1px solid rgba(92,140,90,0.25)',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          color: 'var(--color-success)',
        }}>
          Convite enviado com sucesso.
        </div>
      )}

      {status === 'error' && (
        <div style={{
          marginTop: '16px',
          padding: '12px 14px',
          background: 'rgba(139,44,44,0.08)',
          border: '1px solid rgba(139,44,44,0.2)',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          color: 'var(--color-error)',
        }}>
          {errorMessage}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  )
}
