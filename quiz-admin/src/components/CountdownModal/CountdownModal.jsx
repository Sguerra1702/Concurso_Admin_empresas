// src/components/CountdownModal/CountdownModal.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

const CountdownContent = styled.div`
  text-align: center;
`;

const CountNumber = styled.div`
  font-size: 6rem;
  color: white;
  font-weight: bold;
  animation: pulse 1s infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const CountdownModal = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [count, onComplete]);

  return (
    <ModalOverlay>
      <CountdownContent>
        <CountNumber>{count}</CountNumber>
      </CountdownContent>
    </ModalOverlay>
  );
};

export default CountdownModal;