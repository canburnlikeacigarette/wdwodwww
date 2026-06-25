// APP STATE VARIABLES
let activePage = 'learn';
let currentQuiz = null;
let currentQuestionIndex = 0;
let quizHearts = 5;
let isAnswerChecked = false;
let isCorrect = false;

// Selected options and blocks
let selectedOptionIndex = null;
let selectedTranslateBlocks = [];
let matchingState = {
  selectedEn: null,
  selectedId: null,
  completed: []
};

// Mascot references
let globalMascot = null;
let victoryMascot = null;
let aiSelectedPreset = null;

// Initialize app when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi Maskot Oyen Utama
  globalMascot = new OyenMascot('mascot-placeholder');

  // Inisialisasi Suara
  document.body.addEventListener('click', () => {
    oyenSounds.init();
  }, { once: true });

  // Render Stats & Peta Level
  updateStatsUI();
  renderLevelMap();
  renderLeaderboard();
  updateProfileUI();
});

// ROUTING SPA PAGES
function switchPage(pageId) {
  // Play subtle click sound
  oyenSounds.playClick();

  activePage = pageId;

  // Toggle active class in nav
  const navIds = ['learn', 'ai', 'leaderboard', 'profile'];
  navIds.forEach(id => {
    const el = document.getElementById(`nav-${id}`);
    if (id === pageId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Toggle visible section
  const pages = ['learn', 'ai', 'leaderboard', 'profile'];
  pages.forEach(p => {
    const el = document.getElementById(`page-${p}`);
    if (p === pageId) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });

  // Update Oyen reactions based on page
  if (pageId === 'ai') {
    globalMascot.setState('thinking');
  } else if (pageId === 'profile') {
    globalMascot.setState('celebrate');
    setTimeout(() => globalMascot.setState('idle'), 2000);
  } else {
    globalMascot.setState('idle');
  }
}

// UPDATE STATS BAR
function updateStatsUI() {
  oyenProgress.restoreHearts();
  document.getElementById('stat-streak-val').innerText = oyenProgress.progress.streak;
  document.getElementById('stat-xp-val').innerText = oyenProgress.progress.xp;
  document.getElementById('stat-hearts-val').innerText = oyenProgress.progress.hearts;
}

// REFILL HEARTS
function refillHearts() {
  oyenSounds.playVictory();
  oyenProgress.refillHeartsFull();
  updateStatsUI();
  globalMascot.setState('success');
  setTimeout(() => globalMascot.setState('idle'), 2000);
  alert("❤️ Nyawa Anda berhasil diisi penuh oleh Oyen!");
}

// RENDER LEVEL MAP PATH
function renderLevelMap() {
  const container = document.getElementById('level-map-container');
  container.innerHTML = '';

  const progress = oyenProgress.progress;

  OYEN_LEVELS.forEach((level) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'level-node-wrapper';

    // Calculate node states
    let nodeState = 'locked';
    if (progress.completedLevels.includes(level.id)) {
      nodeState = 'completed';
    } else if (level.id === progress.currentLevel) {
      nodeState = 'unlocked';
    }

    const node = document.createElement('button');
    node.className = `level-node ${nodeState}`;
    node.innerHTML = level.icon;
    node.id = `level-node-${level.id}`;
    
    if (nodeState !== 'locked') {
      node.onclick = () => startQuiz(level.id);
    } else {
      node.onclick = () => {
        oyenSounds.playWrong();
        globalMascot.setState('fail');
        setTimeout(() => globalMascot.setState('idle'), 1500);
        alert("🔒 Level ini masih terkunci. Selesaikan level sebelumnya!");
      };
    }

    // Tooltip detail level
    const tooltip = document.createElement('div');
    tooltip.className = 'level-tooltip';
    tooltip.innerHTML = `<strong>${level.title}</strong><br>${level.description}<br>${nodeState === 'completed' ? '🏆 Selesai' : (nodeState === 'unlocked' ? '⚡ Mulai Belajar' : '🔒 Terkunci')}`;

    wrapper.appendChild(node);
    wrapper.appendChild(tooltip);
    container.appendChild(wrapper);
  });
}

// START A LESSON/QUIZ SESSION
function startQuiz(levelId, customQuizData = null) {
  // Check hearts
  if (oyenProgress.progress.hearts <= 0) {
    oyenSounds.playWrong();
    globalMascot.setState('fail');
    alert("❌ Anda kehabisan nyawa! Isi ulang nyawa Anda terlebih dahulu.");
    return;
  }

  // Load level quiz or custom AI quiz
  if (customQuizData) {
    currentQuiz = customQuizData;
  } else {
    const level = OYEN_LEVELS.find(l => l.id === levelId);
    if (!level) return;
    currentQuiz = {
      id: level.id,
      title: level.title,
      questions: level.questions
    };
  }

  currentQuestionIndex = 0;
  quizHearts = oyenProgress.progress.hearts;
  isAnswerChecked = false;
  
  // Hide UI background elements
  document.getElementById('quiz-modal').style.display = 'flex';
  document.getElementById('quiz-question-card').style.display = 'flex';
  document.getElementById('quiz-victory-screen').style.display = 'none';
  document.getElementById('quiz-modal-footer').style.display = 'flex';
  document.getElementById('quiz-hearts-count').innerText = quizHearts;
  
  globalMascot.setState('idle');

  renderQuestion();
}

// RENDER SINGLE QUESTION
function renderQuestion() {
  isAnswerChecked = false;
  selectedOptionIndex = null;
  selectedTranslateBlocks = [];
  matchingState = { selectedEn: null, selectedId: null, completed: [] };

  // Reset Footer to normal
  const footer = document.getElementById('quiz-modal-footer');
  footer.className = 'quiz-footer';
  document.getElementById('quiz-feedback-box').classList.add('hidden');
  
  const actionBtn = document.getElementById('btn-quiz-action');
  actionBtn.innerText = 'Periksa Jawaban';
  actionBtn.className = 'btn-check-answer disabled';

  const q = currentQuiz.questions[currentQuestionIndex];
  
  // Update Progress Bar
  const progressPercent = (currentQuestionIndex / currentQuiz.questions.length) * 100;
  document.getElementById('quiz-progress-indicator').style.width = `${progressPercent}%`;

  // Question Text
  document.getElementById('quiz-question-text').innerText = q.question;

  const area = document.getElementById('quiz-interactive-area');
  area.innerHTML = '';

  // Render content based on type
  if (q.type === 'choice') {
    const list = document.createElement('div');
    list.className = 'mcq-options-list';
    
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'mcq-option';
      btn.innerText = opt;
      btn.onclick = () => {
        if (isAnswerChecked) return;
        oyenSounds.playClick();
        
        // Remove previous selected
        const prev = list.querySelector('.selected');
        if (prev) prev.classList.remove('selected');
        
        btn.classList.add('selected');
        selectedOptionIndex = idx;
        
        // Enable action button
        actionBtn.classList.remove('disabled');
      };
      list.appendChild(btn);
    });
    area.appendChild(list);

  } else if (q.type === 'translate') {
    const container = document.createElement('div');
    container.className = 'translation-workspace';

    const promptText = document.createElement('div');
    promptText.className = 'translation-prompt';
    promptText.innerHTML = `🗣️ <strong>English:</strong> "${q.english}"`;

    const tray = document.createElement('div');
    tray.className = 'word-tray-target';
    tray.innerHTML = '';

    const pool = document.createElement('div');
    pool.className = 'word-pool';

    q.words.forEach((word, idx) => {
      const block = document.createElement('div');
      block.className = 'word-block';
      block.innerText = word;
      block.dataset.index = idx;
      
      block.onclick = () => {
        if (isAnswerChecked) return;
        oyenSounds.playClick();
        
        // Add to tray
        block.classList.add('used');
        
        const trayBlock = document.createElement('div');
        trayBlock.className = 'word-block';
        trayBlock.innerText = word;
        trayBlock.dataset.poolIndex = idx;
        
        trayBlock.onclick = () => {
          if (isAnswerChecked) return;
          oyenSounds.playClick();
          // Remove from tray and return to pool
          trayBlock.remove();
          block.classList.remove('used');
          
          // Update selected list
          selectedTranslateBlocks = selectedTranslateBlocks.filter(b => b.poolIndex !== idx);
          if (selectedTranslateBlocks.length === 0) {
            actionBtn.classList.add('disabled');
          }
        };

        tray.appendChild(trayBlock);
        selectedTranslateBlocks.push({ word, poolIndex: idx });
        
        // Enable action
        actionBtn.classList.remove('disabled');
      };
      
      pool.appendChild(block);
    });

    container.appendChild(promptText);
    container.appendChild(tray);
    container.appendChild(pool);
    area.appendChild(container);

  } else if (q.type === 'match') {
    const grid = document.createElement('div');
    grid.className = 'matching-grid';

    const colEn = document.createElement('div');
    colEn.className = 'match-column';
    
    const colId = document.createElement('div');
    colId.className = 'match-column';

    // Separate English and Indonesian terms
    const englishWords = q.pairs.map(p => p.en).sort(() => Math.random() - 0.5);
    const indonesianWords = q.pairs.map(p => p.id).sort(() => Math.random() - 0.5);

    const checkAllMatched = () => {
      const allMatched = q.pairs.length === matchingState.completed.length;
      if (allMatched) {
        actionBtn.classList.remove('disabled');
        // Auto trigger next since matching validation is real-time
        actionBtn.click();
      }
    };

    englishWords.forEach(en => {
      const btn = document.createElement('button');
      btn.className = 'match-button';
      btn.innerText = en;
      btn.onclick = () => {
        if (isAnswerChecked) return;
        oyenSounds.playClick();
        
        // Clear previous EN selection
        const prev = colEn.querySelector('.selected');
        if (prev) prev.classList.remove('selected');

        btn.classList.add('selected');
        matchingState.selectedEn = en;

        // Process pairing
        checkMatchingPair(colEn, colId, checkAllMatched);
      };
      colEn.appendChild(btn);
    });

    indonesianWords.forEach(idText => {
      const btn = document.createElement('button');
      btn.className = 'match-button';
      btn.innerText = idText;
      btn.onclick = () => {
        if (isAnswerChecked) return;
        oyenSounds.playClick();
        
        // Clear previous ID selection
        const prev = colId.querySelector('.selected');
        if (prev) prev.classList.remove('selected');

        btn.classList.add('selected');
        matchingState.selectedId = idText;

        // Process pairing
        checkMatchingPair(colEn, colId, checkAllMatched);
      };
      colId.appendChild(btn);
    });

    grid.appendChild(colEn);
    grid.appendChild(colId);
    area.appendChild(grid);
  }
}

