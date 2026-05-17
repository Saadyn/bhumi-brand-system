import type { NavigationSection, NavigationItem } from '@/types'

export const NAVIGATION: NavigationSection[] = [
  {
    slug: 'investigacao',
    label: 'Investigação',
    order: 1,
    items: [
      { slug: 'auditoria-mercado', label: 'Auditoria de Mercado', section: 'investigacao', order: 1, href: '/investigacao/auditoria-mercado' },
      { slug: 'auditoria-negocio', label: 'Auditoria de Negócio', section: 'investigacao', order: 2, href: '/investigacao/auditoria-negocio' },
      { slug: 'auditoria-publico', label: 'Auditoria de Público', section: 'investigacao', order: 3, href: '/investigacao/auditoria-publico' },
      { slug: 'benchmarking', label: 'Benchmarking', section: 'investigacao', order: 4, href: '/investigacao/benchmarking' },
    ],
  },
  {
    slug: 'estrategia',
    label: 'Estratégia',
    order: 2,
    items: [
      { slug: 'posicionamento', label: 'Posicionamento', section: 'estrategia', order: 1, href: '/estrategia/posicionamento' },
      { slug: 'golden-circle', label: 'Golden Circle', section: 'estrategia', order: 2, href: '/estrategia/golden-circle' },
      { slug: 'plano-de-midia', label: 'Plano de Mídia', section: 'estrategia', order: 3, href: '/estrategia/plano-de-midia' },
    ],
  },
  {
    slug: 'publico',
    label: 'Público',
    order: 3,
    items: [
      { slug: 'buyer-persona', label: 'Buyer Persona', section: 'publico', order: 1, href: '/publico/buyer-persona' },
    ],
  },
  {
    slug: 'nucleo',
    label: 'Núcleo da Marca',
    order: 4,
    items: [
      { slug: 'nucleo-da-marca', label: 'Núcleo da Marca', section: 'nucleo', order: 1, href: '/nucleo/nucleo-da-marca' },
      { slug: 'roteiro-da-marca', label: 'Roteiro da Marca', section: 'nucleo', order: 2, href: '/nucleo/roteiro-da-marca' },
      { slug: 'virtudes-da-marca', label: 'Virtudes da Marca', section: 'nucleo', order: 3, href: '/nucleo/virtudes-da-marca' },
      { slug: 'arquetipos', label: 'Arquétipos', section: 'nucleo', order: 4, href: '/nucleo/arquetipos' },
      { slug: 'brand-persona', label: 'Brand Persona', section: 'nucleo', order: 5, href: '/nucleo/brand-persona' },
    ],
  },
  {
    slug: 'identidade-verbal',
    label: 'Identidade Verbal',
    order: 5,
    items: [
      { slug: 'tom-e-voz', label: 'Tom e Voz', section: 'identidade-verbal', order: 1, href: '/identidade-verbal/tom-e-voz' },
      { slug: 'naming', label: 'Naming', section: 'identidade-verbal', order: 2, href: '/identidade-verbal/naming' },
      { slug: 'vocabulario', label: 'Vocabulário', section: 'identidade-verbal', order: 3, href: '/identidade-verbal/vocabulario' },
      { slug: 'manifesto', label: 'Manifesto', section: 'identidade-verbal', order: 4, href: '/identidade-verbal/manifesto' },
      { slug: 'manual-verbal', label: 'Manual Verbal', section: 'identidade-verbal', order: 5, href: '/identidade-verbal/manual-verbal' },
    ],
  },
  {
    slug: 'identidade-visual',
    label: 'Identidade Visual',
    order: 6,
    items: [
      { slug: 'diretrizes-visuais', label: 'Diretrizes Visuais', section: 'identidade-visual', order: 1, href: '/identidade-visual/diretrizes-visuais' },
      { slug: 'moodboard-conceito', label: 'Moodboard & Conceito', section: 'identidade-visual', order: 2, href: '/identidade-visual/moodboard-conceito' },
      { slug: 'simbolos-logotipo', label: 'Símbolos & Logotipo', section: 'identidade-visual', order: 3, href: '/identidade-visual/simbolos-logotipo' },
      { slug: 'paleta-de-cores', label: 'Paleta de Cores', section: 'identidade-visual', order: 4, href: '/identidade-visual/paleta-de-cores' },
      { slug: 'tipografia', label: 'Tipografia', section: 'identidade-visual', order: 5, href: '/identidade-visual/tipografia' },
      { slug: 'grafismos', label: 'Grafismos', section: 'identidade-visual', order: 6, href: '/identidade-visual/grafismos' },
      { slug: 'direcao-de-imagem', label: 'Direção de Imagem', section: 'identidade-visual', order: 7, href: '/identidade-visual/direcao-de-imagem' },
      { slug: 'manual-visual', label: 'Manual Visual', section: 'identidade-visual', order: 8, href: '/identidade-visual/manual-visual' },
      { slug: 'aplicacoes', label: 'Aplicações', section: 'identidade-visual', order: 9, href: '/identidade-visual/aplicacoes' },
    ],
  },
  {
    slug: 'lancamento',
    label: 'Lançamento',
    order: 7,
    items: [
      { slug: 'plano-de-lancamento', label: 'Plano de Lançamento', section: 'lancamento', order: 1, href: '/lancamento/plano-de-lancamento' },
    ],
  },
]

export function getSectionBySlug(slug: string): NavigationSection | undefined {
  return NAVIGATION.find((s) => s.slug === slug)
}

export function getNavItem(section: string, doc: string): NavigationItem | undefined {
  const sec = getSectionBySlug(section)
  return sec?.items.find((i) => i.slug === doc)
}

export function getAdjacentDocs(
  section: string,
  doc: string
): { prev: NavigationItem | null; next: NavigationItem | null } {
  const allItems = NAVIGATION.flatMap((s) => s.items)
  const currentIndex = allItems.findIndex(
    (i) => i.section === section && i.slug === doc
  )
  return {
    prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
    next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null,
  }
}
