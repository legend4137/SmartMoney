
import React from 'react';
import styles from './glowText.module.css';

const GlowText = ({ text, faultyLetter }) => {
  return (
    <button className={styles['glowing-btn']}>
      <span className={styles['glowing-txt']}>
        {text.split('').map((letter, index) => (
          <span
            key={index}
            className={letter === faultyLetter ? styles['faulty-letter'] : ''}
          >
            {letter}
          </span>
        ))}
      </span>
    </button>
  );
};

export default GlowText;
