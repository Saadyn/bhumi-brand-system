import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Entrar — Bhumi Brand System',
}

export default function LoginPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Card de login — lado esquerdo ~40% */}
      <div className="w-full max-w-md flex-shrink-0 flex items-center justify-center p-8 bg-surface">
        <div
          className="w-full max-w-sm bg-raiz rounded-2xl p-12"
          style={{ boxShadow: '0 8px 32px rgba(43,27,20,0.12)' }}
        >
          {/* Logo */}
          <div className="mb-8 text-center">
            <span className="font-vemina text-3xl text-terra tracking-wide">BHUMI</span>
            <p className="text-xs text-escuro/40 font-helvetica mt-1 tracking-widest uppercase">
              Athleisure & Wellness
            </p>
          </div>

          {/* Título */}
          <div className="mb-8">
            <h1 className="font-vemina text-xl text-solo-noturno mb-1">
              Acesse o Brand System
            </h1>
            <p className="text-sm text-escuro/50 font-helvetica">
              Entre com suas credenciais
            </p>
          </div>

          {/* Formulário */}
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>

          <p className="mt-4 text-center">
            <a href="#" className="text-sm text-escuro/40 hover:text-terra font-helvetica transition-colors">
              Esqueci minha senha
            </a>
          </p>
        </div>
      </div>

      {/* Gradient animation — lado direito ~60% */}
      <div className="flex-1 gradient-bg hidden md:block" aria-hidden="true" />
    </div>
  )
}
