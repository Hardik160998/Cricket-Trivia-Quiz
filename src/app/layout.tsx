import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cricket Trivia Quiz | Play and Win Coins",
  description: "Test your cricket knowledge with our daily quizzes. IPL, World Cup, and Player Stats trivia. Collect coins and climb the leaderboard!",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import AdProvider from "@/components/AdProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossOrigin="anonymous"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.googletag = window.googletag || {cmd: []};
            googletag.cmd.push(function() {
              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            });
          `
        }} />
      </head>
      <body className={`${inter.className} bg-slate-200 flex justify-center min-h-screen`}>
        <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-x-hidden flex flex-col">
          <AdProvider>
            <div className="flex-1">
              {children}
            </div>
          </AdProvider>
        </div>
      </body>
    </html>
  );
}
