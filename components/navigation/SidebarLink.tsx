'use client'

import Link from 'next/link'
import type { NavigationItem } from '@/types'

interface SidebarLinkProps {
  item: NavigationItem
  isActive: boolean
}

export function SidebarLink({ item, isActive }: SidebarLinkProps) {
  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      style={{
        display: 'flex', alignItems: 'center',
        padding: '6px 10px',
        borderRadius: '6px',
        fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: isActive ? 400 : 300,
        lineHeight: 1.4,
        textDecoration: 'none',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        transition: 'background 150ms, color 150ms',
        color: isActive ? '#D4784E' : 'rgba(250,247,242,0.42)',
        background: isActive ? 'rgba(184,92,56,0.14)' : 'transparent',
        borderLeft: isActive ? '2px solid #B85C38' : '2px solid transparent',
      }}
      title={item.label}
    >
      {item.label}
    </Link>
  )
}
