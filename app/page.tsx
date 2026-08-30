import Link from "next/link";
import { PSUS } from "@/lib/data";
import PSUCard from "@/components/PSUCard";

export default function Home() {
  const topPSUs = PSUS.slice(0, 6);
  
  const branches = [
    "⚡ Electrical",
    "🖥️ CSE/IT",
    "⚙️ Mechanical",
    "🏗️ Civil",
    "📡 Electronics"
  ];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Track Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">PSU Recruitment</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Never miss a deadline again. Get real-time updates on notifications, admit cards, and results for Maharatna, Navratna, and Miniratna companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/explore" 
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Explore PSUs
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm active:scale-95"
            >
              Go to Dashboard
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="text-sm font-medium text-gray-500 py-1.5">Quick Search:</span>
            {branches.map(b => (
              <Link key={b} href={`/explore?branch=${b}`} className="px-3 py-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium hover:bg-white dark:hover:bg-gray-700 transition-colors">
                {b}
              </Link>
            ))}
            <Link href="/explore" className="px-3 py-1.5 text-blue-600 font-medium text-sm hover:underline">View All &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Phase Explainer */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">We track every stage</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">From the first notification to the final joining, we keep you updated at every step of the recruitment process.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {['Notification', 'Application', 'Admit Card', 'Exam', 'Result', 'Joining'].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl font-bold">
                  <span className="text-blue-500 mr-2">{i+1}.</span> {step}
                </div>
                {i < 5 && <div className="hidden md:block w-8 h-0.5 bg-gray-300 dark:bg-gray-700 mx-4"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Recruiters</h2>
              <p className="text-gray-500 text-lg">Most sought-after public sector companies</p>
            </div>
            <Link href="/explore" className="hidden md:inline-flex text-blue-600 font-bold hover:underline items-center gap-2">
              View all PSUs <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPSUs.map(psu => (
              <PSUCard key={psu.id} psu={psu} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/explore" className="inline-flex text-blue-600 font-bold hover:underline items-center gap-2">
              View all PSUs <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
            <p className="text-gray-500">Get notified the moment a notification drops or a result is declared.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">Smart Filtering</h3>
            <p className="text-gray-500">Only see recruitments relevant to your engineering branch and qualifications.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Salary Insights</h3>
            <p className="text-gray-500">Compare in-hand salary, perks, and bond conditions across different PSUs.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black">
        <p>&copy; {new Date().getFullYear()} PSUTrack. All rights reserved.</p>
      </footer>
    </main>
  );
}
