import React, { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import styles from "../styles/AudioToggle.module.css";

interface AudioToggleProps {
  isPlaying: boolean;
  toggleAudio: () => void;
}

const AudioToggle: React.FC<AudioToggleProps> = ({
  isPlaying,
  toggleAudio,
}) => {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const paperSoundRef = useRef<HTMLAudioElement | null>(null);
  const chimeSoundRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!backgroundMusicRef.current) {
      backgroundMusicRef.current = new Audio("/miao.mp3");
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = 0.3;
    }

    if (!paperSoundRef.current) {
      paperSoundRef.current = new Audio("/paper-sound.mp3");
      paperSoundRef.current.volume = 0.4;
    }

    if (!chimeSoundRef.current) {
      chimeSoundRef.current = new Audio("/button.mp3");
      chimeSoundRef.current.volume = 0.3;
    }

    const fade = (targetVolume: number, fadeIn: boolean) => {
      const audio = backgroundMusicRef.current;
      if (!audio) return;
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      const duration = 1000; // 1 second
      const interval = 30;
      const steps = Math.ceil(duration / interval);
      const step = targetVolume / steps;
      let volume = fadeIn ? 0 : audio.volume;
      if (fadeIn) {
        audio.volume = 0;
        audio.play();
      }
      fadeIntervalRef.current = setInterval(() => {
        if (!audio) return clearInterval(fadeIntervalRef.current!);
        if (fadeIn) {
          volume = Math.min(volume + step, targetVolume);
          audio.volume = volume;
          if (volume >= targetVolume) {
            audio.volume = targetVolume;
            clearInterval(fadeIntervalRef.current!);
          }
        } else {
          volume = Math.max(volume - step, 0);
          audio.volume = volume;
          if (volume <= 0.01) {
            audio.volume = 0;
            audio.pause();
            clearInterval(fadeIntervalRef.current!);
          }
        }
      }, interval);
    };

    if (isPlaying) {
      fade(0.3, true);
    } else {
      fade(0.3, false);
    }

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    };
  }, [isPlaying]);

  return (
    <button
      className={styles.audioToggle}
      onClick={toggleAudio}
      aria-label={isPlaying ? "Mute background music" : "Play background music"}
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
};

export default AudioToggle;
