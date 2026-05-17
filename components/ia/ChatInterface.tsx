'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, isTextUIPart } from 'ai'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@/context/UserContext'
import { NAVIGATION } from '@/lib/navigation'

const QUICK_PROMPTS = [
  'Quais são as cores primárias da Bhumi?',
  'Como é o tom de voz da marca?',
  'Qual o posicionamento da Bhumi no mercado?',
  'Como descrever a Bhumi em uma frase?',
  'Quais são os arquétipos da marca?',
]

const SECTION_ICONS: Record<string, string> = {
  investigacao: '◎',
  estrategia: '◈',
  publico: '◉',
  nucleo: '✦',
  'identidade-verbal': '❋',
  'identidade-visual': '▣',
  lancamento: '◆',
}

export function ChatInterface() {
  const { profile } = useUser()
  const firstName = profile?.name?.split(' ')[0] ?? 'por aqui'
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })
  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const text = input.trim()
    if (!text || isLoading) return
    sendMessage({ text })
    setInput('')
  }

  const hasMessages = messages.length > 0

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-surface-dark)',
      color: 'var(--color-on-dark)',
    }}>

      {/* ── Chat messages area ─────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: hasMessages ? '40px 0' : '0',
      }}>
        {!hasMessages ? (
          /* ── Empty state ─────────────────────────────────────────────────── */
          <div style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '64px 48px 32px',
          }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#D4784E',
              marginBottom: '20px',
            }}>
              Inteligência de Marca
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '48px',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-1px',
              color: 'rgba(250,247,242,0.92)',
              marginBottom: '16px',
            }}>
              Oi {firstName}, como posso<br />
              <span style={{ fontStyle: 'italic', color: '#D4784E' }}>te ajudar hoje?</span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'rgba(250,247,242,0.45)',
              maxWidth: '520px',
              marginBottom: '48px',
            }}>
              Sou a inteligência de marca da Bhumi. Respondo dúvidas, monto estratégias
              e oriento decisões com base nas diretrizes completas da marca.
            </p>

            {/* Quick prompts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    fontWeight: 400,
                    padding: '7px 14px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'transparent',
                    color: 'rgba(250,247,242,0.55)',
                    cursor: 'pointer',
                    transition: 'border-color 150ms, color 150ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,120,78,0.5)'
                    e.currentTarget.style.color = 'rgba(250,247,242,0.85)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.color = 'rgba(250,247,242,0.55)'
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Section cards */}
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(250,247,242,0.2)',
              marginBottom: '16px',
            }}>
              Explorar diretrizes
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '10px',
            }}>
              {NAVIGATION.map((section) => (
                <Link
                  key={section.slug}
                  href={`/${section.slug}/${section.items[0]?.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: 'rgba(255,255,255,0.02)',
                      transition: 'border-color 150ms, background 150ms',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(212,120,78,0.25)'
                      e.currentTarget.style.background = 'rgba(212,120,78,0.04)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                    }}
                  >
                    <span style={{ display: 'block', fontSize: '18px', marginBottom: '10px', color: '#D4784E' }}>
                      {SECTION_ICONS[section.slug] ?? '◇'}
                    </span>
                    <span style={{
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'rgba(250,247,242,0.75)',
                      marginBottom: '4px',
                    }}>
                      {section.label}
                    </span>
                    <span style={{
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      color: 'rgba(250,247,242,0.28)',
                    }}>
                      {section.items.length} {section.items.length === 1 ? 'doc' : 'docs'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* ── Message thread ───────────────────────────────────────────────── */
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 48px' }}>
            {messages.map((msg) => {
              const textPart = msg.parts.find(isTextUIPart)
              const text = textPart?.text ?? ''
              const isUser = msg.role === 'user'
              return (
                <div
                  key={msg.id}
                  style={{
                    marginBottom: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: isUser ? '#D4784E' : 'rgba(250,247,242,0.25)',
                    marginBottom: '8px',
                  }}>
                    {isUser ? 'Você' : 'Bhumi IA'}
                  </span>
                  <div style={{
                    maxWidth: '580px',
                    padding: isUser ? '12px 16px' : '0',
                    borderRadius: '12px',
                    background: isUser ? 'rgba(212,120,78,0.12)' : 'transparent',
                    border: isUser ? '1px solid rgba(212,120,78,0.2)' : 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: isUser ? 'rgba(250,247,242,0.85)' : 'rgba(250,247,242,0.7)',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {text}
                  </div>
                </div>
              )
            })}

            {isLoading && (
              <div style={{ marginBottom: '32px' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'rgba(250,247,242,0.25)',
                  display: 'block',
                  marginBottom: '8px',
                }}>Bhumi IA</span>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: '#D4784E', display: 'inline-block',
                      animation: `bhumipulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div style={{
                marginBottom: '16px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(139,44,44,0.15)',
                border: '1px solid rgba(139,44,44,0.35)',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'rgba(250,200,200,0.85)',
              }}>
                Erro ao conectar: {error.message}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ── Input area ────────────────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 48px 28px',
        background: 'var(--color-surface-dark)',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Pergunte sobre a marca, identidade visual, tom de voz..."
            rows={3}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '16px 110px 16px 18px',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 300,
              color: 'rgba(250,247,242,0.8)',
              resize: 'none',
              outline: 'none',
              lineHeight: 1.6,
              transition: 'border-color 150ms',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(212,120,78,0.4)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              position: 'absolute',
              right: '12px',
              bottom: '12px',
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              background: input.trim() && !isLoading ? '#B85C38' : 'rgba(255,255,255,0.06)',
              color: input.trim() && !isLoading ? '#FAF7F2' : 'rgba(250,247,242,0.25)',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              cursor: input.trim() && !isLoading ? 'pointer' : 'default',
              transition: 'background 150ms, color 150ms',
            }}
          >
            Enviar
          </button>
        </div>
        <p style={{
          maxWidth: '720px',
          margin: '10px auto 0',
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          color: 'rgba(250,247,242,0.15)',
          textAlign: 'center',
        }}>
          Enter para enviar · Shift+Enter para nova linha
        </p>
      </div>

      <style>{`
        @keyframes bhumipulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
