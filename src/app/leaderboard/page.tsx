'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

interface LeaderboardUser {
  id: string;
  display_name: string;
  total_coins: number;
  total_score: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_stats')
        .select('id, display_name, total_coins, total_score')
        .order('total_coins', { ascending: false })
        .limit(10);

      if (data) {
        setUsers(data);
      }
      setLoading(false);
    }
    fetchLeaderboard();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <Link href="/" className="text-primary font-bold hover:underline">← Back</Link>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Leaderboard</h1>
          <div className="w-8"></div>
        </header>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 flex justify-between items-center text-white">
            <span className="text-xs font-black uppercase tracking-widest">Rank #1-10</span>
            <span className="text-xs font-black uppercase tracking-widest">Global Standings</span>
          </div>

          <div className="p-2">
            {loading ? (
              <div className="py-20 text-center">
                 <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                 <p className="text-slate-400 font-bold">Fetching rankings...</p>
              </div>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <div 
                  key={user.id} 
                  className={`
                    flex items-center p-6 rounded-2xl mb-2 transition-all
                    ${index === 0 ? 'bg-amber-50 border border-amber-100' : 'hover:bg-slate-50'}
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center font-black mr-6
                    ${index === 0 ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 
                      index === 1 ? 'bg-slate-300 text-slate-700' :
                      index === 2 ? 'bg-orange-300 text-orange-900' : 'bg-slate-100 text-slate-400'}
                  `}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{user.display_name || 'Anonymous Player'}</h3>
                    <p className="text-xs text-slate-400">{user.total_score} Questions Answered</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-700">{user.total_coins}</span>
                    <span className="ml-1 text-sm">🪙</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-slate-400 italic">No rankings yet. Start playing to be the first!</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 bg-primary rounded-3xl flex items-center justify-between text-white shadow-xl shadow-primary/20">
          <div className="flex items-center space-x-4">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">👤</div>
             <div>
               <p className="text-xs font-black opacity-60 uppercase tracking-widest">Your Rank</p>
               <h3 className="text-lg font-bold">#2,451</h3>
             </div>
          </div>
          <Link href="/quiz" className="bg-white text-primary px-6 py-2 rounded-xl font-bold hover:bg-slate-50 transition-colors">Play & Climb</Link>
        </div>
      </div>
    </main>
  );
}
