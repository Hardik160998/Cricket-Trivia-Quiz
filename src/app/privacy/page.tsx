export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 prose prose-slate">
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
      <p className="text-slate-600 mb-6">Last updated: March 25, 2026</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
        <p>We collect minimal information to provide a better experience. This includes your quiz scores, coins earned, and basic device information through cookies.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">2. Google AdSense & Cookies</h2>
        <p>This website uses Google AdSense to serve advertisements. Google uses cookies to serve ads based on a user&apos;s prior visits to this website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.</p>
        <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary hover:underline">Ads Settings</a>.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">3. Data Usage</h2>
        <p>Your data (scores and coins) is used solely for the purpose of maintaining leaderboards and providing a gamified experience. We do not sell your personal information to third parties.</p>
      </section>

      <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500">
        This is a template privacy policy. For legal compliance, please ensure it meets the specific laws of your jurisdiction (e.g., GDPR, CCPA).
      </div>
    </main>
  );
}
