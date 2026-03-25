'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { getWalletBalance } from '@/lib/wallet';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(getWalletBalance());
  }, []);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center space-x-2 group hover:opacity-80 transition-opacity text-slate-800">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-xs italic">C.Q</span>
            </div>
            <span className="text-lg font-black tracking-tight">CRICKET<span className="text-primary tracking-widest">QUIZ</span></span>
          </Link>
          <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Wallet Profile</div>
        </header>

        <AdSlot format="banner" slotId="wallet-top" variant="top" />

        {/* Balance Card */}
        <section className="glass-card p-10 rounded-3xl shadow-2xl relative overflow-hidden bg-slate-900 border-none group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-primary/30 transition-colors"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h1 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-3">Total Earnings</h1>
              <div className="flex items-end space-x-3">
                <span className="text-6xl font-black text-white italic tracking-tighter">{balance}</span>
                <span className="text-2xl text-amber-500 mb-2 font-bold uppercase tracking-widest">Coins</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="px-8 py-4 bg-primary text-white font-black rounded-xl hover:scale-[1.05] transition-all shadow-xl shadow-primary/20">WITHDRAW</button>
              <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">HISTORY</button>
            </div>
          </div>
        </section>

        <AdSlot format="banner" slotId="wallet-center" variant="center" />

        {/* Ways to Earn */}
        <section className="space-y-6">
          <h2 className="text-xl font-black text-slate-800 flex items-center">
            <span className="mr-2">⚡</span> Ways to Earn More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-primary transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-xl">📺</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Watch Video Ad</h3>
                  <p className="text-slate-400 text-xs">+15 Coins</p>
                </div>
              </div>
              <button className="bg-slate-50 px-4 py-2 rounded-lg text-xs font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">WATCH</button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-primary transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl">📅</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Daily Check-in</h3>
                  <p className="text-slate-400 text-xs">+5 Coins</p>
                </div>
              </div>
              <button className="bg-slate-50 px-4 py-2 rounded-lg text-xs font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">CLAIM</button>
            </div>
          </div>
        </section>

        <AdSlot format="banner" slotId="wallet-bottom" className="mt-8" />
      </div>
    </main>
  );
}
