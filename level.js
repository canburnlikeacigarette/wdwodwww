const OYEN_LEVELS = [
  {
    id: 1,
    title: "Level 1: Perkenalan Diri",
    description: "Belajar menyapa dan memperkenalkan diri dalam Bahasa Inggris.",
    icon: "👋",
    questions: [
      {
        type: "choice",
        question: "Bagaimana cara mengatakan 'Senang bertemu denganmu' dalam Bahasa Inggris?",
        options: [
          "Nice to meet you",
          "See you later",
          "How are you",
          "Good morning"
        ],
        answer: 0,
        explanation: "'Nice to meet you' berarti 'Senang bertemu denganmu'."
      },
      {
        type: "translate",
        question: "Terjemahkan kalimat ini:",
        english: "My name is Oyen and I am a cat",
        indonesian: "Nama saya adalah Oyen dan saya seekor kucing",
        words: ["kucing", "Nama", "seekor", "Oyen", "saya", "adalah", "dan", "anjing", "makan"],
        // The correct order of words for the Indonesian translation
        correctWords: ["Nama", "saya", "adalah", "Oyen", "dan", "saya", "seekor", "kucing"]
      },
      {
        type: "choice",
        question: "Pilih terjemahan yang benar untuk: 'I am from Indonesia.'",
        options: [
          "Saya ingin pergi ke Indonesia.",
          "Saya berasal dari Indonesia.",
          "Saya tinggal di Indonesia.",
          "Saya cinta Indonesia."
        ],
        answer: 1,
        explanation: "'I am from...' berarti 'Saya berasal dari...'."
      },
      {
        type: "match",
        question: "Cocokkan pasangan kata berikut:",
        pairs: [
          { en: "Cat", id: "Kucing" },
          { en: "Morning", id: "Pagi" },
          { en: "Friend", id: "Teman" },
          { en: "Name", id: "Nama" }
        ]
      },
      {
        type: "choice",
        question: "Lengkapi kalimat: 'Hello, ___ is your name?'",
        options: [
          "where",
          "who",
          "what",
          "how"
        ],
        answer: 2,
        explanation: "'What is your name?' adalah pertanyaan standar untuk menanyakan nama seseorang."
      }
    ]
  },
  {
    id: 2,
    title: "Level 2: Di Restoran",
    description: "Belajar memesan makanan dan berinteraksi di kafe atau restoran.",
    icon: "☕",
    questions: [
      {
        type: "choice",
        question: "Bagaimana cara sopan memesan kopi dalam Bahasa Inggris?",
        options: [
          "Give me coffee now",
          "I want coffee!",
          "I would like a cup of coffee, please",
          "Coffee is good"
        ],
        answer: 2,
        explanation: "'I would like..., please' adalah cara paling sopan untuk memesan sesuatu."
      },
      {
        type: "translate",
        question: "Terjemahkan kalimat ini:",
        english: "The soup is very hot",
        indonesian: "Sup itu sangat panas",
        words: ["panas", "dingin", "Sup", "enak", "itu", "sangat", "asin"],
        correctWords: ["Sup", "itu", "sangat", "panas"]
      },
      {
        type: "match",
        question: "Cocokkan pasangan kata berikut:",
        pairs: [
          { en: "Water", id: "Air" },
          { en: "Delicious", id: "Lezat" },
          { en: "Bill", id: "Tagihan" },
          { en: "Chicken", id: "Ayam" }
        ]
      },
      {
        type: "choice",
        question: "Apa arti dari kata 'Breakfast'?",
        options: [
          "Makan malam",
          "Makan siang",
          "Sarapan",
          "Camilan"
        ],
        answer: 2,
        explanation: "'Breakfast' secara harfiah berarti sarapan pagi."
      },
      {
        type: "choice",
        question: "Lengkapi kalimat: 'How ___ is this coffee?' - 'It is five dollars.'",
        options: [
          "many",
          "much",
          "expensive",
          "cost"
        ],
        answer: 1,
        explanation: "'How much is...' digunakan untuk menanyakan harga barang non-hitung seperti uang."
      }
    ]
  },
  {
    id: 3,
    title: "Level 3: Perjalanan & Liburan",
    description: "Kosakata tentang arah, transportasi, dan liburan.",
    icon: "✈️",
    questions: [
      {
        type: "choice",
        question: "Jika kamu tersesat dan ingin bertanya jalan ke stasiun kereta, apa yang kamu katakan?",
        options: [
          "Where is the train station?",
          "Go to the train station!",
          "Train station is big.",
          "I like train station."
        ],
        answer: 0,
        explanation: "'Where is the...?' adalah pertanyaan umum untuk menanyakan lokasi."
      },
      {
        type: "translate",
        question: "Terjemahkan kalimat ini:",
        english: "I buy a ticket to Bali",
        indonesian: "Saya membeli tiket ke Bali",
        words: ["membeli", "tiket", "Saya", "pesawat", "ke", "Bali", "pergi"],
        correctWords: ["Saya", "membeli", "tiket", "ke", "Bali"]
      },
      {
        type: "match",
        question: "Cocokkan pasangan kata berikut:",
        pairs: [
          { en: "Beach", id: "Pantai" },
          { en: "Hotel", id: "Penginapan" },
          { en: "Map", id: "Peta" },
          { en: "Flight", id: "Penerbangan" }
        ]
      },
      {
        type: "choice",
        question: "Apa arti rambu jalan 'Turn Left'?",
        options: [
          "Belok Kanan",
          "Jalan Lurus",
          "Belok Kiri",
          "Putar Balik"
        ],
        answer: 2,
        explanation: "'Left' artinya Kiri, sehingga 'Turn Left' adalah Belok Kiri."
      },
      {
        type: "choice",
        question: "Lengkapi kalimat: 'I want to visit the beach because it is ___.'",
        options: [
          "dirty",
          "beautiful",
          "sad",
          "angry"
        ],
        answer: 1,
        explanation: "'Beautiful' (indah) adalah kata sifat yang cocok untuk mendeskripsikan pantai yang disukai."
      }
    ]
  },
  {
    id: 4,
    title: "Level 4: Dunia Kerja",
    description: "Kosakata profesional, rapat, dan email dalam Bahasa Inggris.",
    icon: "💼",
    questions: [
      {
        type: "choice",
        question: "Dalam email bisnis, salam pembuka mana yang paling formal?",
        options: [
          "Hey what's up",
          "Dear Mr. Smith",
          "Hi buddy",
          "Hello there"
        ],
        answer: 1,
        explanation: "'Dear Mr./Ms. [Nama Belakang]' adalah salam pembuka email paling formal dan sopan."
      },
      {
        type: "translate",
        question: "Terjemahkan kalimat ini:",
        english: "We need to schedule a meeting",
        indonesian: "Kita perlu menjadwalkan rapat",
        words: ["Kita", "perlu", "menjadwalkan", "rapat", "kerja", "kantor", "telepon"],
        correctWords: ["Kita", "perlu", "menjadwalkan", "rapat"]
      },
      {
        type: "match",
        question: "Cocokkan pasangan kata berikut:",
        pairs: [
          { en: "Company", id: "Perusahaan" },
          { en: "Interview", id: "Wawancara" },
          { en: "Salary", id: "Gaji" },
          { en: "Project", id: "Proyek" }
        ]
      },
      {
        type: "choice",
        question: "Apa makna dari kata 'Deadline'?",
        options: [
          "Garis kematian",
          "Batas waktu pengumpulan",
          "Waktu istirahat",
          "Jam masuk kantor"
        ],
        answer: 1,
        explanation: "'Deadline' adalah batas waktu akhir untuk menyelesaikan suatu pekerjaan atau tugas."
      },
      {
        type: "choice",
        question: "Lengkapi kalimat: 'She got a ___ because of her hard work.'",
        options: [
          "promotion",
          "problem",
          "penalty",
          "break"
        ],
        answer: 0,
        explanation: "'Promotion' (promosi jabatan) adalah hasil positif dari bekerja keras."
      }
    ]
  },
  {
    id: 5,
    title: "Level 5: Percakapan Gaul (Idiom)",
    description: "Ekspresi sehari-hari yang sering digunakan oleh penutur asli.",
    icon: "😎",
    questions: [
      {
        type: "choice",
        question: "Apa arti dari idiom populer: 'Piece of cake'?",
        options: [
          "Sepotong kue yang manis",
          "Sangat mudah sekali",
          "Makanan penutup setelah makan",
          "Memotong kue ulang tahun"
        ],
        answer: 1,
        explanation: "'Piece of cake' adalah idiom yang digunakan untuk menggambarkan sesuatu yang sangat mudah dikerjakan."
      },
      {
        type: "translate",
        question: "Terjemahkan kalimat idiom ini:",
        english: "Break a leg in your performance",
        indonesian: "Semoga sukses dalam penampilanmu",
        words: ["Kaki", "patah", "Semoga", "sukses", "dalam", "penampilanmu", "beruntung"],
        correctWords: ["Semoga", "sukses", "dalam", "penampilanmu"]
      },
      {
        type: "match",
        question: "Cocokkan pasangan kata berikut:",
        pairs: [
          { en: "Under the weather", id: "Kurang sehat" },
          { en: "Hit the sack", id: "Pergi tidur" },
          { en: "Spill the beans", id: "Bocorkan rahasia" },
          { en: "Once in a blue moon", id: "Sangat jarang" }
        ]
      },
      {
        type: "choice",
        question: "Apa arti ungkapan 'Bite the bullet'?",
        options: [
          "Menggigit peluru pistol",
          "Menghadapi situasi sulit dengan berani",
          "Melakukan tindakan kriminal",
          "Menyerah tanpa syarat"
        ],
        answer: 1,
        explanation: "'Bite the bullet' berarti memaksa diri untuk menghadapi situasi yang tidak menyenangkan atau sulit dengan ketabahan."
      },
      {
        type: "choice",
        question: "Lengkapi idiom: 'I am feeling under the ___ today, so I will stay home.'",
        options: [
          "sky",
          "table",
          "weather",
          "roof"
        ],
        answer: 2,
        explanation: "'Under the weather' adalah idiom untuk menyatakan bahwa seseorang sedang tidak enak badan / kurang sehat."
      }
    ]
  }
];

class OyenProgress {
  constructor() {
    this.storageKey = 'oyenlingo_progress';
    this.defaultProgress = {
      xp: 0,
      currentLevel: 1,
      completedLevels: [], // Array of level IDs
      hearts: 5,
      lastHeartRestore: Date.now(),
      streak: 0,
      lastActiveDate: null,
      leaderboard: [
        { name: "Oyen (Kamu)", xp: 0, isPlayer: true },
        { name: "Beni si Belang", xp: 120, isPlayer: false },
        { name: "Ciko si Calico", xp: 90, isPlayer: false },
        { name: "Moni si Hitam", xp: 45, isPlayer: false },
        { name: "Luna Anggora", xp: 20, isPlayer: false }
      ]
    };
    this.progress = this.load();
    this.restoreHearts();
  }

  load() {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return { ...this.defaultProgress };
    try {
      const parsed = JSON.parse(data);
      // Ensure leaderboard exists
      if (!parsed.leaderboard) {
        parsed.leaderboard = [...this.defaultProgress.leaderboard];
      }
      return parsed;
    } catch (e) {
      return { ...this.defaultProgress };
    }
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
  }

  addXP(amount) {
    this.progress.xp += amount;
    // Update player XP on the leaderboard
    const player = this.progress.leaderboard.find(entry => entry.isPlayer);
    if (player) {
      player.xp = this.progress.xp;
    }
    // Re-sort leaderboard
    this.progress.leaderboard.sort((a, b) => b.xp - a.xp);
    this.updateStreak();
    this.save();
  }

