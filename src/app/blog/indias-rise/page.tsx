import Link from 'next/link';

export default function IndiasRise() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/blog" className="text-primary hover:underline mb-8 inline-block font-bold">← Back to Blog</Link>
      <article className="prose prose-slate lg:prose-xl max-w-none">
        <h1 className="text-5xl font-black mb-6">The Rise of Indian Cricket: 1983 to Dominance</h1>
        <p className="text-xl text-slate-500 mb-12 italic">How India evolved from being underdogs into the administrative and competitive heart of global cricket.</p>
        
        <p>Indian cricket history can be divided into two eras: Before 1983 and After 1983. The shocking victory in the 1983 World Cup convinced a nation of over a billion that they could not only compete but lead the world on the cricket field.</p>

        <h2>The Era of Legends</h2>
        <p>The 90s and 2000s saw the emergence of the &quot;Fab Four&quot;—Sachin Tendulkar, Rahul Dravid, Sourav Ganguly, and VVS Laxman. Together with Anil Kumble, they built a fortress at home and began winning regularly overseas, culminating in reaching the #1 Test ranking.</p>

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
