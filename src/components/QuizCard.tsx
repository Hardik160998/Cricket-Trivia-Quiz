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
    <div className="w-full max-w-2xl mx-auto glass-card p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-tight">
        {question}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === correctAnswer;
          
          let statusClasses = 'border-slate-100 hover:border-primary/30 hover:bg-slate-50 active:scale-[0.98]';
          let iconClasses = 'bg-white border-slate-200 text-slate-400 group-hover:border-primary/50 group-hover:text-primary';

          if (isSelected) {
            statusClasses = 'border-primary bg-primary/5 shadow-md scale-[1.02]';
            iconClasses = 'bg-primary border-primary text-white';
          }

          if (showFeedback) {
            if (isCorrect) {
              statusClasses = 'border-emerald-500 bg-emerald-50 shadow-md scale-[1.02]';
              iconClasses = 'bg-emerald-500 border-emerald-500 text-white';
            } else if (isSelected && !isCorrect) {
              statusClasses = 'border-rose-500 bg-rose-50 shadow-md';
              iconClasses = 'bg-rose-500 border-rose-500 text-white';
            }
          }

          return (
            <button
              key={index}
              onClick={() => onSelect(option)}
              disabled={disabled || showFeedback}
              className={`
                group relative flex items-center p-4 rounded-xl border-2 text-left transition-all duration-200
                ${statusClasses}
                ${(disabled || showFeedback) ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-lg border mr-4 text-sm font-bold transition-colors
                ${iconClasses}
              `}>
                {showFeedback && isCorrect ? '✓' : showFeedback && isSelected && !isCorrect ? '✕' : String.fromCharCode(65 + index)}
              </div>
              <span className={`text-base font-medium ${isSelected || (showFeedback && isCorrect) ? 'text-slate-800 font-bold' : 'text-slate-600'}`}>
                {option}
              </span>
              
              {showFeedback && isCorrect && (
                <div className="ml-auto">
                   <span className="text-emerald-500 font-black text-xs uppercase tracking-widest bg-emerald-100 px-2 py-1 rounded-md animate-bounce">Correct</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCard;
