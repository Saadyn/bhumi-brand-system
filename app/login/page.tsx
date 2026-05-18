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

        {/* Badge com logo SVG */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/bhumi-icon.svg"
            alt="Bhumi"
            style={{ height: '28px', width: 'auto' }}
          />
        </div>

        {/* Efeito de luz cinematográfico na borda direita */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80px',
          height: '100%',
          background: 'linear-gradient(to right, transparent, rgba(255,235,210,0.07) 60%, rgba(255,235,210,0.18) 85%, rgba(255,235,210,0.28) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '-6px',
          width: '12px',
          height: '70%',
          background: 'rgba(255,230,190,0.22)',
          filter: 'blur(6px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Painel direito — formulário ──────────────────────────── */}
      <div style={{
        flex: 1,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 48px',
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

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
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>
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
