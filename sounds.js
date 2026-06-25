class OyenSounds {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playCorrect() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Quick pleasant arpeggio (C5 -> E5 -> G5 -> C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const duration = 0.08;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * duration);

      gain.gain.setValueAtTime(0, now + idx * duration);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * duration + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * duration + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * duration);
      osc.stop(now + idx * duration + 0.3);
    });
  }

  playWrong() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;

    // Disagreeable descending buzzing sound (two slightly out-of-tune low frequencies)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(150, now);
    osc1.frequency.linearRampToValueAtTime(100, now + 0.4);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(153, now);
    osc2.frequency.linearRampToValueAtTime(102, now + 0.4);

    // Apply lowpass filter to make it less harsh
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Triumphant progression: C4, G4, C5, E5, G5, C6 (very fast then sustained C6)
    const notes = [
      { f: 261.63, t: 0 },
      { f: 392.00, t: 0.1 },
      { f: 523.25, t: 0.2 },
      { f: 659.25, t: 0.3 },
      { f: 783.99, t: 0.4 },
      { f: 1046.50, t: 0.5 }
    ];

    notes.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, now + note.t);

      gain.gain.setValueAtTime(0, now + note.t);
      gain.gain.linearRampToValueAtTime(0.12, now + note.t + 0.02);
      
      const sustainTime = (note.f === 1046.50) ? 0.8 : 0.25;
      gain.gain.exponentialRampToValueAtTime(0.01, now + note.t + sustainTime);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + note.t);
      osc.stop(now + note.t + sustainTime + 0.1);
    });
  }
}

// Instantiate globally
window.oyenSounds = new OyenSounds();
