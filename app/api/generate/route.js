export async function POST(request) {
  try {
    const { board, classLevel, subject, paperType } = await request.json();

    if (!board || !classLevel || !subject) {
      return Response.json(
        { error: "Board, class aur subject zaroori hain." },
        { status: 400 }
      );
    }

    const prompt = `You are an expert Pakistani BISE board exam analyst with 20+ years of experience. 
Analyze past 5 years of ${board} papers for ${classLevel} ${subject} and generate a comprehensive guess paper.

Return ONLY a valid JSON object — no explanation, no markdown, no extra text. Just the raw JSON.

{
  "shortQuestions": [
    { "question": "question text", "probability": 88 },
    ... exactly 15 short questions
  ],
  "longQuestions": [
    { "question": "question text", "hint": "what key points to include", "probability": 82 },
    ... exactly 8 long questions
  ],
  "mcqs": [
    { "question": "MCQ question text", "options": ["A. option", "B. option", "C. option", "D. option"], "answer": "A" },
    ... exactly 15 MCQs
  ],
  "definitions": [
    { "term": "Term Name", "definition": "Complete definition as per Pakistani syllabus" },
    ... exactly 8 definitions
  ],
  "studyTips": [
    "tip 1",
    "tip 2",
    ... exactly 5 tips specific to ${subject} for ${board}
  ]
}

Rules:
- Board: ${board}, Class: ${classLevel}, Subject: ${subject}, Type: ${paperType}
- All questions must match the actual ${board} ${classLevel} ${subject} syllabus
- Probability must be realistic between 60 and 95
- Questions for Urdu subject should be in Urdu script
- All other subjects in English
- Return ONLY the JSON object, nothing else`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const status = response.status;

      if (status === 401) {
        return Response.json(
          { error: "API key galat hai. Vercel environment variable check karein." },
          { status: 401 }
        );
      }
      if (status === 429) {
        return Response.json(
          { error: "Bohot zyada requests! Thodi der baad try karein." },
          { status: 429 }
        );
      }

      throw new Error(errData?.error?.message || `API error: ${status}`);
    }

    const data = await response.json();
    const rawText = data.content[0].text.trim();

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI ka jawab parse nahi hua. Dobara try karein.");
    }

    const guessPaper = JSON.parse(jsonMatch[0]);

    return Response.json({ guessPaper });

  } catch (error) {
    console.error("SmartGuess API Error:", error.message);

    return Response.json(
      { error: error.message || "Kuch masla hua. Dobara try karein." },
      { status: 500 }
    );
  }
}
