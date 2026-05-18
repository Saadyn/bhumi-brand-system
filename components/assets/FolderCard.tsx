'use client'

import { useState, useTransition } from 'react'
import { useAssets } from '@/context/AssetsContext'
import { useUser } from '@/context/UserContext'
import { deleteFolder } from '@/app/ativos/actions'
import type { AssetFolder, AssetCategory } from '@/types/assets'

interface FolderCardProps {
  folder: AssetFolder
  category: AssetCategory
}

export function FolderCard({ folder, category }: FolderCardProps) {
  const { setCurrentFolderId } = useAssets()
  const user = useUser()
  const canDelete = ['admin', 'staff'].includes(user.profile.role)
  const [isHovered, setIsHovered] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation()
    startTransition(async () => {
      await deleteFolder(folder.id, category)
    })
  }

  return (
    <div
      onClick={() => !isPending && setCurrentFolderId(folder.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid var(--color-hairline)',
        borderRadius: '8px',
        padding: '16px',
        background: isHovered ? 'var(--color-surface-card)' : '#FFFFFF',
        cursor: isPending ? 'not-allowed' : 'pointer',
        opacity: isPending ? 0.5 : 1,
        transition: 'background 150ms, box-shadow 150ms',
        boxShadow: isHovered
          ? '0 4px 16px rgba(44,31,23,0.1)'
          : '0 1px 3px rgba(44,31,23,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <svg width="36" height="30" viewBox="0 0 36 30" fill="none">
          <path
            d="M2 7C2 5.9 2.9 5 4 5H14L17 9H32C33.1 9 34 9.9 34 11V26C34 27.1 33.1 28 32 28H4C2.9 28 2 27.1 2 26V7Z"
            fill="var(--color-primary)"
            fillOpacity="0.12"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
          />
        </svg>
        {isHovered && canDelete && (
          <button
            onClick={handleDelete}
            disabled={isPending}
            title="Remover pasta (ativos vão para a raiz)"
            style={{
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-error)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 3H10M4.5 3V2H7.5V3M5 5.5V9M7 5.5V9M3 3L3.5 10H8.5L9 3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-ink)',
            margin: '0 0 3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {folder.name}
        </p>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: 'var(--color-muted)',
          }}
        >
          {folder.assetCount} {folder.assetCount === 1 ? 'ativo' : 'ativos'}
        </span>
      </div>
    </div>
  )
}
