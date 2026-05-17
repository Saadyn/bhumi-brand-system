'use client'

import { useUser } from '@/context/UserContext'
import { LogoutButton } from '@/components/auth/LogoutButton'
import type { UserRole } from '@/types/auth'

const roleLabel: Record<UserRole, string> = {
  admin:  'Admin',
  staff:  'Staff',
  viewer: 'Viewer',
}

const roleColor: Record<UserRole, string> = {
  admin:  '#D4784E',               /* areia — primary accent */
  staff:  '#C8912A',               /* warning/amber — secondary accent */
  viewer: 'rgba(250,247,242,0.35)',/* muted neutral */
}

const avatarBg: Record<UserRole, string> = {
  admin:  'rgba(184,92,56,0.2)',
  staff:  'rgba(200,145,42,0.18)',
  viewer: 'rgba(250,247,242,0.08)',
}

export function UserMenu() {
  const user = useUser()
  const { name, role } = user.profile
  const initial = name ? name.charAt(0).toUpperCase() : '?'
  const label = roleLabel[role]
  const color = roleColor[role]
  const bg    = avatarBg[role]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Avatar */}
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 500,
          color,
        }}>
          {initial}
        </div>

        {/* Name + role */}
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 400,
            color: 'rgba(250,247,242,0.55)',
            margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {name}
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '10px',
            color: 'rgba(250,247,242,0.28)', margin: 0,
          }}>
            <span style={{ color }}>{label}</span>
            {user.email && (
              <> · <span style={{
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                display: 'inline-block', maxWidth: '120px', verticalAlign: 'bottom',
              }}>{user.email}</span></>
            )}
          </p>
        </div>

        {/* Logout */}
        <LogoutButton />
      </div>

      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: '10px',
        color: 'rgba(250,247,242,0.18)',
        textAlign: 'center', marginTop: '10px', marginBottom: 0,
      }}>
        v1.0 · Maio 2026
      </p>
    </div>
  )
}
