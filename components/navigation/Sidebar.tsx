'use client'

import Link from 'next/link'
import { SidebarSection } from '@/components/navigation/SidebarSection'
import { UserMenu } from '@/components/auth/UserMenu'
import type { NavigationSection } from '@/types'
import type { UserRole } from '@/types/auth'

interface SidebarProps {
  navigation: NavigationSection[]
  activeSection: string
  activeDoc: string
  role?: UserRole
  onClose?: () => void
}

export function Sidebar({ navigation, activeSection, activeDoc, role, onClose }: SidebarProps) {
  return (
    <nav
      className="sidebar-dark"
      style={{
        width: '260px', height: '100%',
        display: 'flex', flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
      aria-label="Navegação do Brand System"
    >
      {/* Header — wordmark */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 20px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400,
            letterSpacing: '-0.3px', color: 'rgba(250,247,242,0.9)',
            display: 'block', lineHeight: 1,
          }}>
            bhumi
          </span>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 500,
            letterSpacing: '2.5px', textTransform: 'uppercase',
            color: '#D4784E', display: 'block', marginTop: '4px',
          }}>
            Brand System
          </span>
        </Link>

        {onClose && (
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(250,247,242,0.35)', padding: '4px',
          }} aria-label="Fechar menu">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
        {navigation.map((section) => (
          <SidebarSection
            key={section.slug}
            section={section}
            activeSection={activeSection}
            activeDoc={activeDoc}
          />
        ))}

        {/* IA da Marca */}
        <div style={{ marginTop: '8px', padding: '4px 10px' }}>
          <Link href="/ia" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '7px 10px',
              borderRadius: '6px',
              color: 'rgba(250,247,242,0.45)',
              fontSize: '12px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              letterSpacing: '0.1px',
              transition: 'background 150ms ease, color 150ms ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.background = 'rgba(184,92,56,0.08)'
              el.style.color = '#D4784E'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.background = 'transparent'
              el.style.color = 'rgba(250,247,242,0.45)'
            }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, color: '#D4784E' }}>
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M4 6.5h5M6.5 4v5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              IA da Marca
              <span style={{
                marginLeft: 'auto',
                fontSize: '9px', fontWeight: 500, letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#D4784E',
                background: 'rgba(184,92,56,0.12)',
                padding: '1px 5px', borderRadius: '4px',
              }}>Beta</span>
            </div>
          </Link>
        </div>

        {/* Ativos da Marca — visible to all */}
        <div style={{ marginTop: '8px', padding: '4px 10px' }}>
          <Link href="/ativos" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '7px 10px',
              borderRadius: '6px',
              color: 'rgba(250,247,242,0.45)',
              fontSize: '12px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 400,
              letterSpacing: '0.1px',
              transition: 'background 150ms ease, color 150ms ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.background = 'rgba(250,247,242,0.05)'
              el.style.color = 'rgba(250,247,242,0.75)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.background = 'transparent'
              el.style.color = 'rgba(250,247,242,0.45)'
            }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, color: 'rgba(250,247,242,0.35)' }}>
                <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <rect x="7" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <rect x="1" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <rect x="7" y="7" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
              Biblioteca de Ativos
            </div>
          </Link>
        </div>

        {/* Admin link — only visible to admins */}
        {role === 'admin' && (
          <div style={{ marginTop: '8px', padding: '4px 10px' }}>
            <Link
              href="/admin/usuarios"
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '7px 10px',
                borderRadius: '6px',
                color: 'rgba(250,247,242,0.45)',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                letterSpacing: '0.1px',
                transition: 'background 150ms ease, color 150ms ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'rgba(250,247,242,0.05)'
                el.style.color = 'rgba(250,247,242,0.75)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'transparent'
                el.style.color = 'rgba(250,247,242,0.45)'
              }}
              >
                {/* Shield icon */}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, color: '#D4784E' }}>
                  <path d="M6.5 1L1.5 3.25V6.5C1.5 9.09 3.7 11.52 6.5 12.25C9.3 11.52 11.5 9.09 11.5 6.5V3.25L6.5 1Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                </svg>
                Usuários
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '9px', fontWeight: 500, letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: '#D4784E',
                  background: 'rgba(184,92,56,0.12)',
                  padding: '1px 5px', borderRadius: '4px',
                }}>
                  Admin
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '14px 18px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <UserMenu />
      </div>
    </nav>
  )
}
