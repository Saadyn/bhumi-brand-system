import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import type { DocFrontmatter, MDXContent, DocMeta, NavigationSection } from '@/types'
import { NAVIGATION, getAdjacentDocs } from '@/lib/navigation'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export async function getAllDocs(): Promise<DocMeta[]> {
  const docs: DocMeta[] = []

  for (const section of NAVIGATION) {
    const sectionDir = path.join(CONTENT_DIR, section.slug)

    for (const item of section.items) {
      const filePath = path.join(sectionDir, `${item.slug}.mdx`)

      try {
        const raw = await fs.readFile(filePath, 'utf-8')
        const { data } = matter(raw)
        const frontmatter = data as DocFrontmatter

        if (process.env.NODE_ENV === 'production' && frontmatter.status === 'draft') {
          continue
        }

        docs.push({ slug: item.slug, section: section.slug, frontmatter })
      } catch {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[MDX] Arquivo não encontrado: ${filePath}`)
        }
      }
    }
  }

  return docs
}

export async function getDocBySlug(section: string, slug: string): Promise<MDXContent> {
  const filePath = path.join(CONTENT_DIR, section, `${slug}.mdx`)
  const raw = await fs.readFile(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    content,
    frontmatter: data as DocFrontmatter,
    slug,
    section,
  }
}

export async function getDocNavigation(): Promise<NavigationSection[]> {
  if (process.env.NODE_ENV === 'production') {
    const publishedDocs = await getAllDocs()
    const publishedSlugs = new Set(
      publishedDocs.map((d) => `${d.section}/${d.slug}`)
    )

    return NAVIGATION.map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        publishedSlugs.has(`${section.slug}/${item.slug}`)
      ),
    })).filter((section) => section.items.length > 0)
  }

  return NAVIGATION
}

export function extractHeadings(
  content: string
): Array<{ id: string; text: string; level: 2 | 3 }> {
  const lines = content.split('\n')
  const headings: Array<{ id: string; text: string; level: 2 | 3 }> = []

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/)
    const h3Match = line.match(/^###\s+(.+)$/)

    if (h2Match) {
      const text = h2Match[1].trim()
      headings.push({ id: slugify(text), text, level: 2 })
    } else if (h3Match) {
      const text = h3Match[1].trim()
      headings.push({ id: slugify(text), text, level: 3 })
    }
  }

  return headings
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export { getAdjacentDocs }
