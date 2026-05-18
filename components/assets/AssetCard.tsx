'use client'

import { useState, useTransition } from 'react'
import { useUser } from '@/context/UserContext'
import { deleteAsset } from '@/app/ativos/actions'
import { MoveToFolderModal } from '@/components/assets/MoveToFolderModal'
import type { Asset, AssetCategory, AssetFolder } from '@/types/assets'

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getFileExtension(name: string): string {
  const parts = name.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '—'
}

function getFileIcon(mimeType: string): string {
  if (mimeType.includes('pdf')) return '📄'
  if (mimeType.includes('video')) return '🎬'
  if (mimeType.includes('audio')) return '🎵'
  if (mimeType.includes('font') || mimeType.includes('ttf') || mimeType.includes('woff')) return 'Aa'
  if (mimeType.includes('svg')) return 'SVG'
  if (mimeType.includes('zip') || mimeType.includes('archive')) return '📦'
  if (mimeType.includes('word') || mimeType.includes('document')) return '📝'
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return '📊'
  return '📁'
}

interface AssetCardProps {
  asset: Asset
  category: AssetCategory
  folders: AssetFolder[]
}

export function AssetCard({ asset, category, folders }: AssetCardProps) {
  const user = useUser()
  const canManage = ['admin', 'staff'].includes(user.profile.role)
  const canDelete = canManage
  const [isHovered, setIsHovered] = useState(false)
  const [isMoveOpen, setIsMoveOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const isImage = asset.mimeType.startsWith('image/')

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteAsset(asset.id, asset.storagePath, category)
      if (result.error) {
        console.error('Erro ao remover ativo:', result.error)
      }
    })
  }

  return (
    <>
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid var(--color-hairline)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#FFFFFF',
        boxShadow: isHovered ? '0 4px 16px rgba(44,31,23,0.1)' : '0 1px 3px rgba(44,31,23,0.06)',
        transition: 'box-shadow 200ms',
        cursor: 'default',
        opacity: isPending ? 0.5 : 1,
      }}
    >
      {/* Preview area */}
      <div
        style={{
          height: '140px',
          background: 'var(--color-surface-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset.url}
            alt={asset.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: asset.mimeType.includes('font') ? 'var(--font-display)' : 'var(--font-sans)',
              fontSize: asset.mimeType.includes('font') ? '36px' : '32px',
              color: 'var(--color-muted)',
              userSelect: 'none',
            }}
          >
            {getFileIcon(asset.mimeType)}
          </span>
        )}
      </div>

      {/* Info bar */}
      <div
        style={{
          padding: '10px 12px',
          borderTop: '1px solid var(--color-hairline)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <p
            title={asset.name}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--color-ink)',
              margin: 0,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.35,
              flex: 1,
            }}
          >
            {asset.name}
          </p>

          {/* Actions */}
          {isHovered && (
            <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
              <a
                href={asset.url}
                download={asset.name}
                title="Baixar"
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  border: '1px solid var(--color-hairline)',
                  background: 'transparent',
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                  transition: 'background 150ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-hairline)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V8M3 5.5L6 8.5L9 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 10H11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </a>
              {canManage && (
                <button
                  onClick={() => setIsMoveOpen(true)}
                  title="Mover para pasta"
                  style={{
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    border: '1px solid var(--color-hairline)',
                    background: 'transparent',
                    color: 'var(--color-muted)',
                    cursor: 'pointer',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-hairline)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path
                      d="M1 2.5C1 1.95 1.45 1.5 2 1.5H4.8L6 3H10C10.55 3 11 3.45 11 4V9.5C11 10.05 10.55 10.5 10 10.5H2C1.45 10.5 1 10.05 1 9.5V2.5Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                  </svg>
                </button>
              )}
              {canDelete && (
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  title="Remover"
                  style={{
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    border: '1px solid transparent',
                    background: 'transparent',
                    color: 'var(--color-error)',
                    cursor: isPending ? 'not-allowed' : 'pointer',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(e) => {
                    if (!isPending) e.currentTarget.style.background = 'rgba(139,44,44,0.1)'
                  }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 3H10M4.5 3V2H7.5V3M5 5.5V9M7 5.5V9M3 3L3.5 10H8.5L9 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: 'var(--color-muted-soft)',
          }}
        >
          {formatBytes(asset.size)} · {getFileExtension(asset.name)}
        </span>
      </div>
    </div>

    {isMoveOpen && (
      <MoveToFolderModal
        asset={asset}
        folders={folders}
        onClose={() => setIsMoveOpen(false)}
      />
    )}
    </>
  )
}
