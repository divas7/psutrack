import React from 'react';

export type PhaseStatus = 'completed' | 'active' | 'upcoming';
export type PhaseName =
  | 'notification_out' | 'application_open' | 'application_closed'
  | 'admit_card' | 'exam_date' | 'result' | 'final_joining';

export interface Phase {
  name: PhaseName; label: string; status: PhaseStatus; date?: string; link?: string; notes?: string;
}

interface PhasePipelineProps { phases: Phase[]; compact?: boolean; }

const phaseColor: Record<PhaseName, string> = {
  notification_out:  '#818CF8',
  application_open:  '#34D399',
  application_closed:'#52525B',
  admit_card:        '#FBBF24',
  exam_date:         '#F87171',
  result:            '#A78BFA',
  final_joining:     '#6EE7B7',
};

const phaseIcon: Record<PhaseName, string> = {
  notification_out:  '📋',
  application_open:  '📝',
  application_closed:'🔒',
  admit_card:        '🎫',
  exam_date:         '📅',
  result:            '🏆',
  final_joining:     '🎉',
};

function formatDate(d?: string) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PhasePipeline({ phases, compact = false }: PhasePipelineProps) {
  const active = phases.find(p => p.status === 'active');

  if (compact) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Segment bar */}
        <div style={{ display: 'flex', gap: '3px' }}>
          {phases.map(phase => (
            <div
              key={phase.name}
              style={{
                flex: 1, height: '5px', borderRadius: '3px',
                background: phase.status === 'completed'
                  ? 'var(--primary)'
                  : phase.status === 'active'
                  ? phaseColor[phase.name]
                  : 'var(--surface-2)',
              }}
              title={phase.label}
            />
          ))}
        </div>
        {/* Active label */}
        {active && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: phaseColor[active.name] }}>
            <span className="pulse-dot" style={{ background: phaseColor[active.name], width: '5px', height: '5px' }} />
            {active.label}
            {active.date && <span style={{ color: 'var(--text-3)' }}>· {formatDate(active.date)}</span>}
          </div>
        )}
      </div>
    );
  }

  // Full mode — vertical stepper
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {phases.map((phase, i) => {
        const isLast = i === phases.length - 1;
        const color = phase.status === 'upcoming' ? '#3F3F46' : phaseColor[phase.name];
        return (
          <div key={phase.name} style={{ display: 'flex', gap: '14px' }}>
            {/* Left column: circle + connector */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px', flexShrink: 0 }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px',
                background: phase.status === 'completed' ? 'var(--primary)'
                  : phase.status === 'active' ? 'transparent' : 'transparent',
                border: phase.status === 'completed' ? 'none'
                  : phase.status === 'active' ? `2px solid ${color}`
                  : `1px solid var(--border)`,
              }}>
                {phase.status === 'completed' && <span style={{ color: '#fff', fontSize: '9px' }}>✓</span>}
                {phase.status === 'active' && <span className="pulse-dot" style={{ width: '6px', height: '6px', background: color }} />}
              </div>
              {!isLast && (
                <div style={{ width: '1px', flex: 1, minHeight: '20px', background: 'var(--border)', margin: '3px 0' }} />
              )}
            </div>

            {/* Right content */}
            <div style={{
              flex: 1, paddingBottom: isLast ? 0 : '16px',
              background: phase.status === 'active' ? 'transparent' : 'transparent',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1px',
                color: phase.status === 'upcoming' ? 'var(--text-3)' : 'var(--text-1)',
                fontWeight: phase.status === 'active' ? 500 : 400,
                fontSize: '0.875rem',
              }}>
                <span>{phaseIcon[phase.name]}</span>
                <span>{phase.label}</span>
                {phase.status === 'active' && (
                  <span style={{ fontSize: '0.68rem', background: `${color}18`, color, padding: '1px 6px', borderRadius: '3px', marginLeft: '2px' }}>Active</span>
                )}
              </div>
              {phase.date && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: '3px', marginLeft: '28px' }}>
                  {formatDate(phase.date)}
                </div>
              )}
              {phase.link && phase.status !== 'upcoming' && (
                <a
                  href={phase.link} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '0.78rem', color: 'var(--primary)', marginTop: '3px', display: 'block', marginLeft: '28px' }}
                >
                  {phase.name === 'admit_card' ? 'Download Admit Card →'
                    : phase.name === 'application_open' ? 'Apply Now →'
                    : phase.name === 'result' ? 'View Result →'
                    : 'View →'}
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
