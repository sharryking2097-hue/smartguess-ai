"use client";
import Link from "next/link";

const FEATURES = [
  {
    icon: "🧠",
    title: "AI Prediction Engine",
    desc: "Past 5 saal ke board papers analyze karke AI sabse important questions predict karta hai probability score ke saath",
  },
  {
    icon: "⚡",
    title: "30 Second Result",
    desc: "Short questions, long questions, MCQs, definitions aur study tips — sab kuch ek saath, bilkul foran",
  },
  {
    icon: "🎯",
    title: "Every Board Supported",
    desc: "Lahore, Karachi, Federal, Rawalpindi, Faisalabad — Pakistan ke har BISE board ka alag pattern",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    desc: "Phone pe perfectly kaam karta hai — koi app download karne ki zaroorat nahi, seedha browser mein",
  },
  {
    icon: "🖨️",
    title: "Print Ready",
    desc: "Guess paper generate karo aur seedha print karo — friends ke saath share karna bhi asaan",
  },
  {
    icon: "🆓",
    title: "Bilkul Free",
    desc: "Koi registration nahi, koi payment nahi — Pakistani students ke liye 100% muft",
  },
];

const STATS = [
  { value: "10+", label: "BISE Boards" },
  { value: "9", label: "Subjects" },
  { value: "4", label: "Classes" },
  { value: "Free", label: "Hamesha" },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Select Karo", desc: "Apna board, class aur subject choose karo" },
  { step: "2", title: "Generate Karo", desc: "AI 30 seconds mein past papers analyze karta hai" },
  { step: "3", title: "Padho & Paas Ho!", desc: "Probability scores ke saath important questions tayar karo" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="bg-green-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="text-lg font-black tracking-tight">SmartGuess AI</span>
          </div>
          <Link
            href="/generate"
            className="bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors"
          >
            Generate Now →
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center space-y-6">
          <div className="inline-block bg-green-600 bg-opacity-60 border border-green-500 px-4 py-1.5 rounded-full text-sm font-semibold">
            🇵🇰 Pakistan ka #1 AI Guess Paper Generator
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            Exam mein{" "}
            <span className="text-yellow-300 underline decoration-wavy decoration-yellow-400">
              95%+
            </span>{" "}
            Marks<br />AI se lao!
          </h1>

          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            BISE Board ka past 5 saal analyze karke, AI aapke liye{" "}
            <strong>sabse important questions predict</strong> karta hai — probability scores ke saath
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/generate"
              className="bg-yellow-400 text-green-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              🎯 Free Guess Paper Banao
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-2 text-sm text-green-200">
            <span>✓ Koi Registration Nahi</span>
            <span>✓ Koi Payment Nahi</span>
            <span>✓ Instant Result</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-green-50 border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-green-100">
                <div className="text-3xl font-black text-green-700">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-700 font-semibold text-sm uppercase tracking-wider mb-2">
              Kyun SmartGuess AI?
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Har Student ka Best Friend
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-green-200 transition-all"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-700 font-semibold text-sm uppercase tracking-wider mb-2">
              Process
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              3 Steps mein Guess Paper Ready!
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={item.step} className="relative flex flex-col items-center text-center gap-4">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-2/3 w-full h-0.5 bg-green-200 z-0" />
                )}
                <div className="relative z-10 w-14 h-14 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-black shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE PREVIEW */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900">Example Result Preview</h2>
            <p className="text-gray-500 mt-2">Generate karne ke baad kuch aisa dikhega</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-green-700 text-white p-4">
              <p className="font-black text-lg">🎯 AI Guess Paper — Sample</p>
              <p className="text-green-200 text-xs mt-0.5">Lahore Board | Class 10 | Physics | Annual</p>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Important Short Questions</p>
              {[
                { q: "Define Newton's Second Law of Motion", prob: 92 },
                { q: "What is the difference between speed and velocity?", prob: 87 },
                { q: "State Archimedes' Principle", prob: 78 },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <span className="text-blue-700 font-black text-sm w-5">{i + 1}.</span>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm">{item.q}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        item.prob >= 90
                          ? "bg-red-100 text-red-700"
                          : item.prob >= 80
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      🔥 {item.prob}% likely
                    </span>
                  </div>
                </div>
              ))}
              <p className="text-center text-xs text-gray-400 pt-1">... aur 12 aur questions + Long Questions + MCQs + Tips</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-800 text-white text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl md:text-4xl font-black">Abhi Free Guess Paper Banao!</h2>
          <p className="text-green-200 text-lg">
            Koi registration nahi. Koi payment nahi. Bilkul muft.
          </p>
          <Link
            href="/generate"
            className="inline-block bg-yellow-400 text-green-900 px-10 py-4 rounded-xl font-black text-xl hover:bg-yellow-300 transition-all shadow-lg hover:-translate-y-0.5"
          >
            🎯 Generate Karo — Free
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 px-4 text-sm">
        <p>© 2025 SmartGuess AI — Made with ❤️ for Pakistani Students</p>
        <p className="mt-1 text-xs text-gray-600">
          Disclaimer: Ye AI-generated predictions hain — official guess papers nahi.
        </p>
      </footer>
    </main>
  );
}
