import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

export default function IndiasRise() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/blog" className="text-primary hover:underline mb-8 inline-block font-bold">← Back to Blog</Link>
      
      <AdSlot format="banner" slotId="article-top" variant="top" className="mb-12" />

      <article className="prose prose-slate lg:prose-xl max-w-none">
        <h1 className="text-5xl font-black mb-6">The Rise of Indian Cricket: A Journey from 1983 to Dominance</h1>
        <p className="text-xl text-slate-500 mb-12 italic">From underdogs to a global superpower, the story of Indian cricket is one of grit, passion, and transformation.</p>

        <p>The history of Indian cricket can be divided into two eras: Before 1983 and After 1983. The victory at Lord&apos;s under Kapil Dev wasn&apos;t just a sporting achievement; it was the moment a billion people realized they could be the best in the world at something.</p>

        <AdSlot format="banner" slotId="article-center" variant="center" />

        <h2>The Tendulkar Era and Beyond</h2>
        <p>The 90s belonged to one man, Sachin Tendulkar. But the turn of the century brought a new toughness under Sourav Ganguly, followed by the unprecedented success of MS Dhoni. The 2007 T20 World Cup win and the 2011 ODI World Cup glory cemented India&apos;s place at the top.</p>

        <h2>The Captaincy Revolution</h2>
        <p>From the aggression of Ganguly to the 'Ice' of Dhoni and the 'Fire' of Kohli, Indian captaincy has seen a remarkable evolution. Dhoni&apos;s era brought the ICC T20 World Cup, the 2011 ODI World Cup, and the Champions Trophy, making him the most successful ICC captain in history.</p>

        <h2>Technological Prowess: The BCCI and Beyond</h2>
        <p>Off the field, the BCCI emerged as the most powerful board in the ICC. This financial strength, coupled with the success of the IPL, has allowed for massive investments in grassroots cricket, resulting in the deepest talent pool in the history of the sport.</p>

        <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold mb-4 italic">Test your knowledge of the Men in Blue!</h3>
          <p className="mb-6 text-slate-600">From the 1930s to the present day, how much do you really know about India Cricket?</p>
          <Link href="/quiz?cat=india" className="px-12 py-4 bg-primary text-white font-black rounded-xl hover:scale-105 transition-all">
            START INDIA QUIZ
          </Link>
        </div>
      </article>
    </main>
  );
}
