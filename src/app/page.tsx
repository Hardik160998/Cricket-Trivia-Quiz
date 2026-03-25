'use client';

import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';

const CATEGORIES = [
  {
    id: 'ipl',
    title: 'IPL History',
    icon: '🏏',
    description: 'Teams, records, and iconic moments from 2008 to now.',
    href: '/quiz?cat=ipl'
  },
  {
    id: 'world-cup',
    title: 'World Cup Trivia',
    icon: '🏆',
    description: 'Relive the greatest spectacles in cricket history.',
    href: '/quiz?cat=wc'
  },
  {
    id: 'india',
    title: 'India Cricket Quiz',
    icon: '🇮🇳',
    description: 'Test your knowledge on the Men in Blue.',
    href: '/quiz?cat=india'
  },
  {
    id: 'stats',
    title: 'Player Stats',
    icon: '📊',
    description: 'For the fans who love the numbers behind the legends.',
    href: '/quiz?cat=stats'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Ad: Top Banner */}
      <div className="bg-slate-100 py-2 flex justify-center border-b border-slate-200">
        <AdSlot format="banner" slotId="home-top" />
      </div>

      {/* Navigation Header */}
      <header className="relative z-50 px-4 md:px-8 mt-6">
        <nav className="max-w-6xl mx-auto flex justify-between items-center py-6 bg-white/80 backdrop-blur-xl rounded-2xl px-8 shadow-2xl shadow-black/5 border border-white/20">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
               <span className="text-white font-black text-xs italic">C.Q</span>
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight">CRICKET<span className="text-primary tracking-widest">QUIZ</span></span>
          </div>
          
          <Link href="/wallet" className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100">
            <span className="text-amber-500 font-bold">🪙</span>
            <span className="text-sm font-black text-slate-700">Earnings</span>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 overflow-hidden bg-slate-900 -mt-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[0%] right-[0%] w-[30%] h-[30%] bg-secondary rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
          <div className="inline-block px-4 py-1.5 mb-6 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary">World Cup 2026 Special</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter italic leading-none">
             PUT YOUR <span className="text-secondary underline decoration-primary decoration-8 underline-offset-8">CRICKET</span> KNOWLEDGE TO THE TEST
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Join the ultimate cricket community. Compete in daily quizzes, earn coins, and climb the global leaderboards.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quiz?cat=ipl" className="px-8 py-4 bg-secondary text-secondary-foreground font-black rounded-xl shadow-xl shadow-black/10 hover:scale-[1.05] transition-all">
              START QUIZ NOW
            </Link>
            <Link href="/leaderboard" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
              VIEW LEADERBOARD
            </Link>
          </div>
        </div>
      </section>

      {/* Ad: Below Hero */}
      <div className="bg-slate-50 border-y border-slate-100 py-4 flex justify-center">
        <AdSlot format="banner" slotId="home-hero-bottom" />
      </div>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Quiz Categories</h2>
            <p className="text-slate-500">Choose your area of expertise and start winning.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link href={cat.href} key={cat.id} className="group glass-card p-6 rounded-2xl border border-slate-100 hover:border-primary transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-primary/10 transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{cat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-slate-800 mb-8 text-center italic">Cricket Deep Dives</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <article className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform">
                <h3 className="text-xl font-bold text-primary mb-3">The Evolution of IPL</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  How the Indian Premier League changed the financial and technical landscape of cricket forever.
                </p>
                <Link href="/blog/ipl-evolution" className="text-primary text-sm font-bold hover:underline">Read More →</Link>
              </article>

              <article className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform">
                <h3 className="text-xl font-bold text-primary mb-3">World Cup Magic</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  Relive the most dramatic finishes and legendary performances from the ICC World Cup archives.
                </p>
                <Link href="/blog/world-cup-magic" className="text-primary text-sm font-bold hover:underline">Read More →</Link>
              </article>

              <article className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform">
                <h3 className="text-xl font-bold text-primary mb-3">India&apos;s Rise</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  Tracking the incredible transformation of the Indian National Team into a global power.
                </p>
                <Link href="/blog/indias-rise" className="text-primary text-sm font-bold hover:underline">Read More →</Link>
              </article>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/blog" className="inline-flex items-center space-x-2 bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">
                <span>View All Articles</span>
                <span>📚</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-[10px] italic">C.Q</span>
            </div>
            <span className="text-lg font-black tracking-tight">CRICKET<span className="text-primary tracking-widest">QUIZ</span></span>
          </div>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
            The world&apos;s #1 destination for cricket trivia, stats, and coin-winning contests. 
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500 uppercase tracking-widest font-bold">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-[10px] text-slate-600">
            © 2026 CricketQuiz. All rights reserved.
          </div>
        </div>
      </footer>

      <AdSlot format="anchor" slotId="mobile-anchor" />
    </main>
  );
}
