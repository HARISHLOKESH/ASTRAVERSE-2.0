// ASTRAVERSE 2.0 - Web Audio Ambient Soundscape & Speech Synthesizer
// Synthesizes a deep space ambient drone and tactile UI chimes with zero external audio assets

class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.droneGain = null;
    this.oscillators = [];
    this.speechSynth = window.speechSynthesis || null;
    this.currentUtterance = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.buildSpaceDrone();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  buildSpaceDrone() {
    if (!this.ctx) return;

    // Master drone gain
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    // Warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    // Filter LFO for gentle cosmic breathing
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(45, this.ctx.currentTime);
    lfo.connect(filter.frequency);
    lfo.start();

    // Harmonics: 55Hz (A1), 110Hz (A2), 164.81Hz (E3), 82.4Hz (E2)
    const frequencies = [55.0, 55.4, 82.4, 110.0, 164.8];

    frequencies.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle detune for binaural depth
      osc.detune.setValueAtTime((i - 2) * 4, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(0.06 / (i + 1), this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      this.oscillators.push(osc);
    });

    filter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);
  }

  toggleSound() {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (!this.droneGain || !this.ctx) return this.isMuted;

    const now = this.ctx.currentTime;
    if (this.isMuted) {
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
    } else {
      this.droneGain.gain.linearRampToValueAtTime(0.09, now + 2.0);
      this.playChime(440, 'sine', 0.1, 0.4);
    }

    return this.isMuted;
  }

  playChime(freq = 520, type = 'sine', gainVal = 0.05, duration = 0.3) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);

      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Audio chime error:", e);
    }
  }

  playModalOpen() {
    this.playChime(330, 'sine', 0.06, 0.4);
    setTimeout(() => this.playChime(660, 'sine', 0.04, 0.5), 100);
  }

  playLevelTransition() {
    this.playChime(220, 'triangle', 0.08, 0.6);
    setTimeout(() => this.playChime(440, 'sine', 0.06, 0.4), 150);
  }

  // Web Speech API Narrator
  speak(text, onEndCallback) {
    if (!this.speechSynth) return false;

    // Stop any ongoing speech
    this.speechSynth.cancel();

    if (!text) return false;

    const cleanText = text.replace(/[*_#`]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95; // Slightly slower, calm cadence
    utterance.pitch = 1.0;

    // Choose English voice if available
    const voices = this.speechSynth.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Siri') || v.name.includes('David')));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onEndCallback) onEndCallback();
    };

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);
    return true;
  }

  stopSpeaking() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
    this.currentUtterance = null;
  }

  isSpeaking() {
    return this.speechSynth ? this.speechSynth.speaking : false;
  }
}

export const audioEngine = new CosmicAudioEngine();
