import { useState, useRef } from 'react';

type AnimationState = 'initial' | 'opening' | 'completed';

export const useAnimation = () => {
  const [animationState, setAnimationState] = useState<AnimationState>('initial');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element for envelope opening sound
  if (!audioRef.current) {
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2023/03/26/audio_cf4a7a09f5.mp3?filename=paper-open-178686.mp3');
    audioRef.current.preload = 'auto';
  }

  const startAnimation = () => {
    setAnimationState('opening');
    
    // Wait for envelope animation to complete, then show letter
    setTimeout(() => {
      setAnimationState('completed');
    }, 1800);
  };

  const resetAnimation = () => {
    setAnimationState('initial');
  };

  const playOpenSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play prevented:', e));
    }
  };

  return {
    animationState,
    startAnimation,
    resetAnimation,
    playOpenSound
  };
};