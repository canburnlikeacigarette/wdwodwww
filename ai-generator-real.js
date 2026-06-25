/**
 * OyenLingo – Real AI Question Generator
 * Memanggil Claude API (claude-sonnet-4-6) untuk menghasilkan
 * 10 soal pilihan ganda yang unik setiap sesi.
 */
class OyenRealAIGenerator {
  constructor() {
    this.apiUrl = "https://api.anthropic.com/v1/messages";
    this.model  = "claude-sonnet-4-6";

    // Peta level → nama ramah untuk dimasukkan ke prompt
    this.levelNames = {
      beginner:     "Pemula (A1-A2)",
      elementary:   "Dasar (A2-B1)",
      intermediate: "Menengah (B1-B2)",
      advanced:     "Lanjut (C1-C2)"
    };
  }

  /* ------------------------------------------------------------------ */
  /*  Bangun system prompt untuk Claude                                   */
  /* ------------------------------------------------------------------ */
  buildSystemPrompt() {
    return `You are an expert English teacher creating exercises for OyenLingo, an Indonesian English-learning app.
Generate exactly 10 multiple-choice questions.
Rules:
- Use natural English.
- Include a mix of easy, medium, and challenging questions appropriate for the level.
- Each question must have 4 answer choices (A–D).
- Only one answer can be correct.
- Distractors must be realistic and plausible.
- Do not repeat words, sentences, or questions.
- Return ONLY valid JSON — no markdown, no code fences, no explanations.
Format:
{
  "questions": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": 0,
      "explanation": ""
    }
  ]
}
correctAnswer is the zero-based index of the correct option.
explanation should be a short Indonesian-language hint (1–2 sentences).`;
  }

  /* ------------------------------------------------------------------ */
  /*  Bangun user prompt                                                  */
  /* ------------------------------------------------------------------ */
  buildUserPrompt(topic, level) {
    const levelLabel = this.levelNames[level] || level;
    return `Topic: ${topic}\nLevel: ${levelLabel}\n\nGenerate 10 multiple-choice English questions now.`;
  }

  /* ------------------------------------------------------------------ */
  /*  Panggil Claude API                                                  */
  /* ------------------------------------------------------------------ */
  async fetchFromAPI(topic, level) {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 2000,
        system: this.buildSystemPrompt(),
        messages: [
          { role: "user", content: this.buildUserPrompt(topic, level) }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API Error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const rawText = data.content
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("");

    // Bersihkan fence markdown kalau ada
    const clean = rawText.replace(/```json|```/gi, "").trim();
    const parsed = JSON.parse(clean);

    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error("Format JSON tidak valid dari AI.");
    }

    // Normalisasi: pastikan setiap soal punya field 'answer' (alias lama) juga
    parsed.questions = parsed.questions.map(q => ({
      ...q,
      type: "choice",
      answer: q.correctAnswer ?? q.answer ?? 0
    }));

    return parsed;
  }

  /* ------------------------------------------------------------------ */
  /*  Entry point utama: generate + log callback                          */
  /* ------------------------------------------------------------------ */
  async generate(topic, level, logCallback, completeCallback, errorCallback) {
    const logs = [
      `[Mulai] Menghubungi Claude AI untuk topik: "${topic}"...`,
      `[1/4] Menganalisis topik dan level pembelajaran...`,
      `[2/4] AI sedang merumuskan 10 soal pilihan ganda...`,
      `[3/4] Memvalidasi struktur soal dan jawaban...`,
      `[4/4] Menyesuaikan tingkat kesulitan sesuai level ${this.levelNames[level] || level}...`
    ];

    // Kirim log satu per satu
    for (let i = 0; i < logs.length; i++) {
      logCallback(logs[i]);
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
    }

    try {
      const quiz = await this.fetchFromAPI(topic, level);
      logCallback(`[Selesai] ${quiz.questions.length} soal berhasil dibuat oleh Claude AI!`);
      await new Promise(r => setTimeout(r, 400));

      completeCallback({
        title: `Kuis AI: ${topic}`,
        questions: quiz.questions
      });
    } catch (err) {
      logCallback(`[Error] ${err.message}`);
      if (errorCallback) errorCallback(err);
    }
  }
}

window.oyenRealAIGenerator = new OyenRealAIGenerator();
