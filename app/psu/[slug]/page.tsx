import { PSUS } from "@/lib/data";
import { notFound } from "next/navigation";
import ClientTabs from "./ClientTabs";

export default async function PSUPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const psu = PSUS.find((p) => p.slug === slug);

  if (!psu) {
    notFound();
  }

  const totalVacancies = psu.recruitments.reduce((sum, r) => sum + r.totalVacancies, 0);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div 
        className="rounded-2xl p-8 mb-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-6 shadow-xl"
        style={{ background: `linear-gradient(135deg, ${psu.color}, #1f2937)` }}
      >
        <div className="text-8xl bg-white/20 p-4 rounded-2xl backdrop-blur-md">
          {psu.logoEmoji}
        </div>
        <div className="flex-1 text-center md:text-left z-10">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md">{psu.category}</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md">{psu.sector}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{psu.fullName}</h1>
          <p className="text-xl font-medium opacity-90 mb-6">{psu.name}</p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
            <a 
              href={psu.careerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-md"
            >
              Official Career Page ↗
            </a>
            <div className="text-sm bg-black/20 px-4 py-2 rounded-lg backdrop-blur-md">
              {totalVacancies} total posts | {psu.branches.length} disciplines
            </div>
          </div>
        </div>
      </div>

      <ClientTabs psu={psu} />
    </main>
  );
}
