"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '64px',
      background: 'rgba(8,11,20,0.8)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>⚡</span>
          <span className="gradient-text">PSUTrack</span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <div style={{ display: 'none', gap: '24px', alignItems: 'center' }} className="desktop-nav">
        <a href="/explore" style={{ color: 'var(--text-muted)', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>Explore</a>
        <a href="/dashboard" style={{ color: 'var(--text-muted)', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>Dashboard</a>
      </div>

      <div style={{ display: 'none', gap: '12px', alignItems: 'center' }} className="desktop-nav">
        <Link href="/login" className="btn btn-ghost" style={{ padding: '6px 16px', fontSize: '0.9rem' }}>Sign In</Link>
        <Link href="/login" className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.9rem' }}>Get Started</Link>
      </div>

      {/* Mobile Hamburger */}
      <div style={{ display: 'flex' }} className="mobile-menu-btn">
        <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '64px',
          left: 0,
          right: 0,
          background: 'var(--bg-color)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <a href="/explore" onClick={() => setIsOpen(false)}>Explore</a>
          <a href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</a>
          <hr style={{ borderTop: '1px solid var(--border)', borderBottom: 'none' }} />
          <Link href="/login" onClick={() => setIsOpen(false)} style={{ padding: '8px 0' }}>Sign In</Link>
          <Link href="/login" onClick={() => setIsOpen(false)} style={{ color: 'var(--primary)' }}>Get Started</Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
