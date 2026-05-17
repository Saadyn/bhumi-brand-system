'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const CATEGORIES = [
  { slug: 'logotipos', label: 'Logotipos', icon: '◎', accent: '#B85C38' },
  { slug: 'cores', label: 'Paleta de Cores', icon: '◐', accent: '#D4784E' },
  { slug: 'tipografia', label: 'Tipografia', icon: 'T', accent: '#3D2B1F' },
  { slug: 'imagens', label: 'Imagens', icon: '▣', accent: '#5C8C5A' },
  { slug: 'videos', label: 'Vídeos', icon: '▷', accent: '#8B2C2C' },
  { slug: 'audios', label: 'Áudios', icon: '♪', accent: '#C8912A' },
  { slug: 'documentos', label: 'Documentos', icon: '⊞', accent: '#6B5C52' },
  { slug: 'icones', label: 'Ícones & Grafismos', icon: '★', accent: '#2C6E8C' },
]

export function AssetsSidebar() {
  const pathname = usePathname()
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [backHovered, setBackHovered] = useState(false)

  return (
    <nav
      style={{
        width: '240px',
        height: '100vh',
        flexShrink: 0,
        background: 'var(--color-surface-dark)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
      aria-label="Navegação de Ativos"
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 20px 18px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Link href="/ativos" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 400,
              letterSpacing: '-0.3px',
              color: 'rgba(250,247,242,0.9)',
              display: 'block',
              lineHeight: 1,
            }}
          >
            bhumi
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: '#D4784E',
              display: 'block',
              marginTop: '4px',
            }}
          >
            Ativos da Marca
          </span>
        </Link>
      </div>

      {/* Back link */}
      <div style={{ padding: '14px 14px 10px' }}>
        <Link
          href="/"
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: backHovered ? 'rgba(250,247,242,0.65)' : 'rgba(250,247,242,0.35)',
            padding: '6px 8px',
            borderRadius: '6px',
            background: backHovered ? 'rgba(255,255,255,0.04)' : 'transparent',
            transition: 'color 150ms, background 150ms',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M8 2L4 6L8 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Diretrizes
        </Link>
      </div>

      {/* Section label */}
      <div style={{ padding: '8px 22px 6px' }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'rgba(160,144,128,0.6)',
          }}
        >
          Biblioteca
        </span>
      </div>

      {/* Nav items */}
      <div style={{ padding: '4px 10px 20px', flex: 1 }}>
        {CATEGORIES.map((item) => {
          const isActive = pathname.startsWith(`/ativos/${item.slug}`)
          const isHovered = hoveredSlug === item.slug

          return (
            <Link
              key={item.slug}
              href={`/ativos/${item.slug}`}
              onMouseEnter={() => setHoveredSlug(item.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 14px',
                borderRadius: '6px',
                textDecoration: 'none',
                marginBottom: '2px',
                background: isActive
                  ? 'rgba(255,255,255,0.08)'
                  : isHovered
                    ? 'rgba(255,255,255,0.06)'
                    : 'transparent',
                borderLeft: isActive ? `3px solid ${item.accent}` : '3px solid transparent',
                transition: 'background 150ms, color 150ms',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: isActive ? item.accent : 'rgba(250,247,242,0.35)',
                  width: '18px',
                  textAlign: 'center',
                  flexShrink: 0,
                  transition: 'color 150ms',
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive
                    ? 'rgba(250,247,242,0.95)'
                    : isHovered
                      ? 'rgba(250,247,242,0.75)'
                      : 'rgba(250,247,242,0.55)',
                  transition: 'color 150ms, font-weight 150ms',
                }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
