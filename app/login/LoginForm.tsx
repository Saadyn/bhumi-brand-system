'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { loginWithEmail } from './actions'

const initialState = { error: null as string | null }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-12 bg-terra text-raiz rounded-lg font-helvetica font-medium text-base hover:bg-solo-noturno transition-colors disabled:cursor-not-allowed disabled:opacity-70 mt-2"
    >
      {pending ? 'Entrando…' : 'Entrar'}
    </button>
  )
}

export function LoginForm() {
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/'
  const [state, formAction] = useActionState(loginWithEmail, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label className="block text-sm font-medium text-escuro/70 font-helvetica mb-1.5">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="seu@email.com"
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-escuro placeholder:text-escuro/30 font-helvetica text-base focus:outline-none focus:border-terra focus:border-2 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-escuro/70 font-helvetica mb-1.5">
          Senha
        </label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-escuro placeholder:text-escuro/30 font-helvetica text-base focus:outline-none focus:border-terra focus:border-2 transition-colors"
        />
      </div>

      {state.error && (
        <p className="text-sm text-error font-helvetica" role="alert">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}
