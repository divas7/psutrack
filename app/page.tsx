import React from 'react';
import Link from 'next/link';
import { PSUS } from '../lib/data';
import PSUCard from '../components/PSUCard';
import PhasePipeline from '../components/PhasePipeline';

export default function Home() {
  const samplePsu = PSUS.find(p => p.slug === 'ongc')!;
  
  return (
    <div style={{ position: 'relative' }}>
      {/* Background Effect */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, right: 0, height: '800px', 
        background: 'radial-gradient(circle at 50% 0%, rgba(79, 110, 247, 0.15), transparent 70%)',
        zIndex: -1 
      }}></div>

      {/* Hero Section */}
      <section style={{ padding: '80px 24px', textAlign: 'center', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="fade-in-up">
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>
          Track Every PSU Recruitment.<br />
          <span className="gradient-text">All in One Place.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '700px', lineHeight: 1.6 }}>
          Stop checking 30 websites every week. PSUTrack monitors 50+ PSUs and notifies you the moment anything changes.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/explore" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            Explore PSUs &rarr;
          </Link>
          <a href="#how-it-works" className="btn btn-ghost" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            How it works
          </a>
        </div>
        
        <div style={{ marginTop: '48px', padding: '16px 32px', background: 'rgba(255,255,255,0.03)', borderRadius: '100px', border: '1px solid var(--border)', display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <span>🏢 50+ PSUs Tracked</span>
          <span>👑 14 Maharatnas</span>
          <span>⚡ Live Updates 2x Daily</span>
          <span>💎 100% Free</span>
        </div>
      </section>

      {/* Phase Explainer */}
      <section id="how-it-works" style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Know exactly where every recruitment stands</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '24px' }}>
              We've mapped out the standard 7-step process for PSU recruitments. Our unified pipeline gives you clarity at a glance, so you never have to guess what happens next.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: 'var(--success)' }}>✓</span> Clear visual timeline</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: 'var(--success)' }}>✓</span> Direct links to official sources</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ color: 'var(--success)' }}>✓</span> Important dates highlighted</li>
            </ul>
          </div>
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>{samplePsu.logoEmoji}</span> {samplePsu.name} GET 2025 Pipeline
            </h3>
            <PhasePipeline phases={samplePsu.recruitments[0].phases} />
          </div>
        </div>
      </section>

      {/* PSU Grid Section */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>Top PSUs being tracked</h2>
          <Link href="/explore" style={{ color: 'var(--primary)', fontWeight: 500 }}>View All 50+ PSUs &rarr;</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {PSUS.slice(0, 6).map(psu => (
            <PSUCard key={psu.id} psu={psu} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '48px' }}>Everything you need to succeed</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { icon: '🎯', title: 'Personalized Watchlist', desc: 'Add PSUs you care about, ignore the rest.' },
            { icon: '🔔', title: 'Instant Notifications', desc: 'Email alerts the moment a phase changes.' },
            { icon: '📊', title: 'Phase-by-Phase Tracking', desc: 'See exactly where each recruitment stands.' },
            { icon: '🔍', title: 'Smart Filters', desc: 'Filter by branch, GATE required, sector.' },
            { icon: '📅', title: 'Deadline Reminders', desc: 'Never miss an application deadline.' },
            { icon: '🆓', title: 'Completely Free', desc: 'No ads, no paywalls, no spam.' }
          ].map((feature, i) => (
            <div key={i} className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '64px 24px', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.3)', marginTop: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚡</span>
            <span className="gradient-text">PSUTrack</span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/explore" style={{ color: 'var(--text-muted)' }}>Explore</Link>
            <Link href="/dashboard" style={{ color: 'var(--text-muted)' }}>Dashboard</Link>
            <a href="#" style={{ color: 'var(--text-muted)' }}>About</a>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Built for PSU aspirants across India</p>
        </div>
      </footer>
    </div>
  );
}
