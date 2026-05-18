'use client'

import { useState, useTransition, useRef } from 'react'
import { createFolder } from '@/app/ativos/actions'
import type { AssetCategory } from '@/types/assets'

interface CreateFolderModalProps {
  category: AssetCategory
  onClose: () => void
}

export function CreateFolderModal({ category, onClose }: CreateFolderModalProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleCreate() {
    if (!name.trim()) {
      setError('Nome da pasta não pode ser vazio.')
      return
    }
    setError(null)
    startTransition(async () => {
      const result = await createFolder(name.trim(), category)
      if (result.error) {
        setError(result.error)
      } else {
        onClose()
      }
    })
  }

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
          width: 'min(400px, 90vw)',
          background: 'var(--color-canvas)',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(30,20,15,0.35)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 20px',
            borderBottom: '1px solid var(--color-hairline)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--color-ink)',
              margin: 0,
            }}
          >
            Nova Pasta
          </h2>
          <button
            onClick={isPending ? undefined : onClose}
            disabled={isPending}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-muted)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px' }}>
          <label
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--color-ink)',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Nome da pasta
          </label>
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleCreate() }}
            placeholder="ex: SVG, PNG, Versões Escuras..."
            disabled={isPending}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-hairline)' }}
            style={{
              width: '100%',
              height: '44px',
              background: 'var(--color-canvas)',
              border: '1px solid var(--color-hairline)',
              borderRadius: '8px',
              padding: '0 16px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--color-ink)',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 150ms',
              opacity: isPending ? 0.6 : 1,
            }}
          />
          {error && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                color: 'var(--color-error)',
                margin: '8px 0 0',
              }}
            >
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid var(--color-hairline)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <button
            onClick={isPending ? undefined : onClose}
            disabled={isPending}
            style={{
              height: '40px',
              padding: '0 20px',
              background: 'transparent',
              border: '1px solid var(--color-hairline)',
              borderRadius: '8px',
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleCreate}
            disabled={isPending || !name.trim()}
            style={{
              height: '40px',
              padding: '0 20px',
              background: 'var(--color-primary)',
              border: 'none',
              borderRadius: '8px',
              color: 'var(--color-on-dark)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: isPending || !name.trim() ? 'not-allowed' : 'pointer',
              opacity: isPending || !name.trim() ? 0.6 : 1,
              transition: 'opacity 150ms',
            }}
          >
            {isPending ? 'Criando...' : 'Criar pasta'}
          </button>
        </div>
      </div>
    </div>
  )
}
