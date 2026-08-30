"use client";

import { useState } from "react";
import { PSUS } from "@/lib/data";
import PSUCard from "@/components/PSUCard";

const branches = [
  "All",
  "⚡ Electrical",
  "🖥️ CSE/IT",
  "⚙️ Mechanical",
  "🏗️ Civil",
  "📡 Electronics",
  "⚗️ Chemical",
  "⛏️ Mining",
  "⚗️ Metallurgy",
  "✈️ Aerospace",
  "📊 Management",
  "💰 Finance",
  "🔬 Science",
];

const categories = ["All", "Maharatna", "Navratna", "Bank", "Defence", "Research"];

export default function ExplorePage() {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const filteredPSUs = PSUS.filter((psu) => {
    const matchesSearch =
      psu.name.toLowerCase().includes(searchText.toLowerCase()) ||
      psu.fullName.toLowerCase().includes(searchText.toLowerCase());
    
    // Extract branch name from emoji string
    const branchName = selectedBranch.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE0F}\s]/gu, "").trim();
    
    const matchesBranch = selectedBranch === "All" || psu.branches.some(b => b.includes(branchName) || selectedBranch.includes(b));
    const matchesCategory = selectedCategory === "All" || psu.category === selectedCategory;

    return matchesSearch && matchesBranch && matchesCategory;
  });

  const totalActiveRecruitments = filteredPSUs.reduce((acc, psu) => acc + psu.activeRecruitments, 0);

  return (
    <main className="page-wrapper" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '24px' }}>Explore PSUs</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
        {/* Search */}
        <div style={{ maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search PSUs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Branch Filters */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {branches.map((branch) => (
            <button
              key={branch}
              onClick={() => setSelectedBranch(branch)}
              className={`branch-tag ${selectedBranch === branch ? 'active' : ''}`}
              style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              {branch}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`branch-tag ${selectedCategory === category ? 'active' : ''}`}
              style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '0.8rem' }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div style={{ color: 'var(--text-3)', fontSize: '0.9rem', marginBottom: '24px' }}>
        {filteredPSUs.length} PSUs found &middot; {totalActiveRecruitments} active recruitments
      </div>

      {filteredPSUs.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredPSUs.map((psu) => (
            <PSUCard key={psu.id} psu={psu} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>
          <p style={{ fontSize: '1.1rem' }}>No PSUs found. Try changing your filters.</p>
        </div>
      )}
    </main>
  );
}
