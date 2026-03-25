'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { getWalletBalance, updateWalletBalance } from '@/lib/wallet';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [showRewarded, setShowRewarded] = useState(false);
  const [rewardMsg, setRewardMsg] = useState('');

  useEffect(() => {
    setBalance(getWalletBalance());
  }, []);

  const handleReward = (amount: number) => {
    const newBalance = updateWalletBalance(amount);
    if (newBalance !== undefined) {
      setBalance(newBalance);
      setRewardMsg(`Success! You earned +${amount} coins!`);
      setTimeout(() => setRewardMsg(''), 5000);
    }
    setShowRewarded(false);
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center mb-12">
          <Link href="/" className="flex items-center space-x-2 group hover:opacity-80 transition-opacity text-slate-800">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-xs italic">C.Q</span>
            </div>
            <span className="text-lg font-black tracking-tight">CRICKET<span className="text-primary tracking-widest">QUIZ</span></span>
          </Link>
          <div className="inline-flex items-center self-start sm:self-auto bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-amber-500 mr-2">🪙</span>
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Earnings Profile</span>
          </div>
        </header>

        <AdSlot format="banner" slotId="wallet-top" variant="top" />

        {rewardMsg && (
          <div className="bg-emerald-500 text-white p-4 rounded-2xl font-bold animate-bounce text-center shadow-lg shadow-emerald-500/20">
            {rewardMsg}
          </div>
        )}

        {/* Balance Card */}
        <section className="glass-card p-6 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden bg-white border-none group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-primary/30 transition-colors"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="space-y-2">
              <h1 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Total Balance</h1>
              <div className="flex items-baseline space-x-3">
                <span className="text-6xl md:text-8xl font-black text-black italic tracking-tighter tabular-nums leading-none">{balance}</span>
                <span className="text-xl md:text-3xl text-amber-500 font-black uppercase tracking-widest italic pt-2">Coins</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 sm:flex-none px-10 py-5 bg-primary text-white font-black rounded-2xl hover:scale-[1.05] active:scale-95 transition-all shadow-2xl shadow-primary/40 text-sm tracking-widest">WITHDRAW</button>
              <button className="flex-1 sm:flex-none px-10 py-5 bg-white/5 text-black font-bold rounded-2xl border border-slate-200 backdrop-blur-xl hover:bg-white/10 transition-all text-sm tracking-widest">HISTORY</button>
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
              <button 
                onClick={() => setShowRewarded(true)}
                className="bg-slate-50 px-4 py-2 rounded-lg text-xs font-black text-primary group-hover:bg-primary group-hover:text-white transition-all"
              >
                WATCH
              </button>
              {showRewarded && (
                <AdSlot 
                  format="rewarded" 
                  slotId="rewarded-video" 
                  onReward={(amount) => handleReward(amount || 15)} 
                />
              )}
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
