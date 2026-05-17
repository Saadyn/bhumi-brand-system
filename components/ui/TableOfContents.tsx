'use client'

import { useState, useEffect } from 'react'
import type { TOCItem } from '@/types'

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0% -60% 0%' }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="sticky top-8" aria-label="Índice do documento">
      <p className="text-xs text-escuro/40 uppercase tracking-widest font-helvetica mb-3">
        Nesta página
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`
                block text-sm font-helvetica transition-colors
                ${item.level === 3 ? 'pl-3' : ''}
                ${activeId === item.id
                  ? 'text-terra font-medium'
                  : 'text-escuro/45 hover:text-escuro/70'
                }
              `}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
