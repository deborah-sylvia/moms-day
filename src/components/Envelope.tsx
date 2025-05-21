import React from "react";
import { Play } from "lucide-react";
import styles from "../styles/Envelope.module.css";

interface EnvelopeProps {
  animationState: string;
  onClick: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ animationState, onClick }) => {
  const isOpening = animationState === "opening";

  return (
    <div
      className={
        `${styles.envelopeContainer} ` + (isOpening ? styles.opening : "")
      }
      onClick={onClick}
      role="button"
      aria-label="Open Mother's Day card"
      tabIndex={0}
    >
      <div className={styles.envelope}>
        <div
          className={styles.flap + (isOpening ? " " + styles.flapOpen : "")}
        ></div>
        <div className={styles.letter}></div>
        <div className={styles.front}></div>
        <div className={styles.tulipPeek}></div>
      </div>
      {!isOpening && (
        <div className={styles.tapToOpen}>
          <Play size={16} />
          <span>Tap to open</span>
        </div>
      )}
    </div>
  );
};

export default Envelope;
