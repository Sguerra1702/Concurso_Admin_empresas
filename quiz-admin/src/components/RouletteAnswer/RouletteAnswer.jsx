// src/components/RouletteAnswer/RouletteAnswer.jsx
import React, { useState, useEffect } from 'react';
import './RouletteAnswer.css';

const RouletteAnswer = ({ options, correctAnswer, onComplete }) => {
  const [currentHighlight, setCurrentHighlight] = useState(null);
  const [speed, setSpeed] = useState(50);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setCurrentHighlight(prev => (prev + 1) % options.length);
      }, speed);

      // Incrementar gradualmente la velocidad
      const slowDown = setTimeout(() => {
        if (speed < 300) {
          setSpeed(prev => prev + 50);
        } else {
          setIsSpinning(false);
          setCurrentHighlight(null); // Limpiamos el highlight
          setIsComplete(true);
          onComplete();
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(slowDown);
      };
    }
  }, [isSpinning, speed, options.length]);

  const startSpin = () => {
    setSpeed(50);
    setIsSpinning(true);
    setIsComplete(false);
    setCurrentHighlight(0);
  };

  return (
    <div className="roulette-container">
      {options.map((option, index) => (
        <div
          key={index}
          className={`roulette-option ${
            isSpinning && currentHighlight === index ? 'highlighted' : ''
          } ${isComplete && index === correctAnswer ? 'correct' : ''}`}
        >
          {option}
        </div>
      ))}
      {!isSpinning && !isComplete && (
        <button onClick={startSpin} className="spin-button">
          Girar Ruleta
        </button>
      )}
    </div>
  );
};

export default RouletteAnswer;