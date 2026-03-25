'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import AdSlot from '@/components/AdSlot';

const CATEGORY_CONTENT: Record<string, { title: string, content: string, icon: string }> = {
  'ipl': {
    title: 'IPL History',
    icon: '🏏',
    content: "The Indian Premier League (IPL) has transformed the landscape of global cricket since its inception in 2008. What started as a revolutionary experiment by the BCCI has now become the wealthiest and most-watched T20 league in the world..."
  },
  'wc': {
    title: 'World Cup Trivia',
    icon: '🏆',
    content: "The ICC Cricket World Cup is the pinnacle of international cricket, where nations battle for the ultimate glory. Since the first tournament in 1975, the World Cup has provided some of the most dramatic and unforgettable moments..."
  },
  'india': {
    title: 'India Cricket Quiz',
    icon: '🇮🇳',
    content: "In India, cricket is more than just a sport; it is a religion that unites over a billion people. The journey of the Indian National Cricket Team, from being underdogs to a global superpower, is a story of grit and passion..."
  },
  'stats': {
    title: 'Player Stats',
    icon: '📊',
    content: "Cricket is a game of numbers. A single run or a single wicket can be the difference between immortality and oblivion. For fans who love to dive deep into the scorecards and statistics, the Player Stats category is the ultimate testing ground..."
  }
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = CATEGORY_CONTENT[slug];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Category Not Found</h1>
          <Link href="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-primary text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm mb-4 inline-block font-medium">
            ← Back to Home
          </Link>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-4xl">{data.icon}</span>
            <h1 className="text-4xl md:text-5xl font-black">{data.title}</h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Everything you need to know about {data.title} before you start the quiz.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <AdSlot format="banner" slotId="category-top" className="mb-12" />
        
        <article className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 italic">About this category</h2>
          <div className="text-slate-600 leading-relaxed text-lg space-y-4 whitespace-pre-line">
            {data.content}
          </div>
          
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">CHALLENGE AWAITS</span>
              <p className="text-slate-800 font-bold">Ready to test your {data.title} skills?</p>
            </div>
            <Link 
              href={`/quiz?cat=${slug}`}
              className="px-8 py-3 bg-primary text-white font-black rounded-xl hover:scale-[1.05] transition-all shadow-lg shadow-primary/20"
            >
              START QUIZ
            </Link>
          </div>
        </article>

        <AdSlot format="banner" slotId="category-bottom" className="mb-12" />
      </div>

      <footer className="bg-slate-50 py-12 px-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          © 2026 Cricket Trivia Quiz. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}
