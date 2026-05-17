interface AssetsBannerProps {
  title: string
  subtitle: string
  accent: string
  category: string
}

export function AssetsBanner({ title, subtitle, accent, category }: AssetsBannerProps) {
  return (
    <>
      <style>{`
        @keyframes gradient-aurora {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div
        style={{
          background: `linear-gradient(-45deg, #1E140F, #3D2B1F, ${accent}99, #591B07, #B85C38, #3D2B1F)`,
          backgroundSize: '400% 400%',
          animation: 'gradient-aurora 12s ease infinite',
          height: '180px',
          padding: '0 48px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Noise overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: '200px 200px',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(250,247,242,0.45)',
            marginBottom: '8px',
          }}
        >
          {category}
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '42px',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--color-on-dark)',
            margin: '0 0 6px',
            lineHeight: 1.05,
            letterSpacing: '-0.5px',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(250,247,242,0.6)',
            margin: 0,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>
      </div>
    </>
  )
}
