import Link from "next/link";
import { PSUS } from "@/lib/data";
import PSUCard from "@/components/PSUCard";

export default function Home() {
  const topPSUs = PSUS.slice(0, 6);

  return (
    <main className="page-wrapper" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '60px 0', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', color: '#fff' }}>
          Track every PSU recruitment.<br/>
          <span className="gradient-text">All in one place.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
          Never miss a deadline again. Get real-time updates on notifications, admit cards, and results for Maharatna, Navratna, and Miniratna companies.
        </p>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px' }}>
          <Link href="/explore" className="btn btn-primary" style={{ fontSize: '1rem', padding: '12px 24px' }}>
            Explore PSUs →
          </Link>
          <Link href="/dashboard" className="btn btn-ghost" style={{ fontSize: '1rem', padding: '12px 24px' }}>
            How it works
          </Link>
        </div>

        <div style={{ 
          display: 'inline-flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap',
          background: 'var(--surface)', padding: '10px 24px', 
          borderRadius: '100px', border: '1px solid var(--border)',
          fontSize: '0.85rem', color: 'var(--text-2)', justifyContent: 'center'
        }}>
          <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>50+ PSUs</span>
          <span style={{ color: 'var(--border-2)' }}>·</span>
          <span style={{ fontWeight: 600, color: 'var(--text-1)' }}>14 Maharatnas</span>
          <span style={{ color: 'var(--border-2)' }}>·</span>
          <span>Updated 2× daily</span>
          <span style={{ color: 'var(--border-2)' }}>·</span>
          <span>Free forever</span>
        </div>
      </section>

      <div className="divider" style={{ margin: '40px 0' }} />

      {/* Phase Explainer */}
      <section style={{ padding: '40px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>We track every stage</h2>
          <p style={{ color: 'var(--text-2)', fontSize: '1rem' }}>From the first notification to the final joining, we keep you updated at every step.</p>
        </div>
        
        <div style={{ 
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px',
          background: 'var(--surface)', border: '1px solid var(--border)', 
          borderRadius: '12px', padding: '32px', maxWidth: '900px', margin: '0 auto'
        }}>
          {['Notification', 'Application', 'Admit Card', 'Exam', 'Result', 'Joining'].map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-1)' }}>
                <span style={{ color: 'var(--text-3)', marginRight: '6px' }}>0{i+1}</span>
                {step}
              </div>
              {i < 5 && <div style={{ width: '24px', height: '1px', background: 'var(--border)' }} />}
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: '40px 0' }} />

      {/* Grid */}
      <section style={{ padding: '40px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Top Recruiters</h2>
            <p style={{ color: 'var(--text-2)' }}>Most sought-after public sector companies</p>
          </div>
          <Link href="/explore" className="btn btn-ghost">
            View all PSUs →
          </Link>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {topPSUs.map(psu => (
            <PSUCard key={psu.id} psu={psu} />
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: '40px 0' }} />

      {/* Features */}
      <section style={{ padding: '40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { icon: '⚡', title: 'Real-time Updates', desc: 'Get notified the moment a notification drops or a result is declared.' },
            { icon: '🎯', title: 'Smart Filtering', desc: 'Only see recruitments relevant to your engineering branch and qualifications.' },
            { icon: '💰', title: 'Salary Insights', desc: 'Compare in-hand salary, perks, and bond conditions across different PSUs.' }
          ].map(feature => (
            <div key={feature.title} className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-1)' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: '40px 0' }} />

      {/* Footer */}
      <footer style={{ padding: '24px 0', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px' }}>
          <Link href="#" style={{ color: 'var(--text-3)', fontSize: '0.9rem' }}>About</Link>
          <Link href="#" style={{ color: 'var(--text-3)', fontSize: '0.9rem' }}>Privacy</Link>
          <Link href="#" style={{ color: 'var(--text-3)', fontSize: '0.9rem' }}>Terms</Link>
          <Link href="#" style={{ color: 'var(--text-3)', fontSize: '0.9rem' }}>Contact</Link>
        </div>
        <p style={{ color: 'var(--text-3)', fontSize: '0.8rem' }}>&copy; {new Date().getFullYear()} PSUTrack. All rights reserved.</p>
      </footer>
    </main>
  );
}
