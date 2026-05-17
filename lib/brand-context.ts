import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { NAVIGATION } from '@/lib/navigation'

const CONTENT_DIR = path.join(process.cwd(), 'content')

let cached: string | null = null

export async function getBrandContext(): Promise<string> {
  if (cached) return cached

  const parts: string[] = [
    '# BHUMI BRAND SYSTEM — DIRETRIZES COMPLETAS\n',
    'Marca: Bhumi Athleisure & Wellness',
    'Fundadora: Kamila Quaresma',
    'Posicionamento: athleisure premium feminino, digital-first, Brasil',
    'Conceito: "corpo como solo sagrado" — Quiet Luxury Natural\n',
  ]

  for (const section of NAVIGATION) {
    parts.push(`\n## ${section.label}\n`)

    for (const item of section.items) {
      const filePath = path.join(CONTENT_DIR, section.slug, `${item.slug}.mdx`)
      try {
        const raw = await fs.readFile(filePath, 'utf-8')
        const { data, content } = matter(raw)
        parts.push(`### ${data.title ?? item.label}\n`)
        parts.push(content.trim())
        parts.push('\n')
      } catch {
        // file not found — skip silently
      }
    }
  }

  cached = parts.join('\n')
  return cached
}