  completeLevel(levelId) {
    if (!this.progress.completedLevels.includes(levelId)) {
      this.progress.completedLevels.push(levelId);
      // Unlock next level
      const nextLevel = levelId + 1;
      if (nextLevel > this.progress.currentLevel && OYEN_LEVELS.some(l => l.id === nextLevel)) {
        this.progress.currentLevel = nextLevel;
      }
      this.save();
    }
  }

  useHeart() {
    if (this.progress.hearts > 0) {
      this.progress.hearts--;
      if (this.progress.hearts === 4) {
        this.progress.lastHeartRestore = Date.now();
      }
      this.save();
    }
    return this.progress.hearts;
  }

  restoreHearts() {
    const now = Date.now();
    const restoreCooldown = 60 * 1000 * 5; // 5 minutes per heart
    if (this.progress.hearts < 5) {
      const elapsed = now - this.progress.lastHeartRestore;
      const heartsToAdd = Math.floor(elapsed / restoreCooldown);
      if (heartsToAdd > 0) {
        this.progress.hearts = Math.min(5, this.progress.hearts + heartsToAdd);
        this.progress.lastHeartRestore = now - (elapsed % restoreCooldown);
        this.save();
      }
    }
  }

  refillHeartsFull() {
    this.progress.hearts = 5;
    this.progress.lastHeartRestore = Date.now();
    this.save();
  }

  updateStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (this.progress.lastActiveDate === yesterday) {
      this.progress.streak += 1;
      this.progress.lastActiveDate = today;
    } else if (this.progress.lastActiveDate !== today) {
      this.progress.streak = 1;
      this.progress.lastActiveDate = today;
    }
    this.save();
  }

  reset() {
    this.progress = {
      ...this.defaultProgress,
      leaderboard: [
        { name: "Oyen (Kamu)", xp: 0, isPlayer: true },
        { name: "Beni si Belang", xp: 120, isPlayer: false },
        { name: "Ciko si Calico", xp: 90, isPlayer: false },
        { name: "Moni si Hitam", xp: 45, isPlayer: false },
        { name: "Luna Anggora", xp: 20, isPlayer: false }
      ]
    };
    this.save();
  }
}

// Export levels and progress class globally
window.OYEN_LEVELS = OYEN_LEVELS;
window.OyenProgress = OyenProgress;
window.oyenProgress = new OyenProgress();
