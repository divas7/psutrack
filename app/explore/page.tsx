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
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore PSUs</h1>
      
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Search PSUs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          />
        </div>

        {/* Branch Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {branches.map((branch) => (
            <button
              key={branch}
              onClick={() => setSelectedBranch(branch)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedBranch === branch
                  ? "bg-blue-600 text-white branch-tag active"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 branch-tag"
              }`}
            >
              {branch}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 text-gray-600 dark:text-gray-400 font-medium">
        {filteredPSUs.length} PSUs found &middot; {totalActiveRecruitments} active recruitments
      </div>

      {filteredPSUs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPSUs.map((psu) => (
            <PSUCard key={psu.id} psu={psu} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No PSUs found. Try changing your filters.</p>
        </div>
      )}
    </main>
  );
}
