'use client'

import { useTransition } from 'react'
import { logout } from '@/app/login/actions'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(async () => {
      await logout()
    })
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      style={{
        background: 'none',
        border: 'none',
        cursor: isPending ? 'default' : 'pointer',
        padding: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: '10px',
        fontWeight: 400,
        color: isPending ? 'rgba(250,247,242,0.18)' : 'rgba(250,247,242,0.28)',
        letterSpacing: '0.2px',
        transition: 'color 150ms ease',
      }}
      onMouseEnter={(e) => {
        if (!isPending) (e.currentTarget as HTMLButtonElement).style.color = '#D4784E'
      }}
      onMouseLeave={(e) => {
        if (!isPending) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(250,247,242,0.28)'
      }}
    >
      {isPending ? 'Saindo…' : 'Sair'}
    </button>
  )
}
