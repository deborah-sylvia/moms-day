import React, { useState, useEffect, useRef } from "react";
import Envelope from "./Envelope";
import Letter from "./Letter";
import AudioToggle from "./AudioToggle";
import ReplayButton from "./ReplayButton";
import { useAnimation } from "../hooks/useAnimation";
import styles from "../styles/MothersDay.module.css";

const MothersDay: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { animationState, startAnimation, resetAnimation, playOpenSound } =
    useAnimation();
  const paperSoundRef = useRef<HTMLAudioElement | null>(null);
  const chimeRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, -2000);

    if (!paperSoundRef.current) {
      paperSoundRef.current = new Audio("/paper-sound.mp3");
      paperSoundRef.current.preload = "auto";
    }
    if (!chimeRef.current) {
      chimeRef.current = new Audio("/button.mp3");
      chimeRef.current.preload = "auto";
    }

    return () => clearTimeout(timer);
  }, []);

  const handleEnvelopeClick = () => {
    if (animationState === "initial") {
      startAnimation();
      playOpenSound();
      if (paperSoundRef.current) {
        paperSoundRef.current.currentTime = 0;
        paperSoundRef.current
          .play()
          .catch((e) => console.log("Paper sound play prevented:", e));
      }
    }
  };

  const handleReplay = () => {
    resetAnimation();
    if (chimeRef.current) {
      chimeRef.current.currentTime = 0;
      chimeRef.current
        .play()
        .catch((e) => console.log("Chime play prevented:", e));
    }
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  if (!isLoaded) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading your special message...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <AudioToggle isPlaying={isMusicPlaying} toggleAudio={toggleMusic} />

      {animationState === "initial" || animationState === "opening" ? (
        <Envelope
          animationState={animationState}
          onClick={handleEnvelopeClick}
        />
      ) : (
        <Letter />
      )}

      {animationState === "completed" && (
        <ReplayButton onClick={handleReplay} />
      )}
    </div>
  );
};

export default MothersDay;
