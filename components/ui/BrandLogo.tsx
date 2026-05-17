import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
}

const sizes = {
  sm: { container: 'w-6 h-6 text-[10px]', text: 'text-xs', sub: 'hidden' },
  md: { container: 'w-7 h-7 text-xs', text: 'text-sm', sub: 'text-[10px]' },
  lg: { container: 'w-10 h-10 text-sm', text: 'text-base', sub: 'text-xs' },
}

export function BrandLogo({ size = 'md', href = '/', className }: BrandLogoProps) {
  const s = sizes[size]

  return (
    <Link href={href} className={cn('flex items-center gap-2.5 group', className)}>
      <div
        className={cn(
          'bg-terra rounded-sm flex items-center justify-center text-raiz font-bold font-vemina flex-shrink-0',
          s.container
        )}
      >
        B!
      </div>
      <div>
        <span className={cn('font-vemina text-terra block leading-none tracking-wide', s.text)}>
          BHUMI
        </span>
        <span className={cn('text-escuro/40 font-helvetica leading-none tracking-wider', s.sub)}>
          Brand System
        </span>
      </div>
    </Link>
  )
}
