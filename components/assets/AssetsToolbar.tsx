'use client'

import { useState } from 'react'
import { useAssets } from '@/context/AssetsContext'
import { useUser } from '@/context/UserContext'
import { UploadModal } from '@/components/assets/UploadModal'
import { CreateFolderModal } from '@/components/assets/CreateFolderModal'
import type { AssetCategory, AssetFolder } from '@/types/assets'

interface AssetsToolbarProps {
  category: AssetCategory
  acceptedTypes: string[]
  acceptedExtensions: string[]
  folders: AssetFolder[]
}

export function AssetsToolbar({ category, acceptedTypes, acceptedExtensions, folders }: AssetsToolbarProps) {
  const { searchQuery, setSearchQuery } = useAssets()
  const user = useUser()
  const canUpload = ['admin', 'staff'].includes(user.profile.role)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isFolderOpen, setIsFolderOpen] = useState(false)
  const [uploadHovered, setUploadHovered] = useState(false)
  const [folderHovered, setFolderHovered] = useState(false)

  return (
    <div
      style={{
        padding: '20px 48px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        borderBottom: '1px solid var(--color-hairline)',
      }}
    >
      {/* Search */}
      <div style={{ flex: 1, position: 'relative' }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-muted)',
            pointerEvents: 'none',
          }}
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar ativos..."
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-hairline)'
          }}
          style={{
            width: '100%',
            height: '44px',
            background: 'var(--color-canvas)',
            border: '1px solid var(--color-hairline)',
            borderRadius: '8px',
            padding: '0 16px 0 44px',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--color-ink)',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 150ms',
          }}
        />
      </div>

      {/* Botões admin/staff */}
      {canUpload && (
        <>
          <button
            onClick={() => setIsFolderOpen(true)}
            onMouseEnter={() => setFolderHovered(true)}
            onMouseLeave={() => setFolderHovered(false)}
            style={{
              height: '44px',
              padding: '0 20px',
              background: 'transparent',
              border: `1px solid ${folderHovered ? 'var(--color-primary)' : 'var(--color-hairline)'}`,
              borderRadius: '8px',
              color: folderHovered ? 'var(--color-primary)' : 'var(--color-muted)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'border-color 150ms, color 150ms',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
              <path
                d="M1 3C1 2.4 1.4 2 2 2H5.5L7 4H12C12.6 4 13 4.4 13 5V11C13 11.6 12.6 12 12 12H2C1.4 12 1 11.6 1 11V3Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path d="M7 6.5V9.5M5.5 8H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Nova Pasta
          </button>

          <button
            onClick={() => setIsUploadOpen(true)}
            onMouseEnter={() => setUploadHovered(true)}
            onMouseLeave={() => setUploadHovered(false)}
            style={{
              height: '44px',
              padding: '0 24px',
              background: uploadHovered ? 'var(--color-primary-active)' : 'var(--color-primary)',
              border: 'none',
              borderRadius: '8px',
              color: 'var(--color-on-dark)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 150ms',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V10M3 5L7 1L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 11V13H13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Upload
          </button>
        </>
      )}

      {isUploadOpen && (
        <UploadModal
          category={category}
          acceptedTypes={acceptedTypes}
          acceptedExtensions={acceptedExtensions}
          folders={folders}
          onClose={() => setIsUploadOpen(false)}
        />
      )}

      {isFolderOpen && (
        <CreateFolderModal
          category={category}
          onClose={() => setIsFolderOpen(false)}
        />
      )}
    </div>
  )
}
