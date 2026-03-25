'use client';

import { useState, useCallback } from 'react';

interface QuizState {
  currentQuestionIndex: number;
  score: number;
  coinsEarned: number;
  isFinished: boolean;
  answers: boolean[];
  startTime: number;
}

export const useQuiz = (totalQuestions: number) => {
  const [state, setState] = useState<QuizState>(() => ({
    currentQuestionIndex: 0,
    score: 0,
    coinsEarned: 0,
    isFinished: false,
    answers: [],
    startTime: Date.now(),
  }));

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setState(prev => {
      const now = Date.now();
      const timeTaken = (now - prev.startTime) / 1000;
      
      let sessionCoins = 2; // Participation coins
      if (isCorrect) {
        sessionCoins += 10; // Base win
        if (timeTaken < 10) {
          sessionCoins += 5; // Speed bonus
        }
      }

      const nextIndex = prev.currentQuestionIndex + 1;
      const finished = nextIndex >= totalQuestions;
      
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        score: isCorrect ? prev.score + 1 : prev.score,
        coinsEarned: prev.coinsEarned + sessionCoins,
        isFinished: finished,
        answers: [...prev.answers, isCorrect],
        startTime: finished ? 0 : Date.now(),
      };
    });
  }, [totalQuestions]);

  const successRate = totalQuestions > 0 
    ? Math.round((state.score / totalQuestions) * 100) 
    : 0;

  return {
    ...state,
    handleAnswer,
    successRate,
  };
};
