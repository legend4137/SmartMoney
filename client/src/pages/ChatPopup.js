import React from 'react';
import styles from './ChatPopup.module.css';
import botImage from '../assets/bot.png';

const ChatPopup = () => {
  return (
    <div className={styles.chatPopupContainer}>
      <a href="/chatBot" className={styles.circularButton}>
        <img src={botImage} alt="Chat Bot" className={styles.buttonImage} />
        <span className={styles.tooltipText}>Chat with us!</span>
      </a>
    </div>
  );
};

export default ChatPopup;
