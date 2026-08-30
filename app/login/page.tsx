"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { user, signIn } = useAuth();

  if (user) {
    return (
      <div style={{ minHeight: 'calc(100vh - 90px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="card" style={{ padding: '32px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-1)', marginBottom: '12px' }}>You're signed in</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', marginBottom: '20px' }}>{user.email}</p>
          <Link href="/dashboard" className="btn btn-primary" style={{ width: '100%' }}>
            Go to Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 90px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="card" style={{ padding: '36px', maxWidth: '420px', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '6px' }}>
            <span className="gradient-text">⚡ PSUTrack</span>
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-3)' }}>
            Track every PSU recruitment. Never miss a deadline.
          </p>
        </div>

        <button
          onClick={signIn}
          className="btn btn-ghost"
          style={{
            width: '100%',
            padding: '12px',
            background: '#fff',
            color: '#18181B',
            fontWeight: 600,
            fontSize: '0.9rem',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="divider" style={{ flex: 1 }} />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>or continue with email</span>
          <div className="divider" style={{ flex: 1 }} />
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="label" style={{ display: 'block', marginBottom: '6px' }}>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="label" style={{ display: 'block', marginBottom: '6px' }}>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '11px', marginTop: '6px' }}>
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-3)' }}>
          By signing in, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
