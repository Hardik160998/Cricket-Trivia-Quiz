'use client';

import React from 'react';

interface QuizCardProps {
  question: string;
  options: string[];
  onSelect: (option: string) => void;
  selectedOption?: string;
  disabled?: boolean;
  correctAnswer?: string;
  showFeedback?: boolean;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E'];

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  options,
  onSelect,
  selectedOption,
  disabled,
  correctAnswer,
  showFeedback
}) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md">
      {/* Question Header — Dark Gradient */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-primary/30 rounded-full blur-[50px]"></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-secondary/20 rounded-full blur-[40px]"></div>

        <div className="relative z-10">
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.25em] text-primary/80 mb-2 block">Question</span>
          <h2 className="text-base font-bold text-white leading-snug">{question}</h2>
        </div>
      </div>

      {/* Options */}
      <div className="bg-white p-4 space-y-2.5">
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === correctAnswer;

          // Base classes
          let buttonClasses = 'border-2 border-slate-100 bg-slate-50 text-slate-700 hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:scale-[0.98]';
          let labelClasses = 'bg-slate-200 text-slate-500';
          let icon = OPTION_LABELS[index];

          if (isSelected && !showFeedback) {
            buttonClasses = 'border-2 border-primary bg-primary text-white shadow-lg shadow-primary/30 scale-[1.01]';
            labelClasses = 'bg-white/20 text-white';
          }

          if (showFeedback) {
            if (isCorrect) {
              buttonClasses = 'border-2 border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-[1.01]';
              labelClasses = 'bg-white/20 text-white';
              icon = '✓';
            } else if (isSelected && !isCorrect) {
              buttonClasses = 'border-2 border-rose-500 bg-rose-500 text-white shadow-md';
              labelClasses = 'bg-white/20 text-white';
              icon = '✕';
            } else {
              buttonClasses = 'border-2 border-slate-100 bg-slate-50 text-slate-400 opacity-50';
            }
          }

          return (
            <button
              key={index}
              onClick={() => onSelect(option)}
              disabled={disabled || showFeedback}
              className={`
                group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                ${buttonClasses}
                ${(disabled || showFeedback) ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Letter Badge */}
              <span className={`
                flex-shrink-0 w-7 h-7 rounded-lg text-[11px] font-black transition-all flex items-center justify-center
                ${labelClasses}
              `}>
                {icon}
              </span>

              {/* Option Text */}
              <span className="text-sm font-semibold leading-tight">{option}</span>

              {/* Correct badge */}
              {showFeedback && isCorrect && (
                <span className="ml-auto text-[10px] font-black bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex-shrink-0">
                  Correct!
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCard;
