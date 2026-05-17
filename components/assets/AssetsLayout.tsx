'use client'

import { AssetsSidebar } from '@/components/assets/AssetsSidebar'

export function AssetsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--color-canvas)',
      }}
    >
      <AssetsSidebar />
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          background: 'var(--color-canvas)',
        }}
      >
        {children}
      </main>
    </div>
  )
}
