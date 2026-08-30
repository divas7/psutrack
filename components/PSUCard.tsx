"use client";
import React from 'react';
import Link from 'next/link';
import { PSU } from '../lib/data';
import PhasePipeline from './PhasePipeline';

interface Props {
  psu: PSU;
}

export default function PSUCard({ psu }: Props) {
  const activeRecruitment = psu.recruitments.find(r => r.currentPhase !== 'final_joining') || psu.recruitments[0];

  return (
    <div className="glass-card psu-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '16px', 
            background: `${psu.color}33`, /* 20% opacity */
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px'
          }}>
            {psu.logoEmoji}
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem' }}>{psu.name}</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{psu.fullName}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}>{psu.category}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{psu.sector}</span>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
        {psu.activeRecruitments > 0 ? (
          <>
            <span className="pulse-dot"></span>
            <span style={{ color: 'var(--success)' }}>{psu.activeRecruitments} Active Recruitment{psu.activeRecruitments > 1 ? 's' : ''}</span>
          </>
        ) : (
          <span style={{ color: 'var(--text-muted)' }}>No active recruitments</span>
        )}
      </div>

      {activeRecruitment && psu.activeRecruitments > 0 && (
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', marginBottom: '24px', flex: 1 }}>
          <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{activeRecruitment.title}</span>
            {activeRecruitment.gateRequired && <span className="badge badge-outline" style={{ fontSize: '0.65rem' }}>GATE</span>}
          </div>
          <PhasePipeline phases={activeRecruitment.phases} compact={true} />
        </div>
      )}

      <div style={{ marginTop: 'auto' }}>
        <Link href={`/psu/${psu.slug}`} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
          View Details &rarr;
        </Link>
      </div>

      <style jsx>{`
        .psu-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px var(--primary);
        }
      `}</style>
    </div>
  );
}
