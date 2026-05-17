import { cn } from '@/lib/utils'

interface ContentAreaProps {
  children: React.ReactNode
  className?: string
}

export function ContentArea({ children, className }: ContentAreaProps) {
  return (
    <div
      className={cn('animate-fade-in', className)}
      style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 64px 96px' }}
    >
      {children}
    </div>
  )
}
