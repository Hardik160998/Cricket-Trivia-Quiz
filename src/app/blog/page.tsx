import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

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
    title: "The Rise of Indian Cricket: A Journey from 1983 to Dominance",
    description: 'Tracking the incredible transformation of the Indian National Team into a global cricketing superpower.',
    date: 'March 20, 2026'
  }
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Compact Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <Link href="/" className="text-slate-500 hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M5 12l7-7M5 12l7 7"/></svg>
        </Link>
        <div>
          <h1 className="text-base font-black text-slate-800">Cricket Deep Dives</h1>
          <p className="text-xs text-slate-400">Expert analysis & historical retellings</p>
        </div>
      </header>

      {/* Ad: Top */}
      <div className="flex justify-center py-3 bg-white border-b border-slate-100">
        <AdSlot format="banner" slotId="blog-list-top" variant="top" />
      </div>

      {/* Articles */}
      <div className="px-4 py-5 space-y-4">
        {ARTICLES.map((article, index) => (
          <React.Fragment key={article.slug}>
            <article className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md hover:border-primary/30 transition-all group">
              {/* Color accent bar */}
              <div className="h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="p-5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{article.date}</span>
                <h2 className="text-base font-bold text-slate-800 mb-2 leading-snug group-hover:text-primary transition-colors">{article.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{article.description}</p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all"
                >
                  Read Full Article <span>→</span>
                </Link>
              </div>
            </article>

            {index === 0 && (
              <AdSlot format="banner" slotId="blog-list-center" variant="center" />
            )}
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}
