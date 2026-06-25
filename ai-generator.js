class OyenAIGenerator {
  constructor() {
    // A dictionary of topics to make the generation feel rich and targeted
    this.topicPresets = {
      makanan: {
        keywords: ["makan", "minum", "restoran", "kafe", "kopi", "pizza", "burger", "kuliner", "lapar", "haus", "food", "drink", "coffee", "restaurant"],
        vocab: [
          { en: "Delicious", id: "Lezat" },
          { en: "Hungry", id: "Lapar" },
          { en: "Thirsty", id: "Haus" },
          { en: "Menu", id: "Menu" },
          { en: "Chef", id: "Koki" },
          { en: "Order", id: "Memesan" },
          { en: "Glass of water", id: "Segelas air" },
          { en: "Receipt", id: "Struk" }
        ],
        sentences: [
          { en: "I want to eat a delicious pizza", id: "Saya ingin makan pizza yang lezat", words: ["Saya", "ingin", "makan", "pizza", "yang", "lezat", "dingin", "kucing"] },
          { en: "Could you bring me a glass of water?", id: "Bisakah Anda membawakan saya segelas air?", words: ["Bisakah", "Anda", "membawakan", "saya", "segelas", "air?", "kopi", "panas"] },
          { en: "I am hungry and need to order food", id: "Saya lapar dan perlu memesan makanan", words: ["Saya", "lapar", "dan", "perlu", "memesan", "makanan", "tidur", "minum"] }
        ],
        questions: [
          {
            type: "choice",
            question: "Apa bahasa Inggris dari 'Saya ingin memesan secangkir kopi hangat'?",
            options: [
              "I want to order a cup of hot coffee",
              "I buy a cup of cold tea",
              "I like to make a hot soup",
              "I drink a cup of coffee"
            ],
            answer: 0,
            explanation: "'I want to order' (Saya ingin memesan), 'a cup of hot coffee' (secangkir kopi hangat)."
          },
          {
            type: "choice",
            question: "Pilih kata yang tepat untuk melengkapi: 'This soup tastes so ___! The chef did a great job.'",
            options: ["salty", "delicious", "bad", "cold"],
            answer: 1,
            explanation: "'Delicious' (lezat) sangat cocok karena koki melakukan pekerjaan dengan sangat baik."
          }
        ]
      },
      liburan: {
        keywords: ["liburan", "pantai", "hotel", "wisata", "jalan", "pesawat", "stasiun", "tiket", "koper", "travel", "beach", "holiday", "trip", "airport"],
        vocab: [
          { en: "Suitcase", id: "Koper" },
          { en: "Passport", id: "Paspor" },
          { en: "Beach", id: "Pantai" },
          { en: "Flight", id: "Penerbangan" },
          { en: "Hotel room", id: "Kamar hotel" },
          { en: "Guide", id: "Pemandu" },
          { en: "Destination", id: "Tujuan" },
          { en: "Ticket", id: "Tiket" }
        ],
        sentences: [
          { en: "We are walking along the white beach", id: "Kita sedang berjalan di sepanjang pantai putih", words: ["Kita", "sedang", "berjalan", "di", "sepanjang", "pantai", "putih", "gunung", "lari"] },
          { en: "Do you have your passport and ticket?", id: "Apakah kamu memiliki paspor dan tiketmu?", words: ["Apakah", "kamu", "memiliki", "paspor", "dan", "tiketmu?", "kunci", "tas"] },
          { en: "I need to check in at the hotel", id: "Saya perlu melapor masuk di hotel", words: ["Saya", "perlu", "melapor", "masuk", "di", "hotel", "keluar", "bandara"] }
        ],
        questions: [
          {
            type: "choice",
            question: "Bagaimana cara menanyakan 'Di mana bandara terdekat?' dalam Bahasa Inggris?",
            options: [
              "Where is the nearest airport?",
              "How to go to the beach?",
              "Is the airport big?",
              "When does the flight arrive?"
            ],
            answer: 0,
            explanation: "'Where is the nearest airport?' artinya 'Di mana bandara terdekat?'."
          },
          {
            type: "choice",
            question: "Lengkapi kalimat: 'Don't forget to pack your ___ in the suitcase.'",
            options: ["clothes", "car", "house", "airport"],
            answer: 0,
            explanation: "'Clothes' (pakaian) adalah benda yang dimasukkan ke koper ('suitcase')."
          }
        ]
      },
      kerja: {
        keywords: ["kerja", "kantor", "bisnis", "rapat", "bos", "gaji", "email", "presentasi", "wawancara", "karir", "work", "office", "business", "meeting", "boss"],
        vocab: [
          { en: "Meeting", id: "Rapat" },
          { en: "Client", id: "Klien" },
          { en: "Office", id: "Kantor" },
          { en: "Project manager", id: "Manajer proyek" },
          { en: "Salary", id: "Gaji" },
          { en: "Schedule", id: "Jadwal" },
          { en: "Resume", id: "Daftar riwayat hidup" },
          { en: "Deadline", id: "Batas waktu" }
        ],
        sentences: [
          { en: "I have a job interview tomorrow morning", id: "Saya ada wawancara kerja besok pagi", words: ["Saya", "ada", "wawancara", "kerja", "besok", "pagi", "sore", "makan"] },
          { en: "We must submit the report on time", id: "Kita harus menyerahkan laporan tepat waktu", words: ["Kita", "harus", "menyerahkan", "laporan", "tepat", "waktu", "terlambat", "uang"] },
          { en: "The meeting starts at nine o'clock", id: "Rapat dimulai pada pukul sembilan", words: ["Rapat", "dimulai", "pada", "pukul", "sembilan", "kantor", "selesai"] }
        ],
        questions: [
          {
            type: "choice",
            question: "Apa arti ungkapan bisnis formal: 'Let's call it a day'?",
            options: [
              "Ayo kita mulai bekerja sekarang",
              "Mari kita akhiri pekerjaan hari ini",
              "Mari kita telepon hari ini",
              "Ayo buat jadwal rapat baru"
            ],
            answer: 1,
            explanation: "'Let's call it a day' adalah idiom formal untuk menyudahi aktivitas kerja hari itu."
          },
          {
            type: "choice",
            question: "Lengkapi kalimat: 'I sent an ___ to the client yesterday.'",
            options: ["email", "apple", "airplane", "interview"],
            answer: 0,
            explanation: "'Email' adalah surat elektronik yang dikirim kepada klien."
          }
        ]
      }
    };
  }
  // Capitalize first letter helper
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // General fallback dynamic template generator if prompt doesn't match presets
  generateFallback(topic) {
    const formattedTopic = this.capitalize(topic);
    
    // Create custom vocabulary based on the topic
    const vocab = [
      { en: `${formattedTopic} enthusiast`, id: "Pecinta " + topic },
      { en: `Learn about ${topic}`, id: `Belajar tentang ${topic}` },
      { en: `Excellent ${topic}`, id: `${formattedTopic} yang luar biasa` },
      { en: `Practice ${topic}`, id: `Mempraktikkan ${topic}` }
    ];
    // Build dynamic sentences utilizing the topic
    const sentences = [
      {
        en: `I like to learn about ${topic} every day`,
        id: `Saya suka belajar tentang ${topic} setiap hari`,
        words: ["Saya", "suka", "belajar", "tentang", topic, "setiap", "hari", "kucing", "tidur"],
        correctWords: ["Saya", "suka", "belajar", "tentang", topic, "setiap", "hari"]
      },
      {
        en: `Do you want to practice ${topic} with me?`,
        id: `Apakah kamu ingin mempraktikkan ${topic} bersama saya?`,
        words: ["Apakah", "kamu", "ingin", "mempraktikkan", topic, "bersama", "saya?", "mereka", "pergi"],
        correctWords: ["Apakah", "kamu", "ingin", "mempraktikkan", topic, "bersama", "saya?"]
      }
    ];
    const questions = [
      {
        type: "choice",
        question: `Bagaimana cara menerjemahkan: "I enjoy discussing ${topic}"?`,
        options: [
          `Saya senang berdiskusi tentang ${topic}`,
          `Saya benci berbicara tentang ${topic}`,
          `Saya tidak tahu apa itu ${topic}`,
          `Saya ingin membeli ${topic}`
        ],
        answer: 0,
        explanation: `"I enjoy" berarti "Saya senang/menikmati", "discussing" adalah "berdiskusi tentang".`
      },
      {
        type: "choice",
        question: `Pilih kata pelengkap: "She has an ___ knowledge of ${topic}."`,
        options: ["angry", "excellent", "bad", "funny"],
        answer: 1,
        explanation: `'Excellent' (luar biasa) adalah kata sifat positif yang cocok untuk melukiskan pengetahuan seseorang.`
      }
    ];
    return { vocab, sentences, questions };
  }
  // Master generator function
  generateQuiz(userPrompt) {
    const prompt = userPrompt.trim().toLowerCase();
    let theme = null;
    // Search matches inside presets keywords
    for (const key in this.topicPresets) {
      const match = this.topicPresets[key].keywords.some(kw => prompt.includes(kw));
      if (match) {
        theme = this.topicPresets[key];
        break;
      }
    }
    // Fallback if no keywords matched
    if (!theme) {
      theme = this.generateFallback(userPrompt);
    }
    // Now construct a 5-question quiz sequence using the themed content
    const quizQuestions = [];
    // Shuffle helpers
    const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
    // 1. Multiple Choice (from theme questions, index 0)
    quizQuestions.push({
      ...theme.questions[0],
      explanation: theme.questions[0].explanation || "Jawaban ini dihasilkan oleh AI berdasarkan topik pilihan Anda."
    });
    // 2. Word Matching Pair (Take 4 pairs randomly from theme vocab)
    const shuffledVocab = shuffleArray(theme.vocab);
    const selectedPairs = shuffledVocab.slice(0, 4);
    quizQuestions.push({
      type: "match",
      question: `Cocokkan pasangan kata bertema "${this.capitalize(userPrompt)}" berikut:`,
      pairs: selectedPairs
    });
    // 3. Translate Sentence (Sentence index 0)
    const sentence1 = theme.sentences[0];
    quizQuestions.push({
      type: "translate",
      question: `Terjemahkan kalimat bertema "${this.capitalize(userPrompt)}" ini:`,
      english: sentence1.en,
      indonesian: sentence1.id,
      words: shuffleArray(sentence1.words),
      // Default fallback correct order if not explicitly specified
      correctWords: sentence1.correctWords || sentence1.id.replace(/[?,.!\n]/g, "").split(" ")
    });
    // 4. Multiple Choice (from theme questions, index 1)
    quizQuestions.push({
      ...theme.questions[1],
      explanation: theme.questions[1].explanation || "Jawaban ini dihasilkan oleh AI berdasarkan topik pilihan Anda."
    });
    // 5. Translate Sentence (Sentence index 1 or fallback sentence)
    const sentence2 = theme.sentences[1] || theme.sentences[0];
    quizQuestions.push({
      type: "translate",
      question: `Terjemahkan kalimat AI terakhir ini:`,
      english: sentence2.en,
      indonesian: sentence2.id,
      words: shuffleArray(sentence2.words),
      correctWords: sentence2.correctWords || sentence2.id.replace(/[?,.!\n]/g, "").split(" ")
    });
    return {
      title: `Kuis AI: ${this.capitalize(userPrompt)}`,
      questions: quizQuestions
    };
  }
  // Simulates the AI "thinking" process with console logs and statuses
  async simulateGeneration(prompt, logCallback, completeCallback) {
    const logs = [
      `[Mulai] Memulai mesin AI OyenLingo...`,
      `[1/4] Menganalisis parameter topik: "${prompt}"...`,
      `[2/4] Melakukan ekstraksi semantik dan kamus kosakata bahasa Inggris terkait...`,
      `[3/4] Menyusun pertanyaan pilihan ganda & mencocokkan kata...`,
      `[4/4] Memformulasikan latihan terjemahan menyusun blok kata...`,
      `[Selesai] Kuis berhasil dirakit oleh AI Oyen! Siap untuk belajar.`
    ];
    for (let i = 0; i < logs.length; i++) {
      logCallback(logs[i]);
      // Wait variable times for realism
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));
    }
    const quiz = this.generateQuiz(prompt);
    completeCallback(quiz);
  }
}
// Instantiate globally
window.oyenAIGenerator = new OyenAIGenerator();
