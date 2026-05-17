'use client'

import { useTransition } from 'react'
import { updateUserRole, removeUser } from '@/app/admin/usuarios/actions'
import type { UserRole } from '@/types/auth'

interface UserRow {
  id: string
  name: string
  email: string
  role: UserRole
  created_at: string
}

interface UserTableProps {
  users: UserRow[]
  currentUserId: string
}

const roleLabel: Record<UserRole, string> = {
  admin:  'Admin',
  staff:  'Staff',
  viewer: 'Viewer',
}

const roleBadgeStyle: Record<UserRole, React.CSSProperties> = {
  admin: {
    background: 'rgba(184,92,56,0.12)',
    color: '#D4784E',
    border: '1px solid rgba(184,92,56,0.2)',
  },
  staff: {
    background: 'rgba(200,145,42,0.12)',
    color: '#C8912A',
    border: '1px solid rgba(200,145,42,0.2)',
  },
  viewer: {
    background: 'rgba(44,31,23,0.06)',
    color: 'var(--color-muted)',
    border: '1px solid var(--color-hairline)',
  },
}

function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.8px',
      textTransform: 'uppercase',
      ...roleBadgeStyle[role],
    }}>
      {roleLabel[role]}
    </span>
  )
}

function UserRow({
  user,
  currentUserId,
}: {
  user: UserRow
  currentUserId: string
}) {
  const [isPending, startTransition] = useTransition()
  const isSelf = user.id === currentUserId

  const handleRoleChange = (newRole: string) => {
    startTransition(async () => {
      const result = await updateUserRole(user.id, newRole as UserRole)
      if (result.error) alert(`Erro: ${result.error}`)
    })
  }

  const handleRemove = () => {
    if (isSelf) return
    const confirmed = confirm(
      `Remover "${user.name || user.email}"? Esta ação é irreversível.`
    )
    if (!confirmed) return
    startTransition(async () => {
      const result = await removeUser(user.id)
      if (result.error) alert(`Erro ao remover: ${result.error}`)
    })
  }

  return (
    <tr style={{
      opacity: isPending ? 0.5 : 1,
      transition: 'opacity 150ms ease',
      borderBottom: '1px solid var(--color-hairline-soft)',
    }}>
      {/* Name + email */}
      <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
          color: 'var(--color-ink)', margin: 0, lineHeight: 1.3,
        }}>
          {user.name || '—'}
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 400,
          color: 'var(--color-muted-soft)', margin: 0, marginTop: '2px',
        }}>
          {user.email}
        </p>
      </td>

      {/* Current role badge */}
      <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
        <RoleBadge role={user.role} />
      </td>

      {/* Role select */}
      <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
        <select
          defaultValue={user.role}
          disabled={isPending}
          onChange={(e) => handleRoleChange(e.target.value)}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 400,
            color: 'var(--color-body)',
            background: 'var(--color-canvas)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 'var(--radius-xs)',
            padding: '5px 8px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            outline: 'none',
          }}
          aria-label={`Alterar role de ${user.name || user.email}`}
        >
          <option value="viewer">Viewer</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </td>

      {/* Joined date */}
      <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 400,
          color: 'var(--color-muted-soft)',
        }}>
          {new Date(user.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'short', year: 'numeric',
          })}
        </span>
      </td>

      {/* Remove action */}
      <td style={{ padding: '14px 16px', verticalAlign: 'middle', textAlign: 'right' }}>
        {!isSelf ? (
          <button
            onClick={handleRemove}
            disabled={isPending}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 400,
              color: 'var(--color-error)',
              background: 'none', border: 'none',
              cursor: isPending ? 'not-allowed' : 'pointer',
              padding: '4px 8px',
              borderRadius: 'var(--radius-xs)',
              opacity: isPending ? 0.4 : 0.7,
              transition: 'opacity 150ms ease',
            }}
            onMouseEnter={(e) => { if (!isPending) (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
            onMouseLeave={(e) => { if (!isPending) (e.currentTarget as HTMLButtonElement).style.opacity = '0.7' }}
            aria-label={`Remover ${user.name || user.email}`}
          >
            Remover
          </button>
        ) : (
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '11px',
            color: 'var(--color-muted-soft)', fontStyle: 'italic',
          }}>
            Você
          </span>
        )}
      </td>
    </tr>
  )
}

export function UserTable({ users, currentUserId }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div style={{
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-lg)',
        padding: '48px 32px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '14px',
          color: 'var(--color-muted)', margin: 0,
        }}>
          Nenhum usuário encontrado.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      background: 'var(--color-surface-card)',
      border: '1px solid var(--color-hairline)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-hairline)' }}>
            {['Usuário', 'Role atual', 'Alterar role', 'Membro desde', ''].map((header) => (
              <th
                key={header}
                style={{
                  padding: '10px 16px',
                  fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 500,
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  color: 'var(--color-muted-soft)',
                  textAlign: header === '' ? 'right' : 'left',
                  background: 'rgba(44,31,23,0.03)',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} currentUserId={currentUserId} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
