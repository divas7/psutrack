"use client";

import { useState } from "react";
import PhasePipeline from "@/components/PhasePipeline";

export default function ClientTabs({ psu }: { psu: any }) {
  const [activeTab, setActiveTab] = useState<"recruitments" | "salary">("recruitments");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Tabs Bar */}
      <div 
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px',
        }}
      >
        <button
          className={activeTab === "recruitments" ? "btn btn-primary" : "btn btn-ghost"}
          style={{ fontSize: '0.9rem', padding: '8px 18px' }}
          onClick={() => setActiveTab("recruitments")}
        >
          📋 Active Recruitments ({psu.recruitments.length})
        </button>
        <button
          className={activeTab === "salary" ? "btn btn-primary" : "btn btn-ghost"}
          style={{ fontSize: '0.9rem', padding: '8px 18px' }}
          onClick={() => setActiveTab("salary")}
        >
          💰 Pay, Perks & Locations
        </button>
      </div>

      {/* Tab Content: Recruitments */}
      {activeTab === "recruitments" && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {psu.recruitments.map((recruitment: any) => (
            <div key={recruitment.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-1)', marginBottom: '6px' }}>
                    {recruitment.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="badge" style={{ background: 'var(--primary-dim)', color: 'var(--primary)', border: '1px solid rgba(99,102,241,0.2)' }}>
                      {recruitment.totalVacancies} vacancies
                    </span>
                    {recruitment.gateRequired && (
                      <span className="badge" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--warning)', border: '1px solid rgba(245,158,11,0.2)' }}>
                        GATE Required
                      </span>
                    )}
                  </div>
                </div>

                {recruitment.applicationDeadline && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--warning)', background: 'rgba(245,158,11,0.08)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.2)', fontWeight: 500 }}>
                    ⏳ Application Deadline: {recruitment.applicationDeadline}
                  </div>
                )}
              </div>

              {/* Vacancies Breakdown Table */}
              <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <table className="posts-table">
                  <thead>
                    <tr>
                      <th>Post Name</th>
                      <th>Branch</th>
                      <th>Vacancies</th>
                      <th>GATE</th>
                      <th>Qualification Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recruitment.posts.map((post: any, i: number) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500, color: 'var(--text-1)' }}>{post.postName}</td>
                        <td><span className="branch-tag">{post.branch}</span></td>
                        <td style={{ fontWeight: 600, color: 'var(--text-1)' }}>{post.vacancies}</td>
                        <td>{post.gateRequired ? <span style={{ color: 'var(--warning)' }}>Yes</span> : <span style={{ color: 'var(--text-3)' }}>No</span>}</td>
                        <td style={{ fontSize: '0.82rem' }}>{post.minQualification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Progress Stepper */}
              <div style={{ marginTop: '8px' }}>
                <div className="label" style={{ marginBottom: '14px' }}>Recruitment Timeline</div>
                <PhasePipeline phases={recruitment.phases} compact={false} />
              </div>

              {/* Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                <a 
                  href={recruitment.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ fontSize: '0.88rem' }}
                >
                  Apply / View Official Notification ↗
                </a>
              </div>
            </div>
          ))}

          {psu.recruitments.length === 0 && (
            <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)' }}>
              No active recruitment notifications published right now. Check back soon.
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Salary & About */}
      {activeTab === "salary" && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Compensation Breakdown */}
          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-1)', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              💵 Pay Scale & Compensation
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div className="label" style={{ marginBottom: '4px' }}>Grade & Pay Scale</div>
                <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-1)' }}>
                  {psu.salary.grade} · {psu.salary.payScale}
                </div>
              </div>

              <div>
                <div className="label" style={{ marginBottom: '4px' }}>CTC Range (Annual)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>
                  {psu.salary.ctcRange}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-2)', marginTop: '2px' }}>
                  Estimated In-hand: {psu.salary.inHandRange}
                </div>
              </div>

              <div>
                <div className="label" style={{ marginBottom: '4px' }}>Service Bond Agreement</div>
                {psu.salary.hasBond ? (
                  <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', padding: '12px', borderRadius: '6px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--warning)', fontSize: '0.9rem' }}>Bond Required</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-2)', marginTop: '2px' }}>
                      {psu.salary.bondAmount} for a minimum service period of {psu.salary.bondPeriod}.
                    </div>
                  </div>
                ) : (
                  <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '12px', borderRadius: '6px', color: 'var(--success)', fontWeight: 600, fontSize: '0.9rem' }}>
                    ✅ No Service Bond Required
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Perks & Postings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-1)', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                🎁 Key Perks & Allowances
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {psu.salary.perks.map((perk: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-2)' }}>
                    <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓</span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-1)', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                📍 Typical Postings & Locations
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
                {psu.typicalLocations.join(" · ")}
              </p>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', fontStyle: 'italic', padding: '0 4px' }}>
              ⚠️ Salary and perks figures are crowd-sourced estimates from {psu.salary.source}. Always refer to official notifications for exact terms.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