// CHECK MATCHING PAIR REALTIME
function checkMatchingPair(colEn, colId, callback) {
  if (!matchingState.selectedEn || !matchingState.selectedId) return;

  const q = currentQuiz.questions[currentQuestionIndex];
  
  // Find correct pair definition
  const correctPair = q.pairs.find(p => p.en === matchingState.selectedEn && p.id === matchingState.selectedId);

  const btnEn = Array.from(colEn.children).find(b => b.innerText === matchingState.selectedEn);
  const btnId = Array.from(colId.children).find(b => b.innerText === matchingState.selectedId);

  if (correctPair) {
    // Play correct ding
    oyenSounds.playCorrect();
    
    btnEn.className = 'match-button correct';
    btnId.className = 'match-button correct';
    
    matchingState.completed.push(matchingState.selectedEn);
    matchingState.selectedEn = null;
    matchingState.selectedId = null;
    
    // Check if finished
    callback();
  } else {
    // Wrong pair
    oyenSounds.playWrong();
    
    btnEn.classList.add('disabled');
    btnId.classList.add('disabled');
    
    setTimeout(() => {
      btnEn.classList.remove('selected', 'disabled');
      btnId.classList.remove('selected', 'disabled');
    }, 500);

    matchingState.selectedEn = null;
    matchingState.selectedId = null;
  }
}

