import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllDocs, getDocBySlug, getDocNavigation, getAdjacentDocs } from '@/lib/mdx'
import { BrandLayout } from '@/components/layout/BrandLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { ContentArea } from '@/components/mdx/ContentArea'
import { MDXRenderer } from '@/components/mdx/MDXRenderer'
import type { DocPageParams } from '@/types'

interface PageProps {
  params: Promise<DocPageParams>
}

export async function generateStaticParams() {
  const docs = await getAllDocs()
  return docs.map((doc) => ({ section: doc.section, doc: doc.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, doc } = await params
  try {
    const { frontmatter } = await getDocBySlug(section, doc)
    return { title: frontmatter.title, description: frontmatter.description }
  } catch {
    return { title: 'Documento não encontrado' }
  }
}

export default async function DocPage({ params }: PageProps) {
  const { section, doc } = await params

  let docData
  try {
    docData = await getDocBySlug(section, doc)
  } catch {
    notFound()
  }

  const navigation = await getDocNavigation()
  const adjacent = getAdjacentDocs(section, doc)

  return (
    <BrandLayout navigation={navigation} activeSection={section} activeDoc={doc}>
      <ContentArea>
        <PageHeader
          title={docData.frontmatter.title}
          description={docData.frontmatter.description}
          sectionLabel={docData.frontmatter.sectionLabel}
        />
        <MDXRenderer source={docData.content} />

        {/* prev/next — DESIGN.md: body-sm / muted */}
        <nav style={{
          marginTop: '80px', paddingTop: '32px',
          borderTop: '1px solid var(--color-hairline)',
          display: 'flex', justifyContent: 'space-between', gap: '16px',
        }}>
          {adjacent.prev ? (
            <a href={adjacent.prev.href} style={{ textDecoration: 'none', maxWidth: '240px' }}>
              <span style={{
                display: 'block', fontFamily: 'var(--font-sans)', fontSize: '11px',
                fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: 'var(--color-muted-soft)', marginBottom: '4px',
              }}>← Anterior</span>
              <span style={{
                display: 'block', fontFamily: 'var(--font-sans)', fontSize: '14px',
                fontWeight: 400, color: 'var(--color-muted)',
              }}>{adjacent.prev.label}</span>
            </a>
          ) : <div />}

          {adjacent.next && (
            <a href={adjacent.next.href} style={{ textDecoration: 'none', maxWidth: '240px', textAlign: 'right' }}>
              <span style={{
                display: 'block', fontFamily: 'var(--font-sans)', fontSize: '11px',
                fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: 'var(--color-muted-soft)', marginBottom: '4px',
              }}>Próximo →</span>
              <span style={{
                display: 'block', fontFamily: 'var(--font-sans)', fontSize: '14px',
                fontWeight: 400, color: 'var(--color-muted)',
              }}>{adjacent.next.label}</span>
            </a>
          )}
        </nav>
      </ContentArea>
    </BrandLayout>
  )
}
