'use client'

import { useRef, useState, useTransition } from 'react'
import { useAssets } from '@/context/AssetsContext'
import { uploadAsset } from '@/app/ativos/actions'
import type { AssetCategory, AssetFolder } from '@/types/assets'

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface UploadModalProps {
  category: AssetCategory
  acceptedTypes: string[]
  acceptedExtensions: string[]
  folders: AssetFolder[]
  onClose: () => void
}

export function UploadModal({ category, acceptedTypes, acceptedExtensions, folders, onClose }: UploadModalProps) {
  const { currentFolderId } = useAssets()
  const inputRef = useRef<HTMLInputElement>(null)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [selectedFolderId, setSelectedFolderId] = useState<string>(currentFolderId ?? '')
  const [isDragOver, setIsDragOver] = useState(false)
  const [cancelHovered, setCancelHovered] = useState(false)
  const [confirmHovered, setConfirmHovered] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  function handleFiles(files: FileList | null) {
    if (!files) return
    setPendingFiles((prev) => [...prev, ...Array.from(files)])
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  function removeFile(index: number) {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index))
  }

  function handleConfirm() {
    if (pendingFiles.length === 0) return

    setErrors([])
    startTransition(async () => {
      const uploadErrors: string[] = []

      for (let i = 0; i < pendingFiles.length; i++) {
        const file = pendingFiles[i]
        setUploadProgress(`Enviando ${i + 1}/${pendingFiles.length}...`)

        const formData = new FormData()
        formData.set('file', file)
        formData.set('category', category)
        if (selectedFolderId) formData.set('folderId', selectedFolderId)

        const result = await uploadAsset(formData)
        if (result.error) {
          uploadErrors.push(`${file.name}: ${result.error}`)
        }
      }

      setUploadProgress(null)

      if (uploadErrors.length > 0) {
        setErrors(uploadErrors)
      } else {
        onClose()
      }
    })
  }

  const isUploading = isPending

  return (
    <div
      onClick={isUploading ? undefined : onClose}
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
          width: 'min(560px, 90vw)',
          maxHeight: '80vh',
          background: 'var(--color-canvas)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(30,20,15,0.35)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 20px',
            borderBottom: '1px solid var(--color-hairline)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--color-ink)',
                margin: '0 0 4px',
              }}
            >
              Fazer Upload
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                color: 'var(--color-muted)',
                margin: 0,
              }}
            >
              Formatos aceitos: {acceptedExtensions.join(', ')}
            </p>
          </div>
          <button
            onClick={isUploading ? undefined : onClose}
            disabled={isUploading}
            style={{
              background: 'none',
              border: 'none',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              color: 'var(--color-muted)',
              padding: '4px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isUploading ? 0.4 : 1,
            }}
            aria-label="Fechar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {/* Drop zone */}
          <div
            onClick={isUploading ? undefined : () => inputRef.current?.click()}
            onDragOver={(e) => {
              if (isUploading) return
              e.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={isUploading ? undefined : handleDrop}
            style={{
              border: `2px dashed ${isDragOver ? 'var(--color-primary)' : 'var(--color-hairline)'}`,
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              background: isDragOver ? 'rgba(184,92,56,0.04)' : 'transparent',
              transition: 'border-color 150ms, background 150ms',
              opacity: isUploading ? 0.5 : 1,
            }}
          >
            {/* Upload icon */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid var(--color-hairline)',
                background: 'var(--color-surface-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3V14M5 8L10 3L15 8" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 16H17" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontStyle: 'italic',
                color: 'var(--color-ink)',
                margin: '0 0 6px',
              }}
            >
              Arraste arquivos aqui
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'var(--color-muted)',
                margin: '0 0 12px',
              }}
            >
              ou clique para selecionar
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                color: 'var(--color-muted-soft)',
                margin: 0,
              }}
            >
              {acceptedExtensions.join(' · ')}
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={(e) => handleFiles(e.target.files)}
            style={{ display: 'none' }}
          />

          {/* Seletor de pasta */}
          {folders.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <label
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                Pasta de destino
              </label>
              <select
                value={selectedFolderId}
                onChange={(e) => setSelectedFolderId(e.target.value)}
                disabled={isUploading}
                style={{
                  width: '100%',
                  height: '40px',
                  background: 'var(--color-canvas)',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: '8px',
                  padding: '0 12px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--color-ink)',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'auto',
                }}
              >
                <option value="">Sem pasta (raiz)</option>
                {folders.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Pending files list */}
          {pendingFiles.length > 0 && (
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pendingFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: 'var(--color-surface-card)',
                    borderRadius: '8px',
                    border: '1px solid var(--color-hairline)',
                    gap: '12px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        color: 'var(--color-ink)',
                        margin: '0 0 2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {file.name}
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '11px',
                        color: 'var(--color-muted-soft)',
                      }}
                    >
                      {formatBytes(file.size)}
                    </span>
                  </div>
                  {!isUploading && (
                    <button
                      onClick={() => removeFile(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-muted)',
                        padding: '4px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Erros de upload */}
          {errors.length > 0 && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                background: 'rgba(139,44,44,0.07)',
                border: '1px solid rgba(139,44,44,0.2)',
                borderRadius: '8px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-error)',
                  margin: '0 0 6px',
                }}
              >
                Falha ao enviar:
              </p>
              {errors.map((err, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    color: 'var(--color-error)',
                    margin: '2px 0 0',
                  }}
                >
                  {err}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid var(--color-hairline)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Progresso de upload */}
          {uploadProgress ? (
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'var(--color-muted)',
              }}
            >
              {uploadProgress}
            </span>
          ) : (
            <span />
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={isUploading ? undefined : onClose}
              disabled={isUploading}
              onMouseEnter={() => setCancelHovered(true)}
              onMouseLeave={() => setCancelHovered(false)}
              style={{
                height: '40px',
                padding: '0 20px',
                background: 'transparent',
                border: '1px solid var(--color-hairline)',
                borderRadius: '8px',
                color: cancelHovered && !isUploading ? 'var(--color-ink)' : 'var(--color-muted)',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                cursor: isUploading ? 'not-allowed' : 'pointer',
                transition: 'color 150ms',
                opacity: isUploading ? 0.5 : 1,
              }}
            >
              Cancelar
            </button>

            {pendingFiles.length > 0 && (
              <button
                onClick={handleConfirm}
                disabled={isUploading}
                onMouseEnter={() => setConfirmHovered(true)}
                onMouseLeave={() => setConfirmHovered(false)}
                style={{
                  height: '40px',
                  padding: '0 20px',
                  background:
                    isUploading
                      ? 'var(--color-primary-active)'
                      : confirmHovered
                        ? 'var(--color-primary-active)'
                        : 'var(--color-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'var(--color-on-dark)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                  transition: 'background 150ms',
                  opacity: isUploading ? 0.8 : 1,
                }}
              >
                {isUploading
                  ? 'Enviando...'
                  : `Adicionar ${pendingFiles.length} ${pendingFiles.length === 1 ? 'ativo' : 'ativos'}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
