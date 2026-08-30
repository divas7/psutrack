'use client';

import Link from 'next/link';
import PhasePipeline, { Phase, PhaseName } from './PhasePipeline';

export type Branch = 'Electrical' | 'Mechanical' | 'Civil' | 'CSE/IT' | 'Electronics' | 'Chemical' | 'Mining' | 'Metallurgy' | 'Management' | 'Finance' | 'HR' | 'Aerospace' | 'Geology' | 'Science' | 'All Branches';

export interface SalaryInfo {
  grade: string;
  payScale: string;
  ctcRange: string;
  inHandRange: string;
  hasBond: boolean;
  bondAmount?: string;
  bondPeriod?: string;
  perks: string[];
  source: string;
}

export interface PostDetail {
  postName: string;
  branch: Branch;
  vacancies: number;
  gateRequired: boolean;
  minQualification: string;
}

export interface Recruitment {
  id: string;
  title: string;
  postName: string;
  totalVacancies: number;
  posts: PostDetail[];
  qualifications: string[];
  gateRequired: boolean;
  currentPhase: PhaseName;
  phases: Phase[];
  sourceUrl: string;
  lastUpdated: string;
  applicationDeadline?: string;
}

export interface PSU {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  category: 'Maharatna' | 'Navratna' | 'Miniratna' | 'Bank' | 'Defence' | 'Research';
  sector: string;
  logoEmoji: string;
  careerUrl: string;
  color: string;
  branches: Branch[];
  salary: SalaryInfo;
  activeRecruitments: number;
  recruitments: Recruitment[];
  typicalLocations: string[];
}

interface PSUCardProps {
  psu: PSU;
}

export default function PSUCard({ psu }: PSUCardProps) {
  const activeRecruitment = psu.recruitments[0];
  const displayBranches = psu.branches.slice(0, 4);
  const remainingBranches = psu.branches.length - 4;

  const getDaysRemaining = (deadline?: string) => {
    if (!deadline) return null;
    const diff = new Date(deadline).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const daysRemaining = activeRecruitment ? getDaysRemaining(activeRecruitment.applicationDeadline) : null;

  return (
    <div className="glass-card psu-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="psu-card-accent" style={{ background: psu.color }}></div>
      
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
          background: `${psu.color}26` // 15% opacity hex
        }}>
          {psu.logoEmoji}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '4px' }}>{psu.name}</h3>
          <span className="badge badge-outline">{psu.category}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {displayBranches.map(b => (
          <span key={b} className="branch-tag">{b}</span>
        ))}
        {remainingBranches > 0 && (
          <span className="branch-tag" style={{ background: 'transparent' }}>+{remainingBranches} more</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span className="salary-badge">{psu.salary.ctcRange}</span>
        <span style={{ color: 'var(--border)' }}>•</span>
        {psu.salary.hasBond ? (
          <span className="bond-badge">{psu.salary.bondAmount} ({psu.salary.bondPeriod})</span>
        ) : (
          <span className="no-bond-badge">No Bond Required</span>
        )}
      </div>

      {activeRecruitment && (
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <PhasePipeline phases={activeRecruitment.phases} compact={true} />
          {activeRecruitment.currentPhase === 'application_open' && daysRemaining !== null && (
            <div style={{ fontSize: '0.8rem', color: 'var(--warning)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-dot" style={{ background: 'var(--warning)', width: '6px', height: '6px' }}></span>
              Closes in {daysRemaining} days
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <Link href={`/psu/${psu.slug}`} className="btn btn-ghost" style={{ flex: 1 }}>
          View Details →
        </Link>
        <a href={psu.careerUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: '10px' }} title="Official Site">
          ↗
        </a>
      </div>
    </div>
  );
}
