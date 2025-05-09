// src/components/TimeUpModal/TimeUpModal.jsx
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popIn = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
`;

const ModalOverlay = styled.div`
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
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  animation: ${popIn} 0.5s ease;
`;

const TimeUpText = styled.h2`
  color: #ff4444;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const TimeUpModal = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000); // Modal se mostrará por 2 segundos
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <ModalOverlay>
      <ModalContent>
        <TimeUpText>¡Se acabó el tiempo!</TimeUpText>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TimeUpModal;