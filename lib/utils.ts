import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Mescla classes Tailwind com suporte a condicionais.
 * @example cn('px-4 py-2', isActive && 'bg-terra text-raiz')
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
