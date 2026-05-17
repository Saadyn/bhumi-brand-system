interface PageHeaderProps {
  title: string
  description?: string
  sectionLabel: string
}

export function PageHeader({ title, description, sectionLabel }: PageHeaderProps) {
  return (
    <div className="mb-14">
      {/* caption-uppercase — 12px / 500 / 1.5px tracking */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--color-primary)',
        marginBottom: '20px',
      }}>
        {sectionLabel}
      </p>

      {/* display-md — Cormorant 36px / 400 / -0.5px tracking */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '40px',
        fontWeight: 400,
        lineHeight: 1.15,
        letterSpacing: '-0.5px',
        color: 'var(--color-ink)',
        marginBottom: '16px',
      }}>
        {title}
      </h1>

      {/* 48px terracota line — brand divider */}
      <div style={{
        width: '48px',
        height: '1px',
        background: 'var(--color-primary)',
        margin: '20px 0',
      }} />

      {description && (
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: 1.65,
          color: 'var(--color-muted)',
          maxWidth: '640px',
        }}>
          {description}
        </p>
      )}
    </div>
  )
}
