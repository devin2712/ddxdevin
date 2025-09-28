// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" style={{
          position: 'absolute',
          top: '-40px',
          left: '6px',
          background: '#000',
          color: '#fff',
          padding: '8px',
          textDecoration: 'none',
          zIndex: 100,
          borderRadius: '4px',
          fontWeight: 'bold'
        }} onFocus={(e) => e.target.style.top = '6px'} onBlur={(e) => e.target.style.top = '-40px'}>
          Skip to content
        </a>
        <main id="main-content" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: '1rem',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center'
        }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/en" style={{ textDecoration: 'underline' }}>
            ← Return Home
          </Link>
        </main>
      </body>
    </html>
  );
}
