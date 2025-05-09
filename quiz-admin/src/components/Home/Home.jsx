import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  padding: 20px;
`;

const Logo = styled.img`
  max-width: 250px;
  margin-bottom: 40px;
`;

const GameTitle = styled.h1`
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const GameSubtitle = styled.h2`
  font-size: 1.25rem;
    color: var(--color-primary);
    margin-bottom: 10px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const StartButton = styled.button`
  padding: 15px 40px;
  font-size: 1.5rem;
  background: linear-gradient(145deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Home = ({ onStartGame }) => {
  return (
    <HomeContainer>
      <Logo src="/src/assets/images/logo-trivia.png" alt="Trivia Logo" />
      <GameTitle>CONCURSO SABERES DE ADMINISTRACIÓN</GameTitle>
      <GameSubtitle>Fanáticos por el conocimiento</GameSubtitle>
      <StartButton onClick={onStartGame}>
        ¡Iniciar Juego!
      </StartButton>
    </HomeContainer>
  );
};

export default Home;