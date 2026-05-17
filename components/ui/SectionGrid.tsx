'use client'

import Link from 'next/link'

interface SectionItem {
  slug: string
  label: string
  count: number
  href: string
  index: number
}

export function SectionGrid({ sections }: { sections: SectionItem[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1px',
      background: 'rgba(255,255,255,0.06)',
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      {sections.map((s) => (
        <Link
          key={s.slug}
          href={s.href}
          style={{ textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(184,92,56,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(61,43,31,0.55)')}
        >
          <div style={{
            background: 'rgba(61,43,31,0.55)',
            padding: '20px 22px',
            height: '100%',
            transition: 'background 150ms',
          }}>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 500,
              letterSpacing: '2px', textTransform: 'uppercase',
              color: 'rgba(250,247,242,0.28)', marginBottom: '8px',
            }}>
              {String(s.index + 1).padStart(2, '0')}
            </span>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 400,
              lineHeight: 1.4, color: 'rgba(250,247,242,0.65)', marginBottom: '6px',
            }}>
              {s.label}
            </span>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-sans)', fontSize: '10px',
              color: 'rgba(250,247,242,0.22)',
            }}>
              {s.count} doc{s.count !== 1 ? 's' : ''}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
