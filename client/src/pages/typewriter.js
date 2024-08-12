import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from './lib/utils';

export const TypewriterEffect = ({ text, className, cursorClassName, typingSpeed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (isTyping) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => text.slice(0, prev.length + 1));
        if (displayedText.length === text.length) {
          setIsTyping(false);
        }
      }, typingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText('');
        setIsTyping(true);
      }, typingSpeed * 20); 
    }

    return () => clearTimeout(timeout);
  }, [text, displayedText, isTyping, typingSpeed]);

  return (
    <div className={cn("inline-flex items-center", className)} style={{ minWidth: '164px' }}>
      <span>{displayedText}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className={cn("inline-block bg-blue-500 h-full", cursorClassName)}
      >
        &nbsp;
      </motion.span>
    </div>
  );
};