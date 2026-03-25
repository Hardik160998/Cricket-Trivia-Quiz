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
      <div className="max-w-xl mx-auto space-y-8">
        <Link href="/" className="text-primary font-bold hover:underline mb-4 inline-block">← Back to Home</Link>
        
        {/* Balance Card */}
        <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <p className="text-primary-foreground/70 uppercase tracking-widest text-xs font-black mb-2">Total Balance</p>
            <div className="flex items-center space-x-4">
              <span className="text-5xl font-black">{balance}</span>
              <span className="text-2xl">🪙</span>
            </div>
            <div className="mt-8 flex space-x-2">
              <button className="flex-1 bg-white text-primary py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">Withdraw</button>
              <button className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors">History</button>
            </div>
          </div>
        </div>

        {/* Ways to Earn */}
        <section>
          <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center">
            <span className="mr-2">⚡</span> Ways to Earn More
          </h2>
          <div className="grid grid-cols-1 gap-4">
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

            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-primary transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-xl">🤝</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Refer a Friend</h3>
                  <p className="text-slate-400 text-xs">+50 Coins</p>
                </div>
              </div>
              <button className="bg-slate-50 px-4 py-2 rounded-lg text-xs font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">INVITE</button>
            </div>
          </div>
        </section>
        <AdSlot format="banner" slotId="wallet-bottom" className="mt-8" />
      </div>
      <AdSlot format="anchor" slotId="mobile-anchor" />
    </main>
  );
}
