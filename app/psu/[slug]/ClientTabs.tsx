"use client";

import { useState } from "react";
import PhasePipeline from "@/components/PhasePipeline";
import TrackButton from "@/components/TrackButton";

export default function ClientTabs({ psu }: { psu: any }) {
  const [activeTab, setActiveTab] = useState("recruitments");

  return (
    <div>
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
        <button
          className={`py-3 px-6 font-semibold text-lg border-b-2 transition-colors ${
            activeTab === "recruitments"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("recruitments")}
        >
          Active Recruitments
        </button>
        <button
          className={`py-3 px-6 font-semibold text-lg border-b-2 transition-colors ${
            activeTab === "about"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("about")}
        >
          About & Salary
        </button>
      </div>

      {activeTab === "recruitments" && (
        <div className="space-y-8">
          {psu.recruitments.map((recruitment: any) => (
            <div key={recruitment.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{recruitment.title}</h3>
                  <div className="flex gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold dark:bg-blue-900 dark:text-blue-200">
                      {recruitment.totalVacancies} vacancies
                    </span>
                    {recruitment.gateRequired && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-bold dark:bg-purple-900 dark:text-purple-200">
                        GATE Required
                      </span>
                    )}
                  </div>
                </div>
                <TrackButton psuId={psu.id} psuName={psu.name} />
              </div>

              {recruitment.applicationDeadline && (
                <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 font-semibold dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-400">
                  Application deadline: {recruitment.applicationDeadline}
                </div>
              )}

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left border-collapse posts-table">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
                      <th className="p-3 font-semibold text-sm">Post</th>
                      <th className="p-3 font-semibold text-sm">Branch</th>
                      <th className="p-3 font-semibold text-sm">Vacancies</th>
                      <th className="p-3 font-semibold text-sm">GATE</th>
                      <th className="p-3 font-semibold text-sm">Min. Qualification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recruitment.posts.map((post: any, i: number) => (
                      <tr key={i} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-3 font-medium">{post.postName}</td>
                        <td className="p-3 text-gray-600 dark:text-gray-400">{post.branch}</td>
                        <td className="p-3">{post.vacancies}</td>
                        <td className="p-3">{post.gateRequired ? "Yes" : "No"}</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{post.minQualification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-4 text-gray-800 dark:text-gray-200">Recruitment Progress</h4>
                <PhasePipeline phases={recruitment.phases} compact={false} />
              </div>

              <div className="mt-6 flex justify-end">
                <a 
                  href={recruitment.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  Apply on Official Site →
                </a>
              </div>
            </div>
          ))}
          {psu.recruitments.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              No active recruitments found for this PSU.
            </div>
          )}
        </div>
      )}

      {activeTab === "about" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm glass-card">
            <h3 className="text-2xl font-bold mb-6 border-b pb-2">Compensation</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Grade & Pay Scale</div>
                <div className="font-medium text-lg">{psu.salary.grade} &middot; {psu.salary.payScale}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">CTC Range</div>
                <div className="inline-block bg-green-100 text-green-800 font-bold px-3 py-1 rounded-lg text-lg salary-badge dark:bg-green-900/50 dark:text-green-400 border border-green-200 dark:border-green-800">
                  {psu.salary.ctcRange}
                </div>
                <div className="text-sm text-gray-500 mt-1">In-hand: {psu.salary.inHandRange}</div>
              </div>
              <div className="pt-2">
                {psu.salary.hasBond ? (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-100 bond-badge dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                    <span className="font-bold block mb-1">Bond Required</span>
                    <span className="text-sm">{psu.salary.bondAmount} for {psu.salary.bondPeriod}</span>
                  </div>
                ) : (
                  <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg border border-emerald-100 no-bond-badge dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400 font-bold">
                    No Bond Required
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Key Perks</h3>
              <ul className="space-y-2">
                {psu.salary.perks.map((perk: string, i: number) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-green-500 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2">Typical Posting Locations</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {psu.typicalLocations.join(", ")}
              </p>
            </div>
            
            <p className="text-xs text-gray-400 italic">
              ⚠️ Salary figures are community estimates from {psu.salary.source}. Always verify in the official recruitment notification.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
