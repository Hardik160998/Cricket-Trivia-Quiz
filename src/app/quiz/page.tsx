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

  const { currentQuestionIndex, score, coinsEarned, isFinished, handleAnswer, successRate } = useQuiz(questions.length);

  useEffect(() => { setTotalCoins(getWalletBalance()); }, []);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const { data: catData, error: catError } = await supabase.from('categories').select('id').eq('slug', categorySlug).single();
        if (catError) throw catError;
        if (catData) {
          const { data: qData, error: qError } = await supabase.from('questions').select('question, options, correct_answer').eq('category_id', catData.id).limit(10);
          if (qError) throw qError;
          if (qData) setQuestions(qData);
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [categorySlug, supabase]);

  useEffect(() => {
    if (isFinished && !hasSavedFinal) {
      updateWalletBalance(coinsEarned);
      setHasSavedFinal(true);
      setTotalCoins(getWalletBalance());
    }
  }, [isFinished, coinsEarned, hasSavedFinal]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-400 text-sm font-bold">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <span className="text-4xl mb-4">🏏</span>
        <h1 className="text-lg font-bold text-slate-800 mb-2">No questions found</h1>
        <p className="text-slate-400 text-sm mb-6">We couldn&apos;t find questions for this category.</p>
        <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm">Back to Home</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    if (showFeedback || !currentQuestion) return;
    setSelected(option);
    setShowFeedback(true);
    setTimeout(() => {
      handleAnswer(option === currentQuestion.correct_answer);
      setSelected(undefined);
      setShowFeedback(false);
    }, 2000);
  };

  // Results Screen
  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col p-4">
        {/* Compact ad at top */}
        <div className="flex justify-center mb-4">
          <AdSlot format="banner" slotId="result-top" variant="top" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-xl p-6 w-full animate-in fade-in zoom-in duration-500">
            <div className="flex flex-col items-center mb-5">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-3">
                <span className="text-3xl">🏆</span>
              </div>
              <h1 className="text-xl font-extrabold text-slate-800">Quiz Completed!</h1>
              <p className="text-slate-400 text-sm mt-1">Great job on the cricket challenge.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                <span className="block text-xl font-black text-primary">{score} / {questions.length}</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Score</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                <span className="block text-xl font-black text-amber-500">+{coinsEarned}</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Coins Won</span>
              </div>
            </div>

            <div className="mb-4 p-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-tight">Wallet Balance</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-amber-600">{totalCoins}</span>
                <span>🪙</span>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5 uppercase">
                <span>Success Rate</span>
                <span>{successRate}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${successRate}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]" onClick={() => window.location.reload()}>
                Play Again
              </button>
              <Link href="/" className="py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm text-center active:scale-[0.98] transition-all flex items-center justify-center">
                Home
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <AdSlot format="banner" slotId="result-bottom" />
        </div>
      </div>
    );
  }

  // Active Quiz Screen
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
        <Link href="/wallet" className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100 hover:border-primary transition-all">
          <span className="text-amber-500">🪙</span>
          <span className="text-sm font-bold text-slate-700">{totalCoins + coinsEarned}</span>
          <span className="bg-slate-100 text-[10px] px-1.5 py-0.5 rounded text-slate-400 font-bold uppercase">WALLET</span>
        </Link>
      </header>

      <div className="px-4 py-4 space-y-4">
        <AdSlot format="banner" slotId="quiz-top" variant="top" />
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
        <QuizCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onSelect={handleOptionSelect}
          selectedOption={selected}
          correctAnswer={currentQuestion.correct_answer}
          showFeedback={showFeedback}
        />
        <AdSlot format="banner" slotId="quiz-center" variant="center" />
        <AdSlot format="banner" slotId="quiz-bottom" />
      </div>
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-400 text-sm font-bold">Initializing quiz...</p>
        </div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}
