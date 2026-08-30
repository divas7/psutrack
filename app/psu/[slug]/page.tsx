import React from 'react';
import { notFound } from 'next/navigation';
import { PSUS } from '../../../lib/data';
import PhasePipeline from '../../../components/PhasePipeline';

export default async function PSUDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const psu = PSUS.find(p => p.slug === slug);

  if (!psu) {
    notFound();
  }

  return (
    <div style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '40px', marginBottom: '32px', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <div style={{ 
          width: '96px', height: '96px', borderRadius: '24px', 
          background: `${psu.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '48px', flexShrink: 0
        }}>
          {psu.logoEmoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{psu.name}</h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{psu.fullName}</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>{psu.category}</span>
                <span className="badge badge-outline">{psu.sector}</span>
              </div>
            </div>
            <a href={psu.careerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Official Careers Page ↗
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid var(--border)', marginBottom: '32px' }}>
        <div style={{ paddingBottom: '12px', borderBottom: '2px solid var(--primary)', color: 'var(--text-primary)', fontWeight: 600 }}>Active Recruitments</div>
        <div style={{ paddingBottom: '12px', color: 'var(--text-muted)', cursor: 'pointer' }}>All Recruitments</div>
        <div style={{ paddingBottom: '12px', color: 'var(--text-muted)', cursor: 'pointer' }}>About</div>
      </div>

      {/* Recruitments */}
      {psu.recruitments.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {psu.recruitments.map(recruitment => (
            <div key={recruitment.id} className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{recruitment.title}</h2>
                  <p style={{ color: 'var(--text-muted)' }}>{recruitment.postName} • {recruitment.vacancies} Vacancies</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                  {recruitment.gateRequired && <span className="badge" style={{ background: 'var(--primary)' }}>GATE Required</span>}
                  <button className="btn btn-primary">Track This</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px' }}>
                <div>
                  <h3 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Timeline</h3>
                  <PhasePipeline phases={recruitment.phases} />
                </div>
                <div>
                  <h3 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Details</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Qualifications</div>
                      <div>{recruitment.qualifications.join(', ')}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Last Updated</div>
                      <div>{recruitment.lastUpdated}</div>
                    </div>
                    <a href={recruitment.sourceUrl} className="btn btn-ghost" style={{ width: '100%', marginTop: '8px' }}>View Source</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '64px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No active recruitments found for this PSU.</p>
        </div>
      )}
    </div>
  );
}
