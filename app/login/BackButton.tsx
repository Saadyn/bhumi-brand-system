'use client'

import { useState } from 'react'

export function BackButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={() => window.history.back()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: hovered ? '#3A3A3A' : '#2A2A2A',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        transition: 'background 200ms',
        color: '#FFFFFF',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
