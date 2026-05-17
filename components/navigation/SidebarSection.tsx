'use client'

import { useState } from 'react'
import { SidebarLink } from '@/components/navigation/SidebarLink'
import type { NavigationSection } from '@/types'

interface SidebarSectionProps {
  section: NavigationSection
  activeSection: string
  activeDoc: string
}

export function SidebarSection({ section, activeSection, activeDoc }: SidebarSectionProps) {
  const isActive = section.slug === activeSection
  const [isExpanded, setIsExpanded] = useState(isActive)

  return (
    <div style={{ marginBottom: '2px' }}>
      <button
        onClick={() => setIsExpanded(p => !p)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '7px 10px',
          background: 'none', border: 'none', cursor: 'pointer',
          borderRadius: '6px', textAlign: 'left',
          color: isActive ? '#D4784E' : 'rgba(250,247,242,0.32)',
          transition: 'color 150ms',
        }}
        aria-expanded={isExpanded}
      >
        {/* caption-uppercase */}
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 500,
          letterSpacing: '2px', textTransform: 'uppercase',
        }}>
          {section.label}
        </span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transition: 'transform 200ms', transform: isExpanded ? 'rotate(90deg)' : 'none', flexShrink: 0 }}
        >
          <path d="M3 2L7 5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div style={{
        overflow: 'hidden',
        maxHeight: isExpanded ? '600px' : '0',
        opacity: isExpanded ? 1 : 0,
        transition: 'max-height 200ms ease, opacity 200ms ease',
      }}>
        <ul style={{ padding: '2px 4px 8px', margin: 0, listStyle: 'none' }}>
          {section.items.map((item) => (
            <li key={item.slug}>
              <SidebarLink
                item={item}
                isActive={activeDoc === item.slug && activeSection === section.slug}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
