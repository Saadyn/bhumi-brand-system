// ─── Navegação ───────────────────────────────────────────────────────────────

export interface NavigationItem {
  slug: string
  label: string
  section: string
  order: number
  href: string
}

export interface NavigationSection {
  slug: string
  label: string
  icon?: string
  order: number
  items: NavigationItem[]
}

// ─── Frontmatter ─────────────────────────────────────────────────────────────

export interface DocFrontmatter {
  title: string
  section: string
  sectionLabel: string
  order: number
  description: string
  status?: 'published' | 'draft'
  lastUpdated?: string
}

// ─── Conteúdo MDX ────────────────────────────────────────────────────────────

export interface MDXContent {
  content: string
  frontmatter: DocFrontmatter
  slug: string
  section: string
}

export interface DocMeta {
  slug: string
  section: string
  frontmatter: DocFrontmatter
}

// ─── Rota ────────────────────────────────────────────────────────────────────

export interface DocPageParams {
  section: string
  doc: string
}

// ─── Table of Contents ───────────────────────────────────────────────────────

export interface TOCItem {
  id: string
  text: string
  level: 2 | 3
}

// ─── Fase 2: Placeholders Supabase ──────────────────────────────────────────

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'viewer' | 'collaborator'
  createdAt: string
}

export interface DocComment {
  id: string
  docSlug: string
  section: string
  userId: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface DocAnnotation {
  id: string
  docSlug: string
  section: string
  userId: string
  selectedText: string
  note: string
  createdAt: string
}
