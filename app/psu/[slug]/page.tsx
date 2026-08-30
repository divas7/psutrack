import { PSUS } from "@/lib/data";
import { notFound } from "next/navigation";
import ClientTabs from "./ClientTabs";
import TrackButton from "@/components/TrackButton";

export default async function PSUPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const psu = PSUS.find((p) => p.slug === slug);

  if (!psu) {
    notFound();
  }

  const totalVacancies = psu.recruitments.reduce((sum, r) => sum + r.totalVacancies, 0);

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Header Card */}
      <div 
        className="card"
        style={{
          padding: '28px',
          marginBottom: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderLeft: `4px solid ${psu.color}`,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: `${psu.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                flexShrink: 0,
              }}
            >
              {psu.logoEmoji}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-1)' }}>{psu.name}</h1>
                <span className="badge">{psu.category}</span>
                <span className="badge">{psu.sector}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-2)' }}>{psu.fullName}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a 
              href={psu.careerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ fontSize: '0.85rem' }}
            >
              Official Career Page ↗
            </a>
            <div style={{ minWidth: '130px' }}>
              <TrackButton psuId={psu.id} psuName={psu.name} />
            </div>
          </div>
        </div>

        {/* Salary & Key Stats Highlight Row */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            padding: '16px',
            background: 'var(--surface-2)',
            borderRadius: '8px',
            border: '1px solid var(--border)',
          }}
        >
          <div>
            <div className="label" style={{ marginBottom: '4px' }}>Estimated CTC</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-1)' }}>{psu.salary.ctcRange}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>In-hand: {psu.salary.inHandRange}</div>
          </div>

          <div>
            <div className="label" style={{ marginBottom: '4px' }}>Grade & Scale</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-1)' }}>{psu.salary.grade}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{psu.salary.payScale}</div>
          </div>

          <div>
            <div className="label" style={{ marginBottom: '4px' }}>Service Bond</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 500, color: psu.salary.hasBond ? 'var(--warning)' : 'var(--success)' }}>
              {psu.salary.hasBond ? `Required (${psu.salary.bondAmount})` : 'No Bond Required'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
              {psu.salary.hasBond ? `Period: ${psu.salary.bondPeriod}` : 'Full career flexibility'}
            </div>
          </div>

          <div>
            <div className="label" style={{ marginBottom: '4px' }}>Recruitment Status</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-1)' }}>
              {psu.recruitments.length} Active Notice{psu.recruitments.length !== 1 ? 's' : ''}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
              {totalVacancies} Total Vacancies
            </div>
          </div>
        </div>
      </div>

      <ClientTabs psu={psu} />
    </main>
  );
}
