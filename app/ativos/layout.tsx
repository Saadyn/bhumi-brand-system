import type { Metadata } from 'next'
import { requireAuth } from '@/lib/auth'
import { UserProvider } from '@/context/UserContext'
import { AssetsProvider } from '@/context/AssetsContext'
import { AssetsLayout } from '@/components/assets/AssetsLayout'

export const metadata: Metadata = {
  title: 'Ativos da Marca · Bhumi Brand System',
}

export default async function AtivosLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth()
  return (
    <UserProvider user={user}>
      <AssetsProvider>
        <AssetsLayout>{children}</AssetsLayout>
      </AssetsProvider>
    </UserProvider>
  )
}
