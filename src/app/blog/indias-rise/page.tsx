import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

export default function IndiasRise() {
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
        <h1 className="text-xl font-black text-slate-800 mb-2 leading-tight">The Rise of Indian Cricket: A Journey from 1983 to Dominance</h1>
        <p className="text-sm text-slate-500 mb-5 italic leading-relaxed">From underdogs to a global superpower, the story of Indian cricket is one of grit, passion, and transformation.</p>

        <p className="text-sm text-slate-700 leading-relaxed mb-4">The history of Indian cricket can be divided into two eras: Before 1983 and After 1983. The victory at Lord&apos;s under Kapil Dev wasn&apos;t just a sporting achievement; it was the moment a billion people realized they could be the best in the world at something.</p>

        <AdSlot format="banner" slotId="article-center" variant="center" />

        <h2 className="text-base font-bold text-slate-800 mt-5 mb-2">The Tendulkar Era and Beyond</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">The 90s belonged to one man, Sachin Tendulkar. But the turn of the century brought a new toughness under Sourav Ganguly, followed by the unprecedented success of MS Dhoni. The 2007 T20 World Cup win and the 2011 ODI World Cup glory cemented India&apos;s place at the top.</p>

        <h2 className="text-base font-bold text-slate-800 mb-2">The Captaincy Revolution</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">From the aggression of Ganguly to the &apos;Ice&apos; of Dhoni and the &apos;Fire&apos; of Kohli, Indian captaincy has seen remarkable evolution. Dhoni&apos;s era brought the ICC T20 World Cup, the 2011 ODI World Cup, and the Champions Trophy, making him the most successful ICC captain in history.</p>

        <h2 className="text-base font-bold text-slate-800 mb-2">Technological Prowess: The BCCI and Beyond</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-5">Off the field, the BCCI emerged as the most powerful board in the ICC. This financial strength, combined with the IPL, has allowed for massive investments in grassroots cricket, resulting in the deepest talent pool in the history of the sport.</p>

        <div className="mt-4 p-5 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center text-center">
          <h3 className="text-base font-bold text-slate-800 mb-2 italic">Know your Men in Blue?</h3>
          <p className="mb-4 text-slate-500 text-sm">Test your India cricket knowledge and win coins!</p>
          <Link href="/quiz?cat=india" className="px-8 py-3 bg-primary text-white font-black rounded-xl text-sm hover:bg-primary/90 active:scale-95 transition-all">
            START INDIA QUIZ
          </Link>
        </div>
      </article>
    </main>
  );
}
