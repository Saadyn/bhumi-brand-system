import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

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
      position: 'relative',
    }}>
      {/* ── Painel esquerdo — imagem ─────────────────────────────── */}
      <div style={{
        width: '45%',
        flexShrink: 0,
        position: 'relative',
        borderRadius: '0 20px 20px 0',
        overflow: 'hidden',
      }}
        className="hidden md:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/login-bg.jpg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Logo sem fundo */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/bhumi-icon.svg"
            alt="Bhumi"
            style={{
              height: '32px',
              width: 'auto',
              filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.5))',
            }}
          />
        </div>
      </div>

      {/* ── Luz cinematográfica — sangra para fora do retângulo ─── */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          left: 'calc(45% - 60px)',
          top: '0',
          width: '120px',
          height: '100%',
          background: 'radial-gradient(ellipse 60px 55% at 50% 42%, rgba(195,110,55,0.32) 0%, rgba(180,90,40,0.14) 45%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 10,
          filter: 'blur(4px)',
        }}
      />
      {/* Fio de luz — linha brilhante na costura */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          left: 'calc(45% - 1px)',
          top: '8%',
          width: '2px',
          height: '84%',
          background: 'linear-gradient(to bottom, transparent, rgba(220,140,70,0.55) 20%, rgba(240,170,90,0.75) 45%, rgba(220,140,70,0.55) 75%, transparent)',
          pointerEvents: 'none',
          zIndex: 11,
          filter: 'blur(2px)',
          borderRadius: '99px',
        }}
      />

      {/* ── Painel direito — formulário ──────────────────────────── */}
      <div style={{
        flex: 1,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 48px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

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
