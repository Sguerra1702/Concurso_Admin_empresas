// src/components/AnswerAlert/AnswerAlert.jsx
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AlertContent = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 40px;
  border-radius: 15px;
  text-align: center;
  animation: ${pulseAnimation} 1s infinite;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
`;

const AnswerAlert = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AlertOverlay>
      <AlertContent>
        ¡PUEDEN RESPONDER!
      </AlertContent>
    </AlertOverlay>
  );
};

export default AnswerAlert;