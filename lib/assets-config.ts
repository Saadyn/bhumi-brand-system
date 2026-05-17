import type { AssetCategory, AssetCategoryConfig } from '@/types/assets'

export const ASSET_CATEGORIES: AssetCategoryConfig[] = [
  {
    slug: 'logotipos',
    label: 'Logotipos',
    description: 'Versões do logotipo em todos os formatos oficiais',
    acceptedTypes: ['image/svg+xml', 'image/png', 'image/jpeg', 'application/pdf', 'application/postscript'],
    acceptedExtensions: ['.svg', '.ai', '.eps', '.png', '.pdf'],
    accent: '#B85C38',
  },
  {
    slug: 'cores',
    label: 'Paleta de Cores',
    description: 'Swatches, arquivos de paleta e referências cromáticas',
    acceptedTypes: ['application/json', 'text/css', 'application/octet-stream'],
    acceptedExtensions: ['.ase', '.aco', '.clr', '.json', '.css'],
    accent: '#D4784E',
  },
  {
    slug: 'tipografia',
    label: 'Tipografia',
    description: 'Fontes e arquivos tipográficos da marca',
    acceptedTypes: ['font/woff', 'font/woff2', 'font/ttf', 'font/otf', 'application/font-woff', 'application/font-woff2'],
    acceptedExtensions: ['.woff', '.woff2', '.ttf', '.otf'],
    accent: '#3D2B1F',
  },
  {
    slug: 'imagens',
    label: 'Imagens',
    description: 'Fotografias e imagens da marca',
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/tiff'],
    acceptedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.raw'],
    accent: '#5C8C5A',
  },
  {
    slug: 'videos',
    label: 'Vídeos',
    description: 'Conteúdo audiovisual da marca',
    acceptedTypes: ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo'],
    acceptedExtensions: ['.mp4', '.mov', '.webm', '.avi'],
    accent: '#8B2C2C',
  },
  {
    slug: 'audios',
    label: 'Áudios',
    description: 'Trilhas, jingles e identidade sonora',
    acceptedTypes: ['audio/mpeg', 'audio/wav', 'audio/aac', 'audio/ogg', 'audio/flac'],
    acceptedExtensions: ['.mp3', '.wav', '.aac', '.ogg', '.flac'],
    accent: '#C8912A',
  },
  {
    slug: 'documentos',
    label: 'Documentos',
    description: 'PDFs, apresentações e documentos da marca',
    acceptedTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    acceptedExtensions: ['.pdf', '.doc', '.docx', '.ppt', '.pptx'],
    accent: '#6B5C52',
  },
  {
    slug: 'icones',
    label: 'Ícones & Grafismos',
    description: 'Ícones e grafismos da identidade visual',
    acceptedTypes: ['image/svg+xml', 'image/png'],
    acceptedExtensions: ['.svg', '.png'],
    accent: '#2C6E8C',
  },
]

export function getCategoryConfig(slug: string): AssetCategoryConfig | undefined {
  return ASSET_CATEGORIES.find((c) => c.slug === (slug as AssetCategory))
}
