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

export interface AssetFolder {
  id: string
  name: string
  category: AssetCategory
  createdAt: string
  assetCount: number
}

export interface Asset {
  id: string
  name: string
  category: AssetCategory
  mimeType: string
  size: number
  url: string
  storagePath: string
  uploadedBy?: string
  uploadedAt: string
  folderId: string | null
}

export interface AssetsContextValue {
  searchQuery: string
  setSearchQuery: (q: string) => void
  currentFolderId: string | null
  setCurrentFolderId: (id: string | null) => void
}
