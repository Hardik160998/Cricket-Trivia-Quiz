'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { createClient } from '@/utils/supabase/client';

const SLUG_ICONS: Record<string, string> = {
  'ipl': '🏏',
  'wc': '🏆',
  'india': '🇮🇳',
  'stats': '📊',
  't20': '⚡',
  'rules': '📖',
  'legends': '🌟',
  'ipl-teams': '🎽',
  'stadiums': '🏟️',
  'women': '💪',
};

const CATEGORY_META: Record<string, { prize: string; players: string; entry: string }> = {
  'ipl':       { prize: '500 Coins', players: '3,240 Playing', entry: 'Free' },
  'wc':        { prize: '750 Coins', players: '5,120 Playing', entry: 'Free' },
  'india':     { prize: '400 Coins', players: '2,890 Playing', entry: 'Free' },
  'stats':     { prize: '600 Coins', players: '1,750 Playing', entry: 'Free' },
  't20':       { prize: '550 Coins', players: '4,300 Playing', entry: 'Free' },
  'rules':     { prize: '300 Coins', players: '1,200 Playing', entry: 'Free' },
  'legends':   { prize: '650 Coins', players: '3,800 Playing', entry: 'Free' },
  'ipl-teams': { prize: '450 Coins', players: '2,100 Playing', entry: 'Free' },
  'stadiums':  { prize: '350 Coins', players: '980 Playing',   entry: 'Free' },
  'women':     { prize: '500 Coins', players: '1,560 Playing', entry: 'Free' },
};

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('name');
      if (!error && data) setCategories(data);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  const meta = (slug: string) => CATEGORY_META[slug] || { prize: '500 Coins', players: '1,000 Playing', entry: 'Free' };

  return (
    <main className="min-h-screen bg-white">
      {/* Ad: Top Banner */}
      <div className="bg-slate-100 py-2 flex justify-center border-b border-slate-200">
        <AdSlot format="banner" slotId="home-top" />
      </div>

      {/* Navigation Header */}
      <header className="relative z-50 px-4 mt-5">
        <nav className="flex justify-between items-center py-3 bg-white/80 backdrop-blur-xl rounded-2xl px-5 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
               <span className="text-white font-black text-xs italic">C.Q</span>
            </div>
            <span className="text-lg font-black text-slate-800 tracking-tight">CRICKET<span className="text-primary tracking-widest">QUIZ</span></span>
          </div>
          <Link href="/wallet" className="flex items-center space-x-2 bg-amber-50 px-3 py-2 rounded-xl hover:bg-amber-100 transition-colors border border-amber-100">
            <span className="text-amber-500">🪙</span>
            <span className="text-sm font-black text-amber-700">Wallet</span>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-10 pb-10 px-4 overflow-hidden bg-slate-900 mt-4">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-secondary rounded-full blur-[80px]"></div>
        </div>
        <div className="text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-block px-4 py-1 mb-3 bg-white/10 rounded-full border border-white/20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary">World Cup 2026 Special</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-3 tracking-tighter italic leading-tight">
            TEST YOUR <span className="text-secondary">CRICKET</span> KNOWLEDGE
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Compete in quizzes, earn coins &amp; climb the leaderboard!
          </p>
        </div>
      </section>

      {/* Ad: Below Hero */}
      <div className="bg-slate-50 border-y border-slate-100 py-3 flex justify-center">
        <AdSlot format="banner" slotId="home-hero-bottom" />
      </div>

      {/* Categories Section */}
      <section className="px-4 py-6">
        <h2 className="text-lg font-black text-slate-800 mb-1">Live Contests</h2>
        <p className="text-slate-500 text-sm mb-5">Choose a quiz and start winning coins</p>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {categories.map((cat) => {
              const m = meta(cat.slug);
              return (
                <div
                  key={cat.id}
                  className="relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all overflow-hidden"
                >
                  {/* LIVE badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">LIVE</span>
                  </div>

                  <div className="flex items-center p-3 pr-4">
                    {/* Category Icon */}
                    <div className="flex flex-col items-center mr-4 min-w-[64px]">
                      <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-3xl mb-1">
                        {SLUG_ICONS[cat.slug] || '🏏'}
                      </div>
                      <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider text-center leading-tight">{cat.name.split(' ').slice(0,2).join(' ')}</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 pr-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-sm font-black text-slate-800">Play &amp; Win</span>
                        <span className="text-amber-500 text-sm font-black">{m.prize}</span>
                        <span className="text-amber-500">🪙</span>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <span>🏆</span>
                          <span>10 Questions to Answer</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <span>👥</span>
                          <span>{m.players}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <span>▶</span>
                          <span>Entry: {m.entry}</span>
                        </div>
                      </div>
                    </div>

                    {/* Play Button */}
                    <Link
                      href={`/quiz?cat=${cat.slug}`}
                      className="flex-shrink-0 bg-primary text-white font-black text-xs px-4 py-2.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/30 flex items-center gap-1"
                    >
                      PLAY <span>▶</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-[10px] italic">C.Q</span>
          </div>
          <span className="text-base font-black tracking-tight">CRICKET<span className="text-primary tracking-widest">QUIZ</span></span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500 uppercase tracking-widest font-bold mb-4">
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </div>
        <div className="text-[10px] text-slate-600">© 2026 CricketQuiz. All rights reserved.</div>
      </footer>
    </main>
  );
}
