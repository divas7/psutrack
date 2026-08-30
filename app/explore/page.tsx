"use client";
import React, { useState } from 'react';
import { PSUS } from '../../lib/data';
import PSUCard from '../../components/PSUCard';

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [gateRequired, setGateRequired] = useState(false);

  const filteredPSUs = PSUS.filter(psu => {
    const matchesSearch = psu.name.toLowerCase().includes(search.toLowerCase()) || psu.fullName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || psu.category === category;
    const matchesGate = !gateRequired || psu.recruitments.some(r => r.gateRequired);
    return matchesSearch && matchesCategory && matchesGate;
  });

  const activeCount = filteredPSUs.reduce((acc, psu) => acc + psu.activeRecruitments, 0);

  return (
    <div style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Explore PSUs</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Track recruitments across 50+ Public Sector Undertakings</p>
      </div>

      <div className="glass-card" style={{ padding: '24px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search by name or full name..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: '1 1 300px' }}
        />
        <select 
          value={category} 
          onChange={e => setCategory(e.target.value)}
          style={{ flex: '1 1 200px' }}
        >
          <option value="All">All Categories</option>
          <option value="Maharatna">Maharatna</option>
          <option value="Navratna">Navratna</option>
          <option value="Miniratna">Miniratna</option>
          <option value="Bank">Bank</option>
          <option value="Defence">Defence</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <input 
            type="checkbox" 
            checked={gateRequired} 
            onChange={e => setGateRequired(e.target.checked)} 
            style={{ width: 'auto' }}
          />
          GATE Required Only
        </label>
      </div>

      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{filteredPSUs.length} PSUs found</span>
        <span className="badge" style={{ background: 'var(--success)', color: '#000' }}>{activeCount} Active Recruitments</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredPSUs.map(psu => (
          <PSUCard key={psu.id} psu={psu} />
        ))}
      </div>
    </div>
  );
}
