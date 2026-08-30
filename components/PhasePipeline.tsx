'use client';

export type PhaseStatus = 'completed' | 'active' | 'upcoming';
export type PhaseName = 'notification_out' | 'application_open' | 'application_closed' | 'admit_card' | 'exam_date' | 'result' | 'final_joining';

export interface Phase {
  name: PhaseName;
  label: string;
  status: PhaseStatus;
  date?: string;
  link?: string;
  notes?: string;
}

interface PhasePipelineProps {
  phases: Phase[];
  compact?: boolean;
}

export default function PhasePipeline({ phases, compact }: PhasePipelineProps) {
  const activePhase = phases.find(p => p.status === 'active');

  if (compact) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '2px', height: '8px', borderRadius: '4px', overflow: 'hidden', background: 'rgba(255, 255, 255, 0.05)' }}>
          {phases.map((p, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                background: p.status === 'completed' ? 'var(--primary)' : p.status === 'active' ? 'var(--success)' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: p.status === 'active' ? '0 0 8px rgba(34, 211, 165, 0.4)' : 'none',
                opacity: p.status === 'active' ? 1 : 0.8
              }}
            />
          ))}
        </div>
        {activePhase && (
          <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 500 }}>
            {activePhase.label}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {phases.map((phase, index) => (
        <div key={index} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
          {index < phases.length - 1 && (
            <div style={{
              position: 'absolute',
              left: '11px',
              top: '24px',
              bottom: '-16px',
              width: '2px',
              background: phase.status === 'completed' ? 'var(--primary)' : 'var(--border)'
            }} />
          )}
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: phase.status === 'completed' ? 'var(--primary)' : phase.status === 'active' ? 'rgba(34, 211, 165, 0.2)' : 'var(--border)',
            border: phase.status === 'active' ? '1px solid var(--success)' : 'none',
            zIndex: 1,
            flexShrink: 0
          }}>
            {phase.status === 'completed' && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
            {phase.status === 'active' && (
              <div className="pulse-dot" style={{ width: '8px', height: '8px' }}></div>
            )}
          </div>
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingLeft: phase.status === 'active' ? '12px' : '0',
            borderLeft: phase.status === 'active' ? '2px solid var(--success)' : '2px solid transparent'
          }}>
            <div>
              <div style={{ fontWeight: phase.status === 'active' ? 600 : 500, color: phase.status === 'upcoming' ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                {phase.label}
              </div>
              {phase.date && (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {phase.date}
                </div>
              )}
            </div>
            {phase.link && (
              <a href={phase.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'underline' }}>
                Action ↗
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
