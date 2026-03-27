import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

export default function WorldCupMagic() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <Link href="/blog" className="text-slate-500 hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M5 12l7-7M5 12l7 7"/></svg>
        </Link>
        <span className="text-sm font-bold text-slate-600">Back to Blog</span>
      </header>

      <div className="flex justify-center py-3 border-b border-slate-100 bg-slate-50">
        <AdSlot format="banner" slotId="article-top" variant="top" />
      </div>

      <article className="px-4 py-5">
        <h1 className="text-xl font-black text-slate-800 mb-2 leading-tight">World Cup Magic: Unforgettable Moments in ODI History</h1>
        <p className="text-sm text-slate-500 mb-5 italic leading-relaxed">Reliving the drama, the heroes, and the records that define the pinnacle of One Day International cricket.</p>

        <p className="text-sm text-slate-700 leading-relaxed mb-4">The ICC Cricket World Cup is where legends are born. Every four years, the world stops to watch the finest cricketers battle for the ultimate prize. From West Indian dominance in the 70s to Australia&apos;s golden era, the tournament has provided endless drama.</p>

        <AdSlot format="banner" slotId="article-center" variant="center" />

        <h2 className="text-base font-bold text-slate-800 mt-5 mb-2">1983: The Day India Shocked the World</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">Arguably the most significant moment in Asian cricket history was Kapil Dev&apos;s India defeating the mighty West Indies at Lord&apos;s in 1983. Defending a measly 183, the Indian bowlers produced a masterclass that ignited a billion passions.</p>

        <h2 className="text-base font-bold text-slate-800 mb-2">The Australian Dynasty</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">Australia&apos;s three consecutive titles between 1999 and 2007 represent the greatest era of dominance by any team in sport. Led by Steve Waugh and Ricky Ponting, the Aussies were unbeatable.</p>

        <h2 className="text-base font-bold text-slate-800 mb-2">Modern Classical Finals</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-5">The 2011 final in Mumbai and the 2019 super-over thriller at Lord&apos;s are etched in memory. MS Dhoni&apos;s winning six and Ben Stokes&apos; heroic stand showed the incredible mental fortitude required to win on the biggest stage.</p>

        <div className="mt-4 p-5 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center text-center">
          <h3 className="text-base font-bold text-slate-800 mb-2 italic">Remember the World Cup?</h3>
          <p className="mb-4 text-slate-500 text-sm">Test your knowledge in our World Cup quiz!</p>
          <Link href="/quiz?cat=wc" className="px-8 py-3 bg-primary text-white font-black rounded-xl text-sm hover:bg-primary/90 active:scale-95 transition-all">
            START WC QUIZ
          </Link>
        </div>
      </article>
    </main>
  );
}
