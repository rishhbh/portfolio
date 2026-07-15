import { useCallback, useRef, useEffect } from 'react';

export function useSound() {
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize lazily to respect browser autoplay policies
    const initAudio = () => {
      if (!audioCtx.current) {
        const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtx.current = new AudioContextClass();
        }
      }
    };
    
    window.addEventListener('keydown', initAudio, { once: true });
    window.addEventListener('click', initAudio, { once: true });
    
    return () => {
      window.removeEventListener('keydown', initAudio);
      window.removeEventListener('click', initAudio);
    };
  }, []);

  const playKeystroke = useCallback(() => {
    if (!audioCtx.current) return;
    if (audioCtx.current.state === 'suspended') {
      audioCtx.current.resume();
    }
    
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    
    // Create a very short, low-frequency 'thud' resembling a mechanical switch
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioCtx.current.currentTime + 0.05);
    
    // Very quiet
    gain.gain.setValueAtTime(0.03, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.03);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.03);
  }, []);

  const playBeep = useCallback(() => {
    if (!audioCtx.current) return;
    if (audioCtx.current.state === 'suspended') {
      audioCtx.current.resume();
    }
    
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    
    // Retro terminal beep
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, audioCtx.current.currentTime);
    
    gain.gain.setValueAtTime(0.02, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.1);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.1);
  }, []);

  return { playKeystroke, playBeep };
}
