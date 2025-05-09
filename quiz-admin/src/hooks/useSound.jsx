// src/hooks/useSound.js

import { useEffect, useRef } from 'react';

export const useSound = () => {
  const timerSound = useRef(new Audio('/assets/sounds/timer.mp3'));
  const correctSound = useRef(new Audio('/src/assets/sounds/correct.mp3'));
  const spinSound = useRef(new Audio('/src/assets/sounds/spin.mp3'));
  const hornSound = useRef(new Audio('/src/assets/sounds/horn.mp3')); // Agregamos el sonido de corneta

  const playCorrect = () => {
    correctSound.current.currentTime = 0;
    correctSound.current.play();
  };

  const playSpinning = () => {
    spinSound.current.currentTime = 0;
    spinSound.current.loop = true;
    spinSound.current.play();
  };

  const playHorn = () => {
    hornSound.current.currentTime = 0;
    hornSound.current.play();
  };

  const stopSpinning = () => {
    spinSound.current.pause();
    spinSound.current.currentTime = 0;
  };

  const stopAll = () => {
    timerSound.current.pause();
    correctSound.current.pause();
    spinSound.current.pause();
    hornSound.current.pause();
    timerSound.current.currentTime = 0;
    correctSound.current.currentTime = 0;
    spinSound.current.currentTime = 0;
    hornSound.current.currentTime = 0;
  };

  useEffect(() => {
    return () => {
      stopAll();
    };
  }, []);

  return { playCorrect, playSpinning, stopSpinning, playHorn, stopAll };
};