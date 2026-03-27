import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

export default function IPLEvolution() {
  return (
    <main className="min-h-screen bg-white">
      {/* Compact Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <Link href="/blog" className="text-slate-500 hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M5 12l7-7M5 12l7 7"/></svg>
        </Link>
        <span className="text-sm font-bold text-slate-600">Back to Blog</span>
      </header>
      
      {/* Top Ad */}
      <div className="flex justify-center py-3 border-b border-slate-100 bg-slate-50">
        <AdSlot format="banner" slotId="article-top" variant="top" />
      </div>

      <article className="px-4 py-5">
        <h1 className="text-xl font-black text-slate-800 mb-2 leading-tight">The Evolution of IPL: From 2008 to the Global Powerhouse</h1>
        <p className="text-sm text-slate-500 mb-5 italic leading-relaxed">Tracing the journey of the Indian Premier League from a bold experiment to the world&apos;s most influential cricket league.</p>
        
        <p className="text-sm text-slate-700 leading-relaxed mb-4">In 2008, when the first ball was bowled in the inaugural Indian Premier League (IPL) match between Kolkata Knight Riders and Royal Challengers Bangalore, few could have predicted the seismic shift it would cause in the sporting world.</p>

        <AdSlot format="banner" slotId="article-center" variant="center" />
        
        <h2 className="text-base font-bold text-slate-800 mt-5 mb-2">The Early Years: Glamour and Uncertainty</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">The first season was as much about Bollywood and celebrity owners as it was about cricket. The late Shane Warne leading an underdog Rajasthan Royals team to victory remains one of the most romantic stories in the league&apos;s history.</p>

        <h2 className="text-base font-bold text-slate-800 mb-2">Technological and Tactical Shifts</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">As the league matured, so did the strategies. Data analytics became the backbone of team selection and on-field maneuvers. Matches are now won and lost on the margins—analysing strike rates against specific bowlers, the impact of dew, and the perfection of the &apos;Impact Player&apos; rule.</p>

        <blockquote className="border-l-4 border-primary pl-4 my-4 text-sm text-slate-600 italic">
          &quot;The IPL hasn&apos;t just changed the way cricket is played; it has changed the way it is consumed and monetized globally.&quot;
        </blockquote>

        <h2 className="text-base font-bold text-slate-800 mb-2">A Global Phenomenon</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-5">Today, the IPL stands as a multi-billion dollar entity, with media rights rivaling some of the biggest sporting leagues in the world. It has become a talent factory for the Indian National Team.</p>

        <div className="mt-4 p-5 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center text-center">
          <h3 className="text-base font-bold text-slate-800 mb-2 italic">Think you know IPL?</h3>
          <p className="mb-4 text-slate-500 text-sm">Put your knowledge to the test and win coins!</p>
          <Link href="/quiz?cat=ipl" className="px-8 py-3 bg-primary text-white font-black rounded-xl text-sm hover:bg-primary/90 active:scale-95 transition-all">
            START IPL QUIZ
          </Link>
        </div>
      </article>
    </main>
  );
}
