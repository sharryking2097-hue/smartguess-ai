"use client";
import { useState } from "react";
import Link from "next/link";

const BOARDS = [
  "Lahore Board (BISE Lahore)",
  "Karachi Board (BISE Karachi)",
  "Federal Board (FBISE)",
  "Rawalpindi Board (BISE Rawalpindi)",
  "Faisalabad Board (BISE Faisalabad)",
  "Multan Board (BISE Multan)",
  "Gujranwala Board (BISE Gujranwala)",
  "Sargodha Board (BISE Sargodha)",
  "Peshawar Board (BISE Peshawar)",
  "Quetta Board (BISE Quetta)",
];

const CLASSES = [
  "Class 9",
  "Class 10",
  "Class 11 (1st Year)",
  "Class 12 (2nd Year)",
];

const SUBJECTS_BY_CLASS = {
  "Class 9": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Urdu", "Islamiat", "Pakistan Studies", "Computer Science"],
  "Class 10": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Urdu", "Islamiat", "Pakistan Studies", "Computer Science"],
  "Class 11 (1st Year)": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Urdu", "Economics", "Computer Science", "Statistics"],
  "Class 12 (2nd Year)": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Urdu", "Economics", "Computer Science", "Statistics"],
};

const PAPER_TYPES = ["Annual Exam", "Supplementary Exam", "Practice Test"];

function ProbabilityBadge({ prob }) {
  if (prob >= 90) return <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">🔥 {prob}% likely</span>;
  if (prob >= 75) return <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">⚡ {prob}% likely</span>;
  return <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">✨ {prob}% likely</span>;
}

