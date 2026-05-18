'use client'

import { useAssets } from '@/context/AssetsContext'
import { FolderCard } from '@/components/assets/FolderCard'
import { AssetCard } from '@/components/assets/AssetCard'
import type { Asset, AssetFolder, AssetCategory } from '@/types/assets'

interface AssetsGridProps {
  assets: Asset[]
  folders: AssetFolder[]
  category: AssetCategory
}

export function AssetsGrid({ assets, folders, category }: AssetsGridProps) {
  const { searchQuery, currentFolderId, setCurrentFolderId } = useAssets()

  const currentFolder = folders.find((f) => f.id === currentFolderId) ?? null

  // Filter assets by folder + search
  const visibleAssets = assets.filter((a) => {
    const matchesFolder = currentFolderId === null
      ? a.folderId === null
      : a.folderId === currentFolderId
    const matchesSearch = searchQuery
      ? a.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    return matchesFolder && matchesSearch
  })

  // Folders only shown at root when there's no active search
  const showFolders = currentFolderId === null && !searchQuery && folders.length > 0

  // All assets matching search (across all folders) when searching
  const searchedAssets = searchQuery
    ? assets.filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : null

  const displayAssets = searchQuery && currentFolderId === null ? (searchedAssets ?? []) : visibleAssets

  const isEmpty = !showFolders && displayAssets.length === 0

  if (isEmpty) {
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
          {currentFolder ? `Pasta "${currentFolder.name}" vazia` : 'Nenhum ativo encontrado'}
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
          {currentFolder
            ? 'Faça upload de ativos ou mova arquivos existentes para esta pasta.'
            : 'Faça upload dos primeiros ativos desta categoria usando o botão acima.'}
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '0 48px 48px' }}>
      {/* Breadcrumb quando dentro de uma pasta */}
      {currentFolderId !== null && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '20px 0 8px',
            borderBottom: '1px solid var(--color-hairline)',
            marginBottom: '24px',
          }}
        >
          <button
            onClick={() => setCurrentFolderId(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: 'var(--color-muted)',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'color 120ms, background 120ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-ink)'
              e.currentTarget.style.background = 'var(--color-surface-card)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-muted)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Todos os ativos
          </button>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3L9 7L5 11" stroke="var(--color-hairline)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
              <path
                d="M1 3C1 2.4 1.4 2 2 2H5.5L7 4H12C12.6 4 13 4.4 13 5V10C13 10.6 12.6 11 12 11H2C1.4 11 1 10.6 1 10V3Z"
                fill="var(--color-primary)"
                fillOpacity="0.15"
                stroke="var(--color-primary)"
                strokeWidth="1.3"
              />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-ink)',
              }}
            >
              {currentFolder?.name}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: 'var(--color-muted)',
              marginLeft: '4px',
            }}
          >
            {displayAssets.length} {displayAssets.length === 1 ? 'ativo' : 'ativos'}
          </span>
        </div>
      )}

      {/* Seção de pastas (só na raiz sem busca ativa) */}
      {showFolders && (
        <div style={{ paddingTop: '24px', marginBottom: '32px' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              margin: '0 0 12px',
            }}
          >
            Pastas
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '12px',
            }}
          >
            {folders.map((folder) => (
              <FolderCard key={folder.id} folder={folder} category={category} />
            ))}
          </div>

          {/* Divider se houver ativos na raiz */}
          {visibleAssets.length > 0 && (
            <div
              style={{
                borderTop: '1px solid var(--color-hairline)',
                marginTop: '28px',
                paddingTop: '0',
              }}
            />
          )}
        </div>
      )}

      {/* Grid de ativos */}
      {displayAssets.length > 0 && (
        <>
          {showFolders && visibleAssets.length > 0 && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                margin: '0 0 12px',
              }}
            >
              Sem pasta
            </p>
          )}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {displayAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} category={category} folders={folders} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