// HANDLE QUIZ ACTION BUTTON (CHECK OR CONTINUE)
function handleQuizActionButton() {
  if (document.getElementById('btn-quiz-action').classList.contains('disabled')) return;

  const q = currentQuiz.questions[currentQuestionIndex];

  if (!isAnswerChecked) {
    // 1. EVALUATE ANSWER
    let isCorrectAnswer = false;
    let explanation = "";

    if (q.type === 'choice') {
      isCorrectAnswer = selectedOptionIndex === q.answer;
      explanation = q.explanation;
    } else if (q.type === 'translate') {
      const userJoined = selectedTranslateBlocks.map(b => b.word).join(" ");
      const correctJoined = q.correctWords.join(" ");
      
      // Case insensitive match
      isCorrectAnswer = userJoined.toLowerCase().trim() === correctJoined.toLowerCase().trim();
      explanation = `Jawaban Benar: "${correctJoined}"`;
    } else if (q.type === 'match') {
      // Matching is validated per action, so if check triggers, it means they are done
      isCorrectAnswer = true;
      explanation = "Semua pasangan kata berhasil dicocokkan dengan benar!";
    }

    // 2. APPLY CONSEQUENCES
    const footer = document.getElementById('quiz-modal-footer');
    const feedbackBox = document.getElementById('quiz-feedback-box');
    const feedbackTitle = document.getElementById('quiz-feedback-title');
    const feedbackDesc = document.getElementById('quiz-feedback-desc');
    const feedbackIcon = document.getElementById('quiz-feedback-icon');

    feedbackBox.classList.remove('hidden');
    isAnswerChecked = true;

    if (isCorrectAnswer) {
      oyenSounds.playCorrect();
      globalMascot.setState('success');
      
      footer.classList.add('correct-state');
      feedbackTitle.innerText = "Luar Biasa!";
      feedbackDesc.innerText = explanation || "Langkah yang mantap.";
      feedbackIcon.innerText = "✓";
      isCorrect = true;
    } else {
      oyenSounds.playWrong();
      globalMascot.setState('fail');
      
      // Deduct heart
      quizHearts = oyenProgress.useHeart();
      document.getElementById('quiz-hearts-count').innerText = quizHearts;
      document.getElementById('stat-hearts-val').innerText = quizHearts;

      footer.classList.add('error-state');
      feedbackTitle.innerText = "Kurang Tepat";
      feedbackDesc.innerText = explanation || "Teruslah berlatih!";
      feedbackIcon.innerText = "✕";
      isCorrect = false;
    }

    const actionBtn = document.getElementById('btn-quiz-action');
    actionBtn.innerText = 'Lanjutkan';

  } else {
    // 3. PROCEED TO NEXT OR GAME OVER
    if (quizHearts <= 0) {
      // Game Over
      closeQuizModal();
      alert("💀 Nyawa Habis! Anda gagal menyelesaikan kuis. Tenang, Anda bisa mencoba lagi!");
      return;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuiz.questions.length) {
      globalMascot.setState('idle');
      renderQuestion();
    } else {
      // Quiz Finished Successfully!
      finishQuizSession();
    }
  }
}

// FINISH QUIZ SESSION
function finishQuizSession() {
  oyenSounds.playVictory();
  
  // Hide questions
  document.getElementById('quiz-question-card').style.display = 'none';
  document.getElementById('quiz-modal-footer').style.display = 'none';
  
  // Show victory card
  const victoryScreen = document.getElementById('quiz-victory-screen');
  victoryScreen.style.display = 'flex';

  // Render celebratory Mascot inside modal
  victoryMascot = new OyenMascot('victory-mascot-anchor');
  victoryMascot.setState('celebrate');

  // Gained progress XP & unlocks
  const isAILesson = !currentQuiz.id; // AI lessons do not have standard level IDs
  const xpGained = isAILesson ? 15 : 10;
  
  document.getElementById('victory-xp-earned').innerText = xpGained;

  oyenProgress.addXP(xpGained);

  if (!isAILesson) {
    oyenProgress.completeLevel(currentQuiz.id);
  }

  // Update background stats immediately
  updateStatsUI();
  renderLevelMap();
  renderLeaderboard();
  updateProfileUI();
}

// CLOSE QUIZ MODAL
function closeQuizModal() {
  document.getElementById('quiz-modal').style.display = 'none';
  globalMascot.setState('idle');
}

// QUIT CONFIRMATION
function quitQuizConfirm() {
  if (confirm("Apakah Anda yakin ingin keluar? Progres kuis saat ini akan hilang.")) {
    closeQuizModal();
  }
}

