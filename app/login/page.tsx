import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from './LoginForm'
import { BackButton } from './BackButton'

export const metadata: Metadata = {
  title: 'Entrar — Bhumi Brand System',
}

export default function LoginPage() {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: '#0A0A0A',
    }}>
      {/* ── Painel esquerdo — imagem ─────────────────────────────── */}
      <div style={{
        width: '45%',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 20px 20px 0',
      }}
        className="hidden md:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/login-bg.jpg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Badge da marca */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px',
          padding: '6px 12px',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '1px',
          }}>
            bhumi
          </span>
        </div>

        {/* Caption */}
        <p style={{
          position: 'absolute',
          bottom: '16px',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.45)',
          margin: 0,
        }}>
          Imagem gerada com Adobe Firefly
        </p>
      </div>

      {/* ── Painel direito — formulário ──────────────────────────── */}
      <div style={{
        flex: 1,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px',
      }}>
        <div style={{ maxWidth: '400px' }}>

          {/* Botão voltar */}
          <BackButton />

          {/* Título */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '38px',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#FFFFFF',
            marginBottom: '32px',
          }}>
            Acesse sua conta<br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
              e explore a marca
            </span>
          </h1>

          {/* Formulário */}
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>

          {/* Termos */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            color: '#5A5A5A',
            marginTop: '20px',
            lineHeight: 1.6,
          }}>
            Ao entrar, você concorda com os termos de uso<br />
            e a política de privacidade da Bhumi.
          </p>
        </div>
      </div>
    </div>
  )
}