export default function GeneratePage() {
  const [board, setBoard] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [paperType, setPaperType] = useState("Annual Exam");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    if (!board || !classLevel || !subject) {
      setError("Pehle board, class aur subject select karo!");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 5 : p));
    }, 800);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board, classLevel, subject, paperType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation fail hui. Dobara try karein.");
      }

      setProgress(100);
      setTimeout(() => setResult(data.guessPaper), 300);
    } catch (err) {
      setError(err.message || "Network error. Internet check karein.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError("");
    setBoard("");
    setClassLevel("");
    setSubject("");
    setPaperType("Annual Exam");
    setProgress(0);
  };

  const subjects = classLevel ? SUBJECTS_BY_CLASS[classLevel] : [];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-green-800 text-white no-print">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">🎯</span>
            <span className="font-black">SmartGuess AI</span>
          </Link>
          <span className="text-green-300 text-sm hidden sm:block">Pakistan ka #1 AI Guess Paper</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

        {/* FORM */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden no-print">
            <div className="bg-green-700 px-5 py-5 text-white">
              <h1 className="text-2xl font-black">🎯 Guess Paper Generator</h1>
              <p className="text-green-200 text-sm mt-1">
                Board, class aur subject select karo — AI baaki kaam karega
              </p>
            </div>

            <div className="p-5 space-y-6">
              {/* BOARD */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  📍 BISE Board Select Karo
                </label>
                <select
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 bg-white transition-colors"
                >
                  <option value="">-- Board chunein --</option>
                  {BOARDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* CLASS */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  📚 Class Select Karo
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CLASSES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setClassLevel(c);
                        setSubject("");
                      }}
                      className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${
                        classLevel === c
                          ? "bg-green-700 border-green-700 text-white shadow-md"
                          : "border-gray-200 text-gray-600 hover:border-green-400 bg-white"
                      }`}
                    >
                      {c.replace(" (1st Year)", "").replace(" (2nd Year)", "")}
                    </button>
                  ))}
                </div>
              </div>

              {/* SUBJECT */}
              {classLevel && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    📖 Subject Select Karo
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {subjects.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSubject(s)}
                        className={`p-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                          subject === s
                            ? "bg-green-700 border-green-700 text-white shadow-md"
                            : "border-gray-200 text-gray-600 hover:border-green-400 bg-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PAPER TYPE */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  📋 Paper Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {PAPER_TYPES.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPaperType(p)}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                        paperType === p
                          ? "bg-green-700 border-green-700 text-white"
                          : "border-gray-200 text-gray-600 hover:border-green-400 bg-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* GENERATE BUTTON */}
              <button
                onClick={handleGenerate}
                disabled={loading || !board || !classLevel || !subject}
                className="w-full bg-green-700 text-white font-black py-4 rounded-xl text-lg hover:bg-green-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                {loading ? "⏳ AI Analyze kar raha hai..." : "🎯 Guess Paper Generate Karo"}
              </button>

              {/* PROGRESS */}
              {loading && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-center text-xs text-gray-400">
                    AI past papers analyze kar raha hai — 20-30 seconds wait karein...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div className="space-y-4">
            {/* Result Header */}
            <div className="bg-green-700 text-white rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black">🎯 AI Guess Paper Ready!</h2>
                  <p className="text-green-200 text-sm mt-1">
                    {board} &nbsp;|&nbsp; {classLevel} &nbsp;|&nbsp; {subject} &nbsp;|&nbsp; {paperType}
                  </p>
                </div>
                <div className="flex gap-2 no-print">
                  <button
                    onClick={() => window.print()}
                    className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-50 transition-colors"
                  >
                    🖨️ Print
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-500 transition-colors"
                  >
                    ← Wapas
                  </button>
                </div>
              </div>
            </div>

            {/* SHORT QUESTIONS */}
            {result.shortQuestions && result.shortQuestions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-blue-50 border-b border-blue-100 px-5 py-3">
                  <h3 className="font-black text-blue-800 text-lg">📝 Important Short Questions</h3>
                  <p className="text-blue-500 text-xs mt-0.5">Probability score ke saath — ye zaroor tayar karo!</p>
                </div>
                <div className="p-4 space-y-2">
                  {result.shortQuestions.map((q, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <span className="text-blue-700 font-black text-sm w-6 flex-shrink-0 mt-0.5">{i + 1}.</span>
                      <div className="flex-1">
                        <p className="text-gray-800 text-sm leading-relaxed">{q.question}</p>
                        {q.probability && <ProbabilityBadge prob={q.probability} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LONG QUESTIONS */}
            {result.longQuestions && result.longQuestions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-purple-50 border-b border-purple-100 px-5 py-3">
                  <h3 className="font-black text-purple-800 text-lg">📖 Important Long Questions</h3>
                  <p className="text-purple-500 text-xs mt-0.5">In pe zyada time do — zyada marks milte hain</p>
                </div>
                <div className="p-4 space-y-3">
                  {result.longQuestions.map((q, i) => (
                    <div key={i} className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="flex gap-2">
                        <span className="text-purple-700 font-black text-sm flex-shrink-0 mt-0.5">Q{i + 1}.</span>
                        <div className="flex-1">
                          <p className="text-gray-800 text-sm leading-relaxed font-semibold">{q.question}</p>
                          {q.hint && (
                            <p className="text-purple-600 text-xs mt-1">
                              💡 <span className="font-semibold">Hint:</span> {q.hint}
                            </p>
                          )}
                          {q.probability && <ProbabilityBadge prob={q.probability} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MCQs */}
            {result.mcqs && result.mcqs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-3">
                  <h3 className="font-black text-emerald-800 text-lg">✅ Important MCQs</h3>
                  <p className="text-emerald-500 text-xs mt-0.5">Ye MCQs aksar repeat hote hain</p>
                </div>
                <div className="p-4 space-y-3">
                  {result.mcqs.map((mcq, i) => (
                    <div key={i} className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="text-gray-800 text-sm font-semibold mb-2">
                        {i + 1}. {mcq.question}
                      </p>
                      {mcq.options && (
                        <div className="grid grid-cols-2 gap-1.5 mb-1">
                          {mcq.options.map((opt, j) => (
                            <span
                              key={j}
                              className={`text-xs px-2 py-1.5 rounded-lg font-medium ${
                                mcq.answer && opt.startsWith(mcq.answer)
                                  ? "bg-green-200 text-green-800 font-bold"
                                  : "bg-white text-gray-600 border border-gray-200"
                              }`}
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      )}
                      {mcq.answer && (
                        <p className="text-green-700 text-xs font-bold">✓ Answer: {mcq.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEFINITIONS */}
            {result.definitions && result.definitions.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-orange-50 border-b border-orange-100 px-5 py-3">
                  <h3 className="font-black text-orange-800 text-lg">📚 Key Definitions</h3>
                  <p className="text-orange-500 text-xs mt-0.5">Ye definitions zaroor yaad karo</p>
                </div>
                <div className="p-4 space-y-3">
                  {result.definitions.map((def, i) => (
                    <div key={i} className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                      <p className="text-orange-800 font-bold text-sm">{def.term}</p>
                      <p className="text-gray-700 text-sm mt-1 leading-relaxed">{def.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STUDY TIPS */}
            {result.studyTips && result.studyTips.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-yellow-50 border-b border-yellow-100 px-5 py-3">
                  <h3 className="font-black text-yellow-800 text-lg">💡 Expert Study Tips</h3>
                </div>
                <div className="p-4 space-y-2">
                  {result.studyTips.map((tip, i) => (
                    <div key={i} className="flex gap-2 items-start p-2">
                      <span className="text-yellow-500 text-lg flex-shrink-0">⭐</span>
                      <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GENERATE ANOTHER */}
            <button
              onClick={resetForm}
              className="w-full bg-green-700 text-white font-bold py-3.5 rounded-xl hover:bg-green-800 transition-colors no-print"
            >
              🔄 Naya Guess Paper Generate Karo
            </button>

            <p className="text-center text-xs text-gray-400 pb-4 no-print">
              Ye AI-generated predictions hain — official guess papers nahi.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
