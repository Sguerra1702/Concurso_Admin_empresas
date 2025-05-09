// src/components/RoundEnd/RoundEnd.jsx
import React from 'react';
import styled from 'styled-components';

const RoundEndContainer = styled.div`
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

const RoundEndContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  max-width: 600px;
  width: 90%;
`;

const RoundTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 20px;
`;

const RoundSubTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 20px;
`;
const StartButton = styled.button`
  padding: 15px 30px;
  font-size: 1.3rem;
  background: linear-gradient(145deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
  }
`;

const RoundEnd = ({ roundNumber, onStartNextRound }) => {
  return (
    <RoundEndContainer>
      <RoundEndContent>
        <RoundTitle>Prueba Interactiva # {roundNumber}</RoundTitle>
        <RoundSubTitle>¡Nombre de la actividad!</RoundSubTitle>
        <StartButton onClick={onStartNextRound}>
          Iniciar Ronda {roundNumber + 1}
        </StartButton>
      </RoundEndContent>
    </RoundEndContainer>
  );
};

export default RoundEnd;