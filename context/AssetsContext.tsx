'use client'

import { createContext, useContext, useState } from 'react'
import type { AssetsContextValue } from '@/types/assets'

const AssetsContext = createContext<AssetsContextValue | null>(null)

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <AssetsContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </AssetsContext.Provider>
  )
}

export function useAssets(): AssetsContextValue {
  const ctx = useContext(AssetsContext)
  if (!ctx) throw new Error('useAssets must be used within AssetsProvider')
  return ctx
}
