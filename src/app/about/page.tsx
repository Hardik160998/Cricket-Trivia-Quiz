import Link from 'next/link';

export default function AboutUs() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
        <span className="text-4xl text-primary">🏏</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">About Cricket Quiz</h1>
      <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
        We are passionate cricket fans on a mission to create the world&apos;s most engaging and rewarding trivia platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
          <h3 className="text-3xl font-black text-primary mb-2">100%</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-4">Original Content</p>
          <p className="text-slate-600 text-sm">Every question and article is hand-crafted for accuracy and entertainment.</p>
        </div>
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
          <h3 className="text-3xl font-black text-secondary mb-2">Gamified</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-4">Experience</p>
          <p className="text-slate-600 text-sm">Win coins and climb the ranks as you prove your cricket expertise.</p>
        </div>
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
          <h3 className="text-3xl font-black text-slate-800 mb-2">Global</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-4">Community</p>
          <p className="text-slate-600 text-sm">Join thousands of fans from India, Australia, UK, and beyond.</p>
        </div>
      </div>

      <Link href="/" className="inline-flex items-center space-x-2 text-primary font-bold hover:underline group">
        <span>Back to Home</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </main>
  );
}
