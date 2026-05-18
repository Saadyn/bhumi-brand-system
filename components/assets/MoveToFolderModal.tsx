'use client'

import { useState, useTransition } from 'react'
import { moveAssetToFolder } from '@/app/ativos/actions'
import type { Asset, AssetFolder } from '@/types/assets'

interface MoveToFolderModalProps {
  asset: Asset
  folders: AssetFolder[]
  onClose: () => void
}

export function MoveToFolderModal({ asset, folders, onClose }: MoveToFolderModalProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleMove(folderId: string | null) {
    setError(null)
    startTransition(async () => {
      const result = await moveAssetToFolder(asset.id, folderId, asset.category)
      if (result.error) {
        setError(result.error)
      } else {
        onClose()
      }
    })
  }

  const options: { id: string | null; label: string; isCurrent: boolean }[] = [
    { id: null, label: 'Sem pasta (raiz)', isCurrent: asset.folderId === null },
    ...folders.map((f) => ({
      id: f.id,
      label: f.name,
      isCurrent: asset.folderId === f.id,
    })),
  ]

  return (
    <div
      onClick={isPending ? undefined : onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(30,20,15,0.7)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(360px, 90vw)',
          background: 'var(--color-canvas)',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(30,20,15,0.35)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px 16px',
            borderBottom: '1px solid var(--color-hairline)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--color-ink)',
                margin: '0 0 2px',
              }}
            >
              Mover para pasta
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                color: 'var(--color-muted)',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '260px',
              }}
            >
              {asset.name}
            </p>
          </div>
          <button
            onClick={isPending ? undefined : onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-muted)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Options */}
        <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {options.map((opt) => (
            <button
              key={String(opt.id)}
              onClick={() => !opt.isCurrent && handleMove(opt.id)}
              disabled={isPending || opt.isCurrent}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                background: opt.isCurrent ? 'var(--color-surface-card)' : 'transparent',
                cursor: opt.isCurrent || isPending ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'background 120ms',
              }}
              onMouseEnter={(e) => {
                if (!opt.isCurrent && !isPending)
                  e.currentTarget.style.background = 'var(--color-surface-card)'
              }}
              onMouseLeave={(e) => {
                if (!opt.isCurrent) e.currentTarget.style.background = 'transparent'
              }}
            >
              {opt.id === null ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="3" width="12" height="10" rx="2" stroke="var(--color-muted)" strokeWidth="1.3" />
                  <path d="M2 7H14" stroke="var(--color-muted)" strokeWidth="1.3" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M1 5C1 4.4 1.4 4 2 4H6.5L8 6H14C14.6 6 15 6.4 15 7V13C15 13.6 14.6 14 14 14H2C1.4 14 1 13.6 1 13V5Z"
                    fill="var(--color-primary)"
                    fillOpacity="0.15"
                    stroke="var(--color-primary)"
                    strokeWidth="1.3"
                  />
                </svg>
              )}
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--color-ink)',
                  flex: 1,
                }}
              >
                {opt.label}
              </span>
              {opt.isCurrent && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7L5.5 10.5L12 4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}

          {folders.length === 0 && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'var(--color-muted)',
                padding: '12px 16px',
                margin: 0,
                textAlign: 'center',
              }}
            >
              Nenhuma pasta criada ainda.
            </p>
          )}
        </div>

        {error && (
          <div style={{ padding: '0 16px 12px' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                color: 'var(--color-error)',
                margin: 0,
              }}
            >
              {error}
            </p>
          </div>
        )}

        <div style={{ height: '8px' }} />
      </div>
    </div>
  )
}
