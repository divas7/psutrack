"use client";

import { PSUS } from "@/lib/data";
import PSUCard from "@/components/PSUCard";

export default function DashboardPage() {
  const watchlisted = PSUS.slice(0, 4);
  const suggested = PSUS.slice(4, 7);

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '4px' }}>My Dashboard</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-3)' }}>Track recruitments, deadlines, and active updates across your watchlist.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        {/* Main Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Watchlist */}
          <section>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-1)' }}>My Watchlist</h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-3)' }}>{watchlisted.length} PSUs currently tracked</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {watchlisted.map((psu) => (
                <div key={psu.id} style={{ position: 'relative' }}>
                  <div 
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      zIndex: 10,
                      background: 'rgba(34,197,94,0.12)',
                      color: 'var(--success)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(34,197,94,0.2)',
                    }}
                  >
                    ✓ Tracking
                  </div>
                  <PSUCard psu={psu} />
                </div>
              ))}
            </div>
          </section>

          {/* Suggested */}
          <section>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-1)' }}>Recommended for You</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {suggested.map((psu) => (
                <PSUCard key={psu.id} psu={psu} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
