'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function DiagnosticsPage() {
  const [status, setStatus] = useState<any>({
    loading: true,
    env: {},
    supabase: 'Running connectivity test...',
  });

  useEffect(() => {
    async function runDiagnostics() {
      const supabase = createClient();
      
      const results = {
        supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Present' : '❌ Missing',
        supabase_key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? '✅ Present' : '❌ Missing',
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
        location: typeof window !== 'undefined' ? window.location.href : 'Server',
      };

      try {
        const { data, error } = await supabase.from('categories').select('count', { count: 'exact', head: true });
        if (error) throw error;
        setStatus({
          loading: false,
          env: results,
          supabase: `✅ Connected! Found categories count: ${data || 'N/A'}`,
        });
      } catch (err: any) {
        setStatus({
          loading: false,
          env: results,
          supabase: `❌ Connection Failed: ${err.message || 'Unknown error'}`,
        });
      }
    }

    runDiagnostics();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-black text-slate-800 mb-6">System Diagnostics</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Environment Variables</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-auto text-sm">
              {JSON.stringify(status.env, null, 2)}
            </pre>
          </section>

          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Supabase Connectivity</h2>
            <div className={`p-4 rounded-xl border font-bold ${status.supabase.startsWith('✅') ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}>
              {status.supabase}
            </div>
          </section>

          <div className="pt-6 border-t border-slate-100">
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-2 bg-slate-800 text-white rounded-lg font-bold text-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
