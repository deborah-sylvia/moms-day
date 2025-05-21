import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tulip from "./Tulip";
import styles from "../styles/Letter.module.css";

const Letter: React.FC = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.div
        className={styles.letterContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`${styles.letterContent} vintage-texture`}>
          <div
            className={`${styles.letterText} ${
              isTextVisible ? styles.visible : ""
            }`}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Happy mother's day ma,
            </motion.h1>
            <motion.div
              className={styles.imageContainer}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div
                className={`${styles.imagePlaceholder} ${
                  imageLoaded ? styles.loaded : ""
                }`}
              >
                <img
                  src="/mama.jpg"
                  alt="Mama gw d"
                  onLoad={handleImageLoad}
                  width="240"
                  height="240"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <p>
                Happy Mother's Day! Thank you for your endless love, support,
                and care. Wishing you a wonderful day filled with happiness and
                appreciation. You mean the world to me!
              </p>
              <span className={styles.signature}>
                - Si paling coding,
                <br />
                Sylvi cantiq
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Tulip />
    </div>
  );
};

export default Letter;
