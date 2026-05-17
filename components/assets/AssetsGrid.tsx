'use client'

import { useAssets } from '@/context/AssetsContext'
import { AssetCard } from '@/components/assets/AssetCard'
import type { Asset, AssetCategory } from '@/types/assets'

interface AssetsGridProps {
  assets: Asset[]
  category: AssetCategory
}

export function AssetsGrid({ assets, category }: AssetsGridProps) {
  const { searchQuery } = useAssets()

  const filtered = searchQuery
    ? assets.filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : assets

  if (filtered.length === 0) {
    return (
      <div
        style={{
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            width: '200px',
            height: '160px',
            border: '2px dashed var(--color-hairline)',
            borderRadius: '12px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="8" y="12" width="24" height="20" rx="3" stroke="var(--color-hairline)" strokeWidth="1.5" />
            <path d="M14 12V10C14 8.9 14.9 8 16 8H24C25.1 8 26 8.9 26 10V12" stroke="var(--color-hairline)" strokeWidth="1.5" />
            <path d="M20 18V26M17 21L20 18L23 21" stroke="var(--color-hairline)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontStyle: 'italic',
            color: 'var(--color-ink)',
            margin: '0 0 8px',
          }}
        >
          Nenhum ativo encontrado
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--color-muted)',
            margin: 0,
            maxWidth: '280px',
            lineHeight: 1.5,
          }}
        >
          Faça upload dos primeiros ativos desta categoria usando o botão acima.
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '24px 48px 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}
    >
      {filtered.map((asset) => (
        <AssetCard key={asset.id} asset={asset} category={category} />
      ))}
    </div>
  )
}
