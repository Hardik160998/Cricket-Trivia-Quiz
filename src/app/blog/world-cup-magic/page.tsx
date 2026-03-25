import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

export default function WorldCupMagic() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/blog" className="text-primary hover:underline mb-8 inline-block font-bold">← Back to Blog</Link>
      
      <AdSlot format="banner" slotId="article-top" variant="top" className="mb-12" />

      <article className="prose prose-slate lg:prose-xl max-w-none">
        <h1 className="text-5xl font-black mb-6">World Cup Magic: Unforgettable Moments in ODI History</h1>
        <p className="text-xl text-slate-500 mb-12 italic">Reliving the drama, the heroes, and the records that define the pinnacle of One Day International cricket.</p>
        
        <p>The ICC Cricket World Cup is where legends are born. Every four years, the world stops to watch the finest cricketers battle for the ultimate prize. From the West Indian dominance in the 70s to Australia&apos;s golden era, the tournament has provided endless drama.</p>

        <AdSlot format="banner" slotId="article-center" variant="center" />

        <h2>The Underdog Stories</h2>
        <h2>1983: The Day India Shocked the World</h2>
        <p>Arguably the most significant moment in Asian cricket history was Kapil Dev&apos;s India defeating the mighty West Indies at Lord&apos;s in 1983. Defending a measly 183, the Indian bowlers produced a masterclass that ignited a billion passions and changed the trajectory of the game in India forever.</p>

        <h2>The Australian Dynasty</h2>
        <p>Australia&apos;s three consecutive titles between 1999 and 2007 represent the greatest era of dominance by any team in sport. Led by Steve Waugh and Ricky Ponting, the Aussies were unbeatable, fueled by stars like Shane Warne, Glenn McGrath, and Adam Gilchrist.</p>

        <h2>Modern Classical Finals</h2>
        <p>The 2011 final in Mumbai and the 2019 super-over thriller at Lord&apos;s are etched in memory. MS Dhoni&apos;s winning six and Ben Stokes&apos; heroic stand showed the incredible mental fortitude required to win on the biggest stage of all.</p>

        <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold mb-4 italic">How well do you remember the World Cup?</h3>
          <p className="mb-6 text-slate-600">Relive the trophies and the trivia in our World Cup Special Quiz!</p>
          <Link href="/quiz?cat=wc" className="px-12 py-4 bg-primary text-white font-black rounded-xl hover:scale-105 transition-all">
            START WC QUIZ
          </Link>
        </div>
      </article>
    </main>
  );
}
