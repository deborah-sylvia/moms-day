import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import useSound from "use-sound";
import styles from "../styles/Tulip.module.css";

const Tulip: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  const [playBreeze] = useSound(
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_270f49683b.mp3?filename=wind-outside-sound-ambient-141989.mp3",
    {
      volume: 0.2,
      loop: true,
    }
  );

  const [playLeaves] = useSound(
    "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88347d37f1.mp3?filename=little-bell-14606.mp3",
    {
      volume: 0.1,
    }
  );

  useEffect(() => {
    const startAnimation = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsAnimating(true);
      playBreeze();
      playLeaves();

      controls.start({
        y: [0, -5, 0],
        rotate: [15, 17, 15],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    };

    startAnimation();

    return () => {
      controls.stop();
    };
  }, [controls, playBreeze, playLeaves]);

  return (
    <motion.div className={styles.tulipContainer} animate={controls}>
      <div className={styles.tulipImage}>
        <motion.img
          src="/yellow-tulip.png"
          alt="Beautiful yellow tulip"
          className={`${styles.tulip} ${isAnimating ? styles.animate : ""}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: "easeOut" },
          }}
        />
      </div>
    </motion.div>
  );
};

export default Tulip;
