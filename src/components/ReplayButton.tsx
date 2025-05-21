import React from 'react';
import { RefreshCw } from 'lucide-react';
import styles from '../styles/ReplayButton.module.css';

interface ReplayButtonProps {
  onClick: () => void;
}

const ReplayButton: React.FC<ReplayButtonProps> = ({ onClick }) => {
  return (
    <button 
      className={styles.replayButton}
      onClick={onClick}
      aria-label="Replay animation"
    >
      <RefreshCw size={16} />
      <span>Replay</span>
    </button>
  );
};

export default ReplayButton;