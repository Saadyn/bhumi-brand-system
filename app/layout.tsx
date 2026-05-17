import type { Metadata } from 'next'
import { cormorant, dmSans, dmMono } from '@/lib/fonts'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Brand System — Bhumi',
    template: '%s · Bhumi Brand System',
  },
  description: 'Sistema de diretrizes de marca da Bhumi Athleisure & Wellness.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-raiz text-escuro antialiased">
        {children}
      </body>
    </html>
  )
}
