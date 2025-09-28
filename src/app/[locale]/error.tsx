'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '1rem'
    }}>
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          border: '1px solid currentColor',
          background: 'transparent',
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  )
}