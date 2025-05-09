// src/components/GameComplete/GameComplete.jsx
import React from 'react';
import styled from 'styled-components';

const GameCompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #43c6ac, #191654);
  color: white;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeIn 1.5s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
  max-width: 600px;
  line-height: 1.6;
  animation: fadeIn 2s ease-out;
`;

const HomeButton = styled.button`
  padding: 15px 30px;
  font-size: 1.3rem;
  background: white;
  color: #43c6ac;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: fadeIn 2.5s ease-out;
  font-weight: bold;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Logo = styled.img`
  max-width: 150px;
  margin-top: 40px;
  opacity: 0.9;
`;

const GameComplete = ({ onReturnHome }) => {
  return (
    <GameCompleteContainer>
      <Title>¡Gracias por Jugar!</Title>
      <Message>
        Has completado todas las actividades de la trivia. Esperamos que hayas disfrutado la experiencia y aprendido algo nuevo.
      </Message>
      <HomeButton onClick={onReturnHome}>
        Volver al Inicio
      </HomeButton>
    </GameCompleteContainer>
  );
};

export default GameComplete;