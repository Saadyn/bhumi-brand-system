import type { Metadata } from 'next'
import { getDocNavigation } from '@/lib/mdx'
import { BrandLayout } from '@/components/layout/BrandLayout'
import { ChatInterface } from '@/components/ia/ChatInterface'

export const metadata: Metadata = {
  title: 'Inteligência de Marca — Bhumi',
  description: 'Converse com a inteligência de marca da Bhumi',
}

export default async function IAPage() {
  const navigation = await getDocNavigation()

  return (
    <BrandLayout navigation={navigation} activeSection="ia" activeDoc="">
      <div style={{ height: '100%' }}>
        <ChatInterface />
      </div>
    </BrandLayout>
  )
}
