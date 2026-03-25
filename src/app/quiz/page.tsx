'use client';

import React, { useState, useEffect } from 'react';
import QuizCard from '@/components/QuizCard';
import ProgressBar from '@/components/ProgressBar';
import AdSlot from '@/components/AdSlot';
import { useQuiz } from '@/hooks/useQuiz';
import { createClient } from '@/utils/supabase/client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getWalletBalance, updateWalletBalance } from '@/lib/wallet';
import { Suspense } from 'react';

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

function QuizContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('cat') || 'ipl';
  const supabase = createClient();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | undefined>();
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalCoins, setTotalCoins] = useState(0);
  const [hasSavedFinal, setHasSavedFinal] = useState(false);

  const { 
    currentQuestionIndex, 
    score, 
    coinsEarned, 
    isFinished, 
    handleAnswer, 
    successRate 
  } = useQuiz(questions.length);

  // Initialize total coins from wallet
  useEffect(() => {
    setTotalCoins(getWalletBalance());
  }, []);

  // Fetch questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        
        const { data: catData, error: catError } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .single();

        if (catError) throw catError;

        if (catData) {
          const { data: qData, error: qError } = await supabase
            .from('questions')
            .select('question, options, correct_answer')
            .eq('category_id', catData.id)
            .limit(10);

          if (qError) throw qError;

          if (qData) {
            setQuestions(qData);
          }
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [categorySlug, supabase]);

  // Persist coins when finished
  useEffect(() => {
    if (isFinished && !hasSavedFinal) {
      updateWalletBalance(coinsEarned);
      setHasSavedFinal(true);
      // Refresh total coins display
      setTotalCoins(getWalletBalance());
    }
  }, [isFinished, coinsEarned, hasSavedFinal]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">No questions found</h1>
        <p className="text-slate-500 mb-8">We couldn&apos;t find any questions for this category. Please try again later.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const onNext = () => {
    if (!selected) return;

    if (!showFeedback) {
      setShowFeedback(true);
      return;
    }

    handleAnswer(selected === currentQuestion.correct_answer);
    setSelected(undefined);
    setShowFeedback(false);
    
    if ((currentQuestionIndex + 1) % 3 === 0 && !isFinished) {
      console.log("Triggering Interstitial Ad");
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <AdSlot format="banner" slotId="result-top" variant="top" className="mb-8" />
        <div className="glass-card p-10 rounded-3xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
             <span className="text-4xl">🏆</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Quiz Completed!</h1>
          <p className="text-slate-500 mb-8">Great job on finishing the cricket trivia challenge.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="block text-2xl font-black text-primary">{score} / {questions.length}</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Score</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="block text-2xl font-black text-secondary">+{coinsEarned}</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Coins Won</span>
            </div>
          </div>

          <div className="mb-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
            <span className="text-sm font-bold text-amber-800 tracking-tight">WALLET BALANCE</span>
            <div className="flex items-center space-x-2">
               <span className="text-xl font-black text-amber-600">{totalCoins}</span>
               <span>🪙</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-tighter">
              <span>Success Rate</span>
              <span>{successRate}%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${successRate}%` }}></div>
            </div>
          </div>

          <button 
            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
        <AdSlot format="banner" slotId="result-bottom" className="mt-8" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-12">
        <Link href="/" className="flex items-center space-x-2 group hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-black text-xs italic">C.Q</span>
          </div>
          <span className="text-lg font-black text-slate-800 tracking-tight">CRICKET<span className="text-primary tracking-widest">QUIZ</span></span>
        </Link>
        
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 hover:border-primary transition-all group">
          <span className="text-amber-500 mr-2 text-lg group-hover:scale-110 transition-transform">🪙</span>
          <span className="text-sm font-bold text-slate-700">{totalCoins + coinsEarned}</span>
          <Link href="/wallet" className="ml-2 bg-slate-100 text-[10px] px-1.5 py-0.5 rounded text-slate-400 font-bold group-hover:bg-primary/10 group-hover:text-primary transition-colors uppercase">WALLET</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        <AdSlot format="banner" slotId="quiz-top" variant="top" />
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
        
        <QuizCard 
          question={currentQuestion.question}
          options={currentQuestion.options}
          onSelect={setSelected}
          selectedOption={selected}
          correctAnswer={currentQuestion.correct_answer}
          showFeedback={showFeedback}
        />

        <AdSlot format="banner" slotId="quiz-center" variant="center" />

        <div className="flex justify-center">
          <button 
            onClick={onNext}
            disabled={!selected}
            className={`
              px-12 py-4 rounded-2xl font-bold text-lg transition-all
              ${selected 
                ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-[0.95]' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            {showFeedback ? 'Next Question' : 'Check Answer'}
          </button>
        </div>

        <AdSlot format="banner" slotId="quiz-bottom" className="mt-12" />
      </div>
    </main>

  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold">Initializing quiz...</p>
        </div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}
