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
      setRewardMsg(`+${amount} coins added!`);
      setTimeout(() => setRewardMsg(''), 4000);
    }
    setShowRewarded(false);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Compact Sticky Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
            <span className="text-white font-black text-[10px] italic">C.Q</span>
          </div>
          <span className="text-base font-black text-slate-800 tracking-tight">CRICKET<span className="text-primary">QUIZ</span></span>
        </Link>
        <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
          <span className="text-amber-500 text-sm">🪙</span>
          <span className="text-xs font-black text-amber-700 uppercase tracking-widest">Wallet</span>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        <AdSlot format="banner" slotId="wallet-top" variant="top" />

        {rewardMsg && (
          <div className="bg-emerald-500 text-white px-4 py-3 rounded-xl font-bold text-sm text-center shadow-lg animate-in fade-in duration-300">
            🎉 {rewardMsg}
          </div>
        )}

        {/* Balance Card */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[60px] -mr-10 -mt-10"></div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Total Balance</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black text-white italic tracking-tighter tabular-nums">{balance}</span>
            <span className="text-base text-amber-400 font-black uppercase tracking-wider">Coins 🪙</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 bg-primary text-white font-black rounded-xl text-xs tracking-widest hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/30">WITHDRAW</button>
            <button className="flex-1 py-2.5 bg-white/10 text-white font-bold rounded-xl border border-white/20 text-xs tracking-widest hover:bg-white/20 transition-all">HISTORY</button>
          </div>
        </section>

        <AdSlot format="banner" slotId="wallet-center" variant="center" />

        {/* Ways to Earn */}
        <section className="space-y-3">
          <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
            <span>⚡</span> Ways to Earn
          </h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-primary transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-lg">📺</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Watch Video Ad</h3>
                  <p className="text-slate-400 text-xs">Earn +15 Coins</p>
                </div>
              </div>
              <button
                onClick={() => setShowRewarded(true)}
                className="bg-primary/10 px-3 py-1.5 rounded-lg text-xs font-black text-primary group-hover:bg-primary group-hover:text-white transition-all"
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

            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-primary transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg">📅</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Daily Check-in</h3>
                  <p className="text-slate-400 text-xs">Earn +5 Coins</p>
                </div>
              </div>
              <button className="bg-primary/10 px-3 py-1.5 rounded-lg text-xs font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">CLAIM</button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-primary transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-lg">🏏</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Play a Quiz</h3>
                  <p className="text-slate-400 text-xs">Earn up to +25 Coins</p>
                </div>
              </div>
              <Link href="/" className="bg-primary/10 px-3 py-1.5 rounded-lg text-xs font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">PLAY</Link>
            </div>
          </div>
        </section>

        <AdSlot format="banner" slotId="wallet-bottom" />
      </div>
    </main>
  );
}
