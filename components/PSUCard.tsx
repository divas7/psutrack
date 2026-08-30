'use client';
import Link from 'next/link';
import PhasePipeline, { Phase, PhaseName } from './PhasePipeline';

export type Branch = 'Electrical' | 'Mechanical' | 'Civil' | 'CSE/IT' | 'Electronics' | 'Chemical' | 'Mining' | 'Metallurgy' | 'Management' | 'Finance' | 'HR' | 'Aerospace' | 'Geology' | 'Science' | 'All Branches';

export interface SalaryInfo {
  grade: string; payScale: string; ctcRange: string; inHandRange: string;
  hasBond: boolean; bondAmount?: string; bondPeriod?: string; perks: string[]; source: string;
}
export interface PostDetail {
  postName: string; branch: Branch; vacancies: number; gateRequired: boolean; minQualification: string;
}
export interface Recruitment {
  id: string; title: string; postName: string; totalVacancies: number; posts: PostDetail[];
  qualifications: string[]; gateRequired: boolean; currentPhase: PhaseName; phases: Phase[];
  sourceUrl: string; lastUpdated: string; applicationDeadline?: string;
}
export interface PSU {
  id: string; slug: string; name: string; fullName: string;
  category: 'Maharatna' | 'Navratna' | 'Miniratna' | 'Bank' | 'Defence' | 'Research';
  sector: string; logoEmoji: string; careerUrl: string; color: string; branches: Branch[];
  salary: SalaryInfo; activeRecruitments: number; recruitments: Recruitment[]; typicalLocations: string[];
}

function getDaysRemaining(deadline?: string) {
  if (!deadline) return null;
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.ceil(diff / 86400000);
}

export default function PSUCard({ psu }: { psu: PSU }) {
  const rec = psu.recruitments[0];
  const shown = psu.branches.slice(0, 4);
  const extra = psu.branches.length - 4;
  const days = rec ? getDaysRemaining(rec.applicationDeadline) : null;

  return (
    <div
      className="card psu-card"
      style={{
        display: 'flex', flexDirection: 'column', gap: '18px', padding: '20px',
        borderLeft: `3px solid ${psu.color}`,
        borderRadius: '10px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '8px', flexShrink: 0,
          background: `${psu.color}1F`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'
        }}>
          {psu.logoEmoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-1)' }}>{psu.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '2px' }}>{psu.fullName}</div>
        </div>
        <span className="badge">{psu.category}</span>
      </div>

      {/* Branches */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {shown.map(b => <span key={b} className="branch-tag">{b}</span>)}
        {extra > 0 && <span className="branch-tag" style={{ color: 'var(--text-3)' }}>+{extra}</span>}
      </div>

      {/* Salary — plain text, no coloured badges */}
      <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 500 }}>{psu.salary.ctcRange}</span>
        <span style={{ color: 'var(--border-2)' }}>·</span>
        {psu.salary.hasBond
          ? <span style={{ color: 'var(--text-3)' }}>Bond {psu.salary.bondAmount}</span>
          : <span style={{ color: 'var(--success)', fontSize: '0.78rem' }}>No bond</span>
        }
      </div>

      {/* Phase pipeline */}
      {rec && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <PhasePipeline phases={rec.phases} compact={true} />
          {rec.currentPhase === 'application_open' && days !== null && days >= 0 && days <= 30 && (
            <div style={{ fontSize: '0.78rem', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-dot" style={{ background: 'var(--warning)' }} />
              Closes in {days} day{days !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <Link href={`/psu/${psu.slug}`} className="btn btn-ghost" style={{ flex: 1, fontSize: '0.82rem', padding: '7px 12px' }}>
          View Details →
        </Link>
        <a
          href={psu.careerUrl} target="_blank" rel="noopener noreferrer"
          className="btn btn-ghost"
          style={{ padding: '7px 12px', fontSize: '0.82rem' }}
          title="Official site"
        >↗</a>
      </div>
    </div>
  );
}
