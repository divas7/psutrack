import React from 'react';
import Link from 'next/link';

export default function Login() {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      
      {/* Background decoration */}
      <div style={{ 
        position: 'absolute', top: '20%', left: '30%', width: '300px', height: '300px', 
        background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.2, zIndex: -1 
      }}></div>
      <div style={{ 
        position: 'absolute', bottom: '20%', right: '30%', width: '300px', height: '300px', 
        background: 'var(--secondary)', filter: 'blur(100px)', opacity: 0.2, zIndex: -1 
      }}></div>

      <div className="glass-card fade-in-up" style={{ width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
          <span>⚡</span>
          <span className="gradient-text">PSUTrack</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Welcome to PSUTrack</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Sign in to sync your watchlist</p>

        <button className="btn" style={{ width: '100%', background: '#fff', color: '#000', marginBottom: '24px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <Link href="/dashboard" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Sign In
          </Link>
        </form>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Don't have an account? <a href="#" style={{ color: 'var(--primary)', fontWeight: 500 }}>Sign up</a>
        </p>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.5 }}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
