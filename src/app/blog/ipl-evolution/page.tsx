import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

export default function IPLEvolution() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/blog" className="text-primary hover:underline mb-8 inline-block font-bold">← Back to Blog</Link>
      
      <AdSlot format="banner" slotId="article-top" variant="top" className="mb-12" />

      <article className="prose prose-slate lg:prose-xl max-w-none">
        <h1 className="text-5xl font-black mb-6">The Evolution of IPL: From 2008 to the Global Powerhouse</h1>
        <p className="text-xl text-slate-500 mb-12 italic">Tracing the journey of the Indian Premier League from a bold experiment to the world&apos;s most influential cricket league.</p>
        
        <p>In 2008, when the first ball was bowled in the inaugural Indian Premier League (IPL) match between Kolkata Knight Riders and Royal Challengers Bangalore, few could have predicted the seismic shift it would cause in the sporting world.</p>

        <AdSlot format="banner" slotId="article-center" variant="center" />
        
        <h2>The Early Years: Glamour and Uncertainty</h2>
        <p>The first season was as much about Bollywood and celebrity owners as it was about cricket. The late Shane Warne leading an underdog Rajasthan Royals team to victory remains one of the most romantic stories in the league&apos;s history. It proved that in T20, tactics and belief could overcome star-studded lineups.</p>

        <h2>Technological and Tactical Shifts</h2>
        <p>As the league matured, so did the strategies. Data analytics became the backbone of team selection and on-field maneuvers. Matches are now won and lost on the margins—analysing strike rates against specific bowlers, the impact of the dew factor, and the perfection of the 'Impact Player' rule introduced recently.</p>

        <blockquote>
          "The IPL hasn&apos;t just changed the way cricket is played; it has changed the way it is consumed and monetized globally."
        </blockquote>

        <h2>A Global Phenomenon</h2>
        <p>Today, the IPL stands as a multi-billion dollar entity, with media rights rivaling some of the biggest sporting leagues in the world like the NFL and Premier League. It has become a talent factory for the Indian National Team and a destination for every international star seeking the highest level of competition.</p>

        <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold mb-4 italic">Think you know IPL like a pro?</h3>
          <p className="mb-6 text-slate-600">Put your knowledge to the test in our comprehensive IPL History Quiz and win exclusive coins!</p>
          <Link href="/quiz?cat=ipl" className="px-12 py-4 bg-primary text-white font-black rounded-xl hover:scale-105 transition-all">
            START IPL QUIZ
          </Link>
        </div>
      </article>
    </main>
  );
}
