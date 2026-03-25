'use client';

const WALLET_KEY = 'cricket_quiz_wallet_balance';

export const getWalletBalance = (): number => {
  if (typeof window === 'undefined') return 0; // Server-side default
  const saved = localStorage.getItem(WALLET_KEY);
  return saved ? parseInt(saved, 10) : 0;
};

export const updateWalletBalance = (amount: number) => {
  if (typeof window === 'undefined') return;
  const current = getWalletBalance();
  const next = current + amount;
  localStorage.setItem(WALLET_KEY, next.toString());
  return next;
};
