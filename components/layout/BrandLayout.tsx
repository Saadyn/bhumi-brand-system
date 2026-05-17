'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/navigation/Sidebar'
import { useUser } from '@/context/UserContext'
import type { NavigationSection } from '@/types'

interface BrandLayoutProps {
  children: React.ReactNode
  navigation: NavigationSection[]
  activeSection: string
  activeDoc: string
}

export function BrandLayout({ children, navigation, activeSection, activeDoc }: BrandLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { profile } = useUser()

  return (
    <div className="flex h-screen bg-raiz overflow-hidden">
      {/* Overlay mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: 'rgba(61,43,31,0.5)' }}
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar desktop */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar navigation={navigation} activeSection={activeSection} activeDoc={activeDoc} role={profile.role} />
      </div>

      {/* Sidebar mobile — drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-30 flex lg:hidden transform transition-transform duration-250 ease-brand ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          navigation={navigation}
          activeSection={activeSection}
          activeDoc={activeDoc}
          role={profile.role}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header
          className="lg:hidden flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid var(--color-bege-escuro)', background: 'var(--color-marrom)' }}
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 transition-colors"
            style={{ color: 'rgba(242,237,228,0.5)' }}
            aria-label="Abrir menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect y="3" width="18" height="1.5" rx="1" fill="currentColor"/>
              <rect y="8.25" width="18" height="1.5" rx="1" fill="currentColor"/>
              <rect y="13.5" width="18" height="1.5" rx="1" fill="currentColor"/>
            </svg>
          </button>
          <span className="font-display text-xl" style={{ color: 'rgba(242,237,228,0.85)' }}>bhumi</span>
        </header>

        <main className="flex-1 overflow-y-auto bg-raiz">
          {children}
        </main>
      </div>
    </div>
  )
}
