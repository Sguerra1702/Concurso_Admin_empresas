import React from "react";
import styled from "styled-components";

const RulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 25px;
  text-align: center;
`;

const RulesList = styled.ol`
  margin-bottom: 30px;
  width: 100%;
  padding-left: 40px;
`;

const RuleItem = styled.li`
  font-size: 1.1rem;
  margin-bottom: 15px;
  line-height: 1.6;
`;

const StartButton = styled.button`
  padding: 15px 40px;
  font-size: 1.3rem;
  background: linear-gradient(145deg, #4caf50, #45a049);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(76, 175, 80, 0.2);
  }
`;

const Rules = ({ onStartFirstRound }) => {
  return (
    <RulesContainer>
      <Title>Reglas del Juego</Title>
      <RulesList>
        <RuleItem>
          No se permitirán equipos con menos de 4 integrantes y cada equipo
          deberá permanecer completo durante las etapas que logre ir avanzando.
        </RuleItem>
        <RuleItem>
          Los dispositivos electrónicos (teléfonos, relojes inteligentes, etc.)
          no serán permitidos durante las pruebas
        </RuleItem>
        <RuleItem>
          En caso de algún intento de trampa, la descalificación será inmediata.
        </RuleItem>
        <RuleItem>
          No se permite levantar los tableros antes de que suene la alarma.
        </RuleItem>
        <RuleItem>
          Los equipos que respondan incorrectamente a una pregunta serán
          penalizados con puntos.
        </RuleItem>
        <RuleItem>
          Está prohibido comunicarse con miembros de otros equipos.
        </RuleItem>
        <RuleItem>
          Mantener Siempre el Respeto. El uso de vocabulario inapropiado está
          prohibido una vez que se ingresa a la sala de la actividad.
        </RuleItem>
      </RulesList>
      <StartButton onClick={onStartFirstRound}>
        ¡Empezar El Juego!
      </StartButton>
    </RulesContainer>
  );
};

export default Rules;
