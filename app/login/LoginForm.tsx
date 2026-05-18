'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { loginWithEmail } from './actions'

const initialState = { error: null as string | null }

function SubmitButton() {
  const { pending } = useFormStatus()
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="submit"
      disabled={pending}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '52px',
        background: pending ? '#222' : hovered ? '#591B07' : '#2A2A2A',
        border: 'none',
        borderRadius: '10px',
        color: pending ? 'rgba(255,255,255,0.4)' : '#FFFFFF',
        fontFamily: 'var(--font-sans)',
        fontSize: '15px',
        fontWeight: 500,
        cursor: pending ? 'not-allowed' : 'pointer',
        transition: 'background 200ms ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '8px',
      }}
    >
      {pending ? 'Entrando…' : (
        <>
          Entrar
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </>
      )}
    </button>
  )
}

export function LoginForm() {
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/'
  const [state, formAction] = useActionState(loginWithEmail, initialState)

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input type="hidden" name="next" value={next} />

      <input
        type="email"
        name="email"
        placeholder="seu@email.com"
        required
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#D55B28'
          e.currentTarget.style.background = '#252525'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#3A3A3A'
          e.currentTarget.style.background = '#1E1E1E'
        }}
        style={{
          width: '100%',
          height: '52px',
          background: '#1E1E1E',
          border: '1px solid #3A3A3A',
          borderRadius: '10px',
          padding: '0 16px',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: '#FFFFFF',
          outline: 'none',
          transition: 'border-color 200ms ease, background 200ms ease',
          boxSizing: 'border-box',
        }}
      />

      <input
        type="password"
        name="password"
        placeholder="••••••••"
        required
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#D55B28'
          e.currentTarget.style.background = '#252525'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#3A3A3A'
          e.currentTarget.style.background = '#1E1E1E'
        }}
        style={{
          width: '100%',
          height: '52px',
          background: '#1E1E1E',
          border: '1px solid #3A3A3A',
          borderRadius: '10px',
          padding: '0 16px',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: '#FFFFFF',
          outline: 'none',
          transition: 'border-color 200ms ease, background 200ms ease',
          boxSizing: 'border-box',
        }}
      />

      {state.error && (
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          color: '#E05555',
          margin: '0',
        }} role="alert">
          {state.error}
        </p>
      )}

      <SubmitButton />

      <div style={{ textAlign: 'center', marginTop: '4px' }}>
        <a
          href="/update-password"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: '#5A5A5A',
            textDecoration: 'none',
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#D55B28' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#5A5A5A' }}
        >
          Esqueci minha senha
        </a>
      </div>
    </form>
  )
}
