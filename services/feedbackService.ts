/**
 * Feedback Service
 * Handles Audio (Web Audio API) and Haptic (Vibration API) feedback.
 */
import { DesignStyle } from '../types';

let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  return audioCtx;
};

const playClickSound = (style: DesignStyle) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Resume context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (style) {
      case 'retro':
        // 8-bit Square Wave (Classic Beep)
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1); // Pitch drop
        
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'cyberpunk':
        // Sawtooth (High-tech/Laser)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.1); // Slide UP
        
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'minimal':
        // Very short high-pitch sine (Tick)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1500, now);
        
        gain.gain.setValueAtTime(0.02, now); // Very quiet
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03); // Super short
        
        osc.start(now);
        osc.stop(now + 0.03);
        break;

      case 'modern':
      default:
        // Soft Sine (Bubble/Tap)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
        
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
        break;
    }

  } catch (e) {
    console.debug('Audio playback failed', e);
  }
};

const triggerVibration = (duration: number = 10) => {
  if (navigator.vibrate) {
    navigator.vibrate(duration);
  }
};

export const provideFeedback = (soundEnabled: boolean, vibrationEnabled: boolean, style: DesignStyle) => {
  if (soundEnabled) {
    playClickSound(style);
  }
  if (vibrationEnabled) {
    triggerVibration(15);
  }
};