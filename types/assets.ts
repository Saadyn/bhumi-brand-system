export type AssetCategory =
  | 'logotipos'
  | 'cores'
  | 'tipografia'
  | 'imagens'
  | 'videos'
  | 'audios'
  | 'documentos'
  | 'icones'

export interface AssetCategoryConfig {
  slug: AssetCategory
  label: string
  description: string
  acceptedTypes: string[]
  acceptedExtensions: string[]
  accent: string
}

export interface Asset {
  id: string
  name: string
  category: AssetCategory
  mimeType: string
  size: number
  url: string          // URL assinada para download (gerada pelo servidor)
  storagePath: string  // caminho no bucket: {category}/{uuid}-{filename}
  uploadedBy?: string  // uuid do usuário que fez upload
  uploadedAt: string
}

export interface AssetsContextValue {
  searchQuery: string
  setSearchQuery: (q: string) => void
}