// AI GENERATOR PRESETS
function selectPreset(topic) {
  oyenSounds.playClick();
  
  // Remove previous highlights
  const chips = document.querySelectorAll('.preset-chip');
  chips.forEach(c => c.classList.remove('selected'));

  // Highlight selected preset
  aiSelectedPreset = topic;
  const activeBtn = Array.from(chips).find(c => c.getAttribute('onclick').includes(topic));
  if (activeBtn) {
    activeBtn.classList.add('selected');
  }

  // Auto populate custom input
  const nameMap = { restoran: "Di Kafe & Restoran", liburan: "Liburan di Pantai", kerja: "Wawancara Kerja" };
  document.getElementById('custom-topic-input').value = nameMap[topic] || "";
}

// TRIGGER AI GENERATION SESSION
function triggerAIGeneration() {
  const inputEl = document.getElementById('custom-topic-input');
  const prompt = inputEl.value.trim();

  if (!prompt) {
    alert("Silakan masukkan topik kustom atau pilih preset!");
    return;
  }

  oyenSounds.playClick();

  const terminal = document.getElementById('ai-log-terminal');
  const linesContainer = document.getElementById('terminal-lines-container');
  const btnStart = document.getElementById('btn-start-ai');

  terminal.style.display = 'block';
  linesContainer.innerHTML = '';
  btnStart.classList.add('disabled');
  btnStart.disabled = true;

  // Set Oyen to thinking state
  globalMascot.setState('thinking');

  // Launch simulated neural generation
  oyenAIGenerator.simulateGeneration(
    prompt,
    (logLine) => {
      const div = document.createElement('div');
      div.className = 'terminal-line';
      div.innerText = logLine;
      linesContainer.appendChild(div);
      // Auto-scroll console
      terminal.scrollTop = terminal.scrollHeight;
    },
    (generatedQuiz) => {
      // Re-enable trigger button
      btnStart.classList.remove('disabled');
      btnStart.disabled = false;
      terminal.style.display = 'none';

      // Start the dynamic AI lesson
      startQuiz(null, generatedQuiz);
    }
  );
}

// RENDER LEADERBOARD RANKS
function renderLeaderboard() {
  const container = document.getElementById('leaderboard-container');
  if (!container) return;
  container.innerHTML = '';

  const list = oyenProgress.progress.leaderboard;

  list.forEach((entry, idx) => {
    const item = document.createElement('div');
    item.className = `leaderboard-item ${entry.isPlayer ? 'player-rank' : ''}`;

    let medal = ``;
    if (idx === 0) medal = '🥇';
    else if (idx === 1) medal = '🥈';
    else if (idx === 2) medal = '🥉';
    else medal = `${idx + 1}`;

    // Cute emoji cat profile
    const cats = ['🐱', '🐈', '🦁', '🐯', '😸'];
    const catFace = entry.isPlayer ? '🐱' : cats[idx % cats.length];

    item.innerHTML = `
      <div class="leaderboard-user">
        <span class="leaderboard-rank">${medal}</span>
        <span class="leaderboard-avatar-cat">${catFace}</span>
        <span>${entry.name}</span>
      </div>
      <div class="leaderboard-xp">${entry.xp} XP</div>
    `;

    container.appendChild(item);
  });
}

// UPDATE PROFILE DATA TAB
function updateProfileUI() {
  const progress = oyenProgress.progress;
  document.getElementById('profile-stat-xp').innerText = progress.xp;
  document.getElementById('profile-stat-streak').innerText = progress.streak;
  document.getElementById('profile-stat-levels').innerText = progress.completedLevels.length;

  const footerUsername = document.getElementById('footer-username');
  if (footerUsername) footerUsername.innerText = "Oyen (Kamu)";
}

// MUTED SOUND TOGGLE
function toggleMuteState() {
  const isMuted = oyenSounds.toggleMute();
  const el = document.getElementById('btn-sound-mute');
  el.innerText = isMuted ? '🔇' : '🔊';
  el.title = isMuted ? 'Unmute Suara' : 'Mute Suara';
}

// RESET PROGRESS UTILITY
function resetAllProgress() {
  if (confirm("⚠️ PERINGATAN: Tindakan ini akan menghapus seluruh XP, level yang diselesaikan, dan streak Anda secara permanen. Apakah Anda yakin?")) {
    oyenProgress.reset();
    updateStatsUI();
    renderLevelMap();
    renderLeaderboard();
    updateProfileUI();
    
    globalMascot.setState('idle');
    alert("Semua data progres OyenLingo telah di-reset.");
  }
}
