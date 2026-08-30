"use client";

import { PSUS } from "@/lib/data";
import PSUCard from "@/components/PSUCard";

export default function DashboardPage() {
  const watchlisted = PSUS.slice(0, 4);
  const suggested = PSUS.slice(4, 7);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8">My Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Watchlist */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">My Watchlist</h2>
              <p className="text-gray-500 dark:text-gray-400">PSUs you're tracking</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {watchlisted.map((psu) => (
                <div key={psu.id} className="relative">
                  <div className="absolute top-4 right-4 z-10 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    ✓ Tracking
                  </div>
                  <PSUCard psu={psu} />
                </div>
              ))}
            </div>
          </section>

          {/* Suggested */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">You might also like</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggested.map((psu) => (
                <PSUCard key={psu.id} psu={psu} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Upcoming Deadlines */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6">
            <h3 className="font-bold text-amber-900 dark:text-amber-400 mb-4 flex items-center gap-2">
              <span className="text-xl">⏳</span> Upcoming Deadlines
            </h3>
            <div className="space-y-4">
              <div className="flex items-start justify-between bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <div className="font-medium">🚀 ISRO</div>
                <div className="text-sm text-amber-600 font-bold">closes in 3 days</div>
              </div>
              <div className="flex items-start justify-between bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                <div className="font-medium">⚡ NTPC</div>
                <div className="text-sm text-amber-600 font-bold">closes in 5 days</div>
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Notifications</h3>
            <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-gray-200 dark:before:bg-gray-700">
              <div className="relative pl-8 pb-4">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-blue-100 border-4 border-white dark:border-gray-800 dark:bg-blue-900 rounded-full flex items-center justify-center text-[10px]">🎫</div>
                <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">Admit Card</div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">NTPC Admit Card is now available for download</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
              
              <div className="relative pl-8 pb-4">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-green-100 border-4 border-white dark:border-gray-800 dark:bg-green-900 rounded-full flex items-center justify-center text-[10px]">📝</div>
                <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">Application Open</div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">ONGC Application window opens today</p>
                <p className="text-xs text-gray-500 mt-1">8 hours ago</p>
              </div>

              <div className="relative pl-8 pb-4">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-purple-100 border-4 border-white dark:border-gray-800 dark:bg-purple-900 rounded-full flex items-center justify-center text-[10px]">🏆</div>
                <div className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">Result</div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">HAL Management Trainee result declared</p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-gray-200 border-4 border-white dark:border-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center text-[10px]">📋</div>
                <div className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">Notification Out</div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">BEL Probationary Engineer notification released</p>
                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
