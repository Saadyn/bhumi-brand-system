import { requireAuth } from '@/lib/auth'
import { UserProvider } from '@/context/UserContext'

export default async function BrandGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()
  return <UserProvider user={user}>{children}</UserProvider>
}
