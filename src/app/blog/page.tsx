import Link from 'next/link';

const ARTICLES = [
  {
    slug: 'ipl-evolution',
    title: 'The Evolution of IPL: From 2008 to the Global Powerhouse',
    description: 'How the Indian Premier League changed the financial and technical landscape of cricket forever.',
    date: 'March 24, 2026'
  },
  {
    slug: 'world-cup-magic',
    title: 'World Cup Magic: Unforgettable Moments in ODI History',
    description: 'Relive the most dramatic finishes and legendary performances from the ICC World Cup archives.',
    date: 'March 22, 2026'
  },
  {
    slug: 'indias-rise',
    title: 'The Rise of Indian Cricket: A Journey from 1983 to Dominance',
    description: 'Tracking the incredible transformation of the Indian National Team into a global cricketing superpower.',
    date: 'March 20, 2026'
  }
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-primary hover:underline mb-8 inline-block font-bold">← Back to Home</Link>
        <h1 className="text-5xl font-black text-slate-800 mb-4">Cricket Deep Dives</h1>
        <p className="text-xl text-slate-500 mb-16">Expert analysis, historical retellings, and the latest stats from the world of cricket.</p>

        <div className="grid grid-cols-1 gap-12">
          {ARTICLES.map((article) => (
            <article key={article.slug} className="glass-card p-10 rounded-3xl border border-slate-100 hover:border-primary transition-all group">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">{article.date}</span>
              <h2 className="text-3xl font-bold text-slate-800 mb-4 group-hover:text-primary transition-colors">{article.title}</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">{article.description}</p>
              <Link 
                href={`/blog/${article.slug}`}
                className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all"
              >
                <span>Read Full Article</span>
                <span>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
