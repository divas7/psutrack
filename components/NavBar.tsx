'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="announcement-bar">
        <span className="pulse-dot" />
        <span>Updated 2× daily</span>
        <span style={{ color: '#3F3F46' }}>·</span>
        <span>Last checked: Aug 31, 2026, 8:00 AM IST</span>
        <span style={{ color: '#3F3F46' }}>·</span>
        <span>50+ PSUs tracked</span>
      </div>

      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: '34px', zIndex: 100,
        height: '56px',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '1.1rem' }}>
          <span className="gradient-text">⚡ PSUTrack</span>
        </Link>

        {/* Desktop center links */}
        <div className="nav-links" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Link href="/explore" className="nav-link">Explore</Link>
          <Link href="/dashboard" className="nav-link">Dashboard</Link>
        </div>

        {/* Desktop right actions */}
        <div className="nav-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link href="/login" className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '7px 14px' }}>Sign In</Link>
          <Link href="/login" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '7px 14px' }}>Get Started</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: 'var(--text-2)', cursor: 'pointer', fontSize: '1.2rem', padding: '4px' }}
        >{open ? '✕' : '☰'}</button>

        {/* Mobile dropdown */}
        {open && (
          <div style={{
            position: 'absolute', top: '56px', left: 0, right: 0,
            background: 'var(--bg)', borderBottom: '1px solid var(--border)',
            padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            <Link href="/explore" onClick={() => setOpen(false)} style={{ color: 'var(--text-2)', fontWeight: 500 }}>Explore</Link>
            <Link href="/dashboard" onClick={() => setOpen(false)} style={{ color: 'var(--text-2)', fontWeight: 500 }}>Dashboard</Link>
            <div style={{ display: 'flex', gap: '8px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
              <Link href="/login" onClick={() => setOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Sign In</Link>
              <Link href="/login" onClick={() => setOpen(false)} className="btn btn-primary" style={{ flex: 1 }}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        .nav-link {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-2);
          font-weight: 500;
          transition: color 0.15s, background 0.15s;
        }
        .nav-link:hover {
          color: var(--text-1);
          background: var(--surface-2);
        }
        .nav-hamburger { display: none; }
        @media (max-width: 640px) {
          .nav-links, .nav-actions { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
