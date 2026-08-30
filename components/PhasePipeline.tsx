import React from 'react';
import { Phase, PhaseName } from '../lib/data';

const phaseIcons: Record<PhaseName, string> = {
  notification_out: '📋',
  application_open: '📝',
  application_closed: '🔒',
  admit_card: '🎫',
  exam_date: '📅',
  result: '🏆',
  final_joining: '🎉'
};

interface Props {
  phases: Phase[];
  compact?: boolean;
}

export default function PhasePipeline({ phases, compact = false }: Props) {
  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', position: 'relative' }}>
        {/* Connecting line */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', height: '2px', background: 'var(--border)', zIndex: 0 }} />
        
        {phases.map((phase, i) => (
          <div key={phase.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '40px' }} title={phase.label}>
            {phase.status === 'completed' && (
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', border: '2px solid var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
            )}
            {phase.status === 'active' && (
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-color)', border: '2px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div className="pulse-dot" style={{ width: '10px', height: '10px' }}></div>
              </div>
            )}
            {phase.status === 'upcoming' && (
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-color)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
            )}
            {phase.status === 'active' && (
              <span style={{ fontSize: '10px', marginTop: '4px', whiteSpace: 'nowrap', color: 'var(--success)', fontWeight: 600 }}>{phase.label}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {phases.map((phase, i) => {
        const isLast = i === phases.length - 1;
        
        let iconBg = 'rgba(255,255,255,0.05)';
        let iconBorder = 'var(--border)';
        let textColor = 'var(--text-muted)';
        
        if (phase.status === 'completed') {
          iconBg = 'rgba(79, 110, 247, 0.1)';
          iconBorder = 'var(--primary)';
          textColor = 'var(--text-primary)';
        } else if (phase.status === 'active') {
          iconBg = `var(--${phase.name.replace('_', '-')})`;
          iconBorder = iconBg;
          textColor = 'var(--text-primary)';
        }

        return (
          <div key={phase.name} style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: iconBg, border: `2px solid ${iconBorder}`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', position: 'relative'
              }}>
                {phase.status === 'active' && (
                  <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: `2px solid ${iconBg}`, animation: 'pulse 2s infinite', opacity: 0.5 }}></div>
                )}
                {phaseIcons[phase.name]}
              </div>
              {!isLast && (
                <div style={{ width: '2px', height: '40px', background: phase.status === 'completed' ? 'var(--primary)' : 'var(--border)', margin: '4px 0' }}></div>
              )}
            </div>
            
            <div style={{ paddingBottom: '32px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ color: textColor, margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: phase.status === 'active' ? 600 : 400 }}>{phase.label}</h4>
                  {phase.date && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Expected: {phase.date}</p>}
                </div>
                {phase.status === 'active' && (
                  <span className={`phase-pill ${phase.name}`}>{phase.label} Active</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
