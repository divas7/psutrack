'use client';

import Link from 'next/link';

export default function NavBar() {
  return (
    <>
      <div className="announcement-bar">
        <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
        <span>Data updated 2× daily • Last checked: Aug 31, 2026, 8:00 AM IST • 50+ PSUs tracked</span>
      </div>
      <nav style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        background: 'rgba(8, 11, 20, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: '32px',
        zIndex: 100
      }}>
        <div>
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.5px' }} className="gradient-text">
            ⚡ PSUTrack
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/explore" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>Explore</Link>
          <Link href="/dashboard" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>Dashboard</Link>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/login" className="btn btn-ghost" style={{ padding: '6px 16px', fontSize: '0.9rem' }}>Sign In</Link>
          <Link href="/login" className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.9rem' }}>Get Started</Link>
        </div>
      </nav>
    </>
  );
}
