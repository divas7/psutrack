import React from 'react';
import { PSUS } from '../../lib/data';
import PSUCard from '../../components/PSUCard';

export default function Dashboard() {
  const watchlist = PSUS.slice(0, 4);
  const suggested = PSUS.slice(4, 7);

  return (
    <div style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome back 👋, Rohan</h1>
        <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your tracked recruitments.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
        <div>
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              My Watchlist <span className="badge" style={{ background: 'var(--primary)' }}>4</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {watchlist.map(psu => (
                <PSUCard key={psu.id} psu={psu} />
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Suggested for you</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Since you track the Energy & Power sector...</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
              {suggested.map(psu => (
                <PSUCard key={psu.id} psu={psu} />
              ))}
            </div>
          </section>
        </div>

        <div>
          <div className="glass-card" style={{ padding: '24px', position: 'sticky', top: '88px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Recent Notifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--exam-date)', marginTop: '6px' }}></div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>2 hours ago</div>
                  <div style={{ fontWeight: 500, marginBottom: '4px' }}>BHEL Engineer Trainee Exam Date announced</div>
                  <span className="phase-pill exam_date" style={{ transform: 'scale(0.8)', transformOrigin: 'left' }}>Exam Date Active</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--application-open)', marginTop: '6px' }}></div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Yesterday</div>
                  <div style={{ fontWeight: 500, marginBottom: '4px' }}>ONGC GET 2025 Application is now open</div>
                  <span className="phase-pill application_open" style={{ transform: 'scale(0.8)', transformOrigin: 'left' }}>Application Open Active</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--admit-card)', marginTop: '6px' }}></div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>3 days ago</div>
                  <div style={{ fontWeight: 500, marginBottom: '4px' }}>NTPC ET 2025 Admit Cards released</div>
                  <span className="phase-pill admit_card" style={{ transform: 'scale(0.8)', transformOrigin: 'left' }}>Admit Card Active</span>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <a href="#" className="btn btn-ghost" style={{ width: '100%', fontSize: '0.9rem' }}>View all notifications</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
