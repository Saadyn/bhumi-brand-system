import type { MDXComponents as MDXComponentsType } from 'mdx/types'

// Tokens from DESIGN.md
const T = {
  ink:       'var(--color-ink)',
  body:      'var(--color-body)',
  muted:     'var(--color-muted)',
  mutedSoft: 'var(--color-muted-soft)',
  primary:   'var(--color-primary)',
  canvas:    'var(--color-canvas)',
  card:      'var(--color-surface-card)',
  dark:      'var(--color-surface-dark)',
  darkEl:    'var(--color-surface-dark-el)',
  hairline:  'var(--color-hairline)',
  hairlineSoft: 'var(--color-hairline-soft)',
  onDark:    'var(--color-on-dark)',
  onDarkSoft:'var(--color-on-dark-soft)',
  pale:      'var(--color-primary-pale)',
  display:   'var(--font-display)',
  sans:      'var(--font-sans)',
  mono:      'var(--font-mono)',
}

export const mdxComponents: MDXComponentsType = {
  // display-md — 36px Cormorant / -0.5px tracking
  h1: ({ children, ...props }) => (
    <h1 style={{
      fontFamily: T.display, fontSize: '36px', fontWeight: 400,
      lineHeight: 1.15, letterSpacing: '-0.5px', color: T.ink,
      marginTop: 0, marginBottom: '20px',
      paddingBottom: '16px', borderBottom: `1px solid ${T.hairline}`,
    }} {...props}>{children}</h1>
  ),

  // display-sm — 28px Cormorant / -0.3px tracking
  h2: ({ children, id, ...props }) => (
    <h2 id={id} style={{
      fontFamily: T.display, fontSize: '28px', fontWeight: 400,
      lineHeight: 1.2, letterSpacing: '-0.3px', color: T.ink,
      marginTop: '56px', marginBottom: '16px',
    }} {...props}>{children}</h2>
  ),

  // caption-uppercase — 11px sans / 500 / 2px tracking / primary
  h3: ({ children, id, ...props }) => (
    <h3 id={id} style={{
      fontFamily: T.sans, fontSize: '11px', fontWeight: 500,
      letterSpacing: '2px', textTransform: 'uppercase', color: T.primary,
      marginTop: '40px', marginBottom: '10px',
    }} {...props}>{children}</h3>
  ),

  h4: ({ children, ...props }) => (
    <h4 style={{
      fontFamily: T.sans, fontSize: '14px', fontWeight: 500,
      lineHeight: 1.4, color: T.ink,
      marginTop: '24px', marginBottom: '8px',
    }} {...props}>{children}</h4>
  ),

  // body-md — 16px / 400 / 1.55
  p: ({ children, ...props }) => (
    <p style={{
      fontFamily: T.sans, fontSize: '16px', fontWeight: 400,
      lineHeight: 1.65, color: T.body, marginBottom: '20px',
    }} {...props}>{children}</p>
  ),

  // callout-card style — primary-pale bg, primary left border, 12px radius
  blockquote: ({ children, ...props }) => (
    <blockquote style={{
      background: T.pale,
      borderLeft: `3px solid ${T.primary}`,
      borderRadius: '0 12px 12px 0',
      padding: '16px 24px',
      margin: '32px 0',
      fontFamily: T.display,
      fontStyle: 'italic',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: 1.65,
      color: T.ink,
    }} {...props}>{children}</blockquote>
  ),

  // table — dark header (surface-dark), cream rows, hairline borders, 12px radius
  table: ({ children, ...props }) => (
    <div style={{
      overflowX: 'auto', margin: '32px 0',
      borderRadius: '12px',
      border: `1px solid ${T.hairline}`,
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} {...props}>{children}</table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead style={{ background: T.dark }} {...props}>{children}</thead>
  ),

  th: ({ children, ...props }) => (
    <th style={{
      textAlign: 'left', padding: '12px 16px',
      fontFamily: T.sans, fontSize: '11px', fontWeight: 500,
      letterSpacing: '1.5px', textTransform: 'uppercase',
      color: T.onDarkSoft,
    }} {...props}>{children}</th>
  ),

  td: ({ children, ...props }) => (
    <td style={{
      padding: '11px 16px',
      fontFamily: T.sans, fontSize: '14px', fontWeight: 400,
      lineHeight: 1.55, color: T.muted,
      borderBottom: `1px solid ${T.hairlineSoft}`,
    }} {...props}>{children}</td>
  ),

  tr: ({ children, ...props }) => (
    <tr className="hover:bg-surface-card transition-colors" {...props}>{children}</tr>
  ),

  ul: ({ children, ...props }) => (
    <ul style={{ margin: '20px 0', padding: 0, listStyle: 'none' }} {...props}>{children}</ul>
  ),

  ol: ({ children, ...props }) => (
    <ol style={{
      margin: '20px 0', paddingLeft: '20px',
      fontFamily: T.sans, fontSize: '16px', color: T.body,
    }} {...props}>{children}</ol>
  ),

  li: ({ children, ...props }) => (
    <li style={{
      display: 'flex', gap: '12px', alignItems: 'flex-start',
      fontFamily: T.sans, fontSize: '16px', fontWeight: 400,
      lineHeight: 1.65, color: T.body, marginBottom: '8px',
    }} {...props}>
      <span style={{ color: T.primary, flexShrink: 0, marginTop: '2px', fontSize: '12px' }}>—</span>
      <span>{children}</span>
    </li>
  ),

  strong: ({ children, ...props }) => (
    <strong style={{ fontWeight: 500, color: T.ink }} {...props}>{children}</strong>
  ),

  em: ({ children, ...props }) => (
    <em style={{ fontFamily: T.display, fontStyle: 'italic', color: T.muted }} {...props}>{children}</em>
  ),

  hr: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '48px 0' }}>
      <div style={{ flex: 1, height: '1px', background: T.hairline }} />
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: T.primary, opacity: 0.45 }} />
      <div style={{ flex: 1, height: '1px', background: T.hairline }} />
    </div>
  ),

  a: ({ children, href, ...props }) => (
    <a href={href} style={{
      color: T.primary,
      textDecoration: 'underline',
      textDecorationColor: 'rgba(184,92,56,0.35)',
      textUnderlineOffset: '3px',
    }} {...props}>{children}</a>
  ),

  // inline code — primary-pale bg, 6px radius
  // block code — passed through to pre
  code: ({ children, className, ...props }) => {
    if (className) return <code className={className} {...props}>{children}</code>
    return (
      <code style={{
        fontFamily: T.mono, fontSize: '13px',
        background: T.pale, color: 'var(--color-primary-active)',
        padding: '2px 6px', borderRadius: '6px',
      }} {...props}>{children}</code>
    )
  },

  // code-window-card style — surface-dark bg, 12px radius, hairline border
  pre: ({ children, ...props }) => (
    <pre style={{
      fontFamily: T.mono, fontSize: '14px',
      lineHeight: 1.6, fontWeight: 400,
      background: T.dark,
      border: `1px solid rgba(255,255,255,0.06)`,
      borderRadius: '12px',
      padding: '24px',
      overflowX: 'auto',
      margin: '32px 0',
      color: 'rgba(250,247,242,0.85)',
    }} {...props}>{children}</pre>
  ),
}
