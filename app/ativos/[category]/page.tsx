import { notFound } from 'next/navigation'
import { getCategoryConfig } from '@/lib/assets-config'
import { getAssetsByCategory } from '@/app/ativos/actions'
import { AssetsBanner } from '@/components/assets/AssetsBanner'
import { AssetsToolbar } from '@/components/assets/AssetsToolbar'
import { AssetsGrid } from '@/components/assets/AssetsGrid'
import type { AssetCategory } from '@/types/assets'

interface PageProps {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const config = getCategoryConfig(category)
  if (!config) notFound()

  // Buscar assets reais do Supabase
  const assets = await getAssetsByCategory(config.slug as AssetCategory)

  return (
    <div>
      <AssetsBanner
        title={config.label}
        subtitle={config.description}
        accent={config.accent}
        category={config.slug}
      />
      <AssetsToolbar
        category={config.slug as AssetCategory}
        acceptedTypes={config.acceptedTypes}
        acceptedExtensions={config.acceptedExtensions}
      />
      <AssetsGrid assets={assets} category={config.slug as AssetCategory} />
    </div>
  )
}
