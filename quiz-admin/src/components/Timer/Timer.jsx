// src/components/Timer/Timer.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  font-size: 3rem;
  font-family: 'DS-Digital', monospace;
  background-color: #FFE4B5;
  padding: 2px;
  border-radius: 10px;
  text-align: center;
  margin: 2px 0;
`;


const Timer = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TimerContainer>
      {formatTime(time)}
    </TimerContainer>
  );
};

export default Timer;