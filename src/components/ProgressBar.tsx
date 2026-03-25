'use client';

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = '' }) => {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Progress</span>
        <span className="text-sm font-bold text-slate-600 font-mono">
          {current} <span className="text-slate-300 mx-1">/</span> {total}
        </span>
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
