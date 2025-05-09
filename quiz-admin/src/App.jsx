import React, { useState, useEffect } from "react";
import Question from "./components/Question/Question";
import Timer from "./components/Timer/Timer";
import RouletteAnswer from "./components/RouletteAnswer/RouletteAnswer";
import AnswerAlert from "./components/AnswerAlert/AnswerAlert";
import TimeUpAlert from "./components/TimeUpAlert/TimeUpAlert";
import RoundEnd from "./components/RoundEnd/RoundEnd";
import CountdownModal from "./components/CountdownModal/CountdownModal";
import Home from "./components/Home/Home";
import Rules from "./components/Rules/Rules";
import { questions, roundConfigs } from "./data/questions";
import { useSound } from "./hooks/useSound";
import styled from "styled-components";
import "./styles/global.css";

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
  padding: 20px;

  > div {
    width: 100%;
    max-width: 800px;
  }
`;

const ControlButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px auto;
  transition: all 0.3s ease;
  display: block;
  min-width: 200px;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

// Define application states
const APP_STATES = {
  HOME: 'home',
  RULES: 'rules',
  GAME: 'game'
};

function App() {
  // App state management
  const [appState, setAppState] = useState(APP_STATES.HOME);
  
  // Game state
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showRoulette, setShowRoulette] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const { playCorrect } = useSound();
  const [showAnswerAlert, setShowAnswerAlert] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(false);
  const [showTimeUpAlert, setShowTimeUpAlert] = useState(false);
  const [showRoundEnd, setShowRoundEnd] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [nextRound, setNextRound] = useState(1); // Track the next round to switch to
  const [isTransitioningToNextRound, setIsTransitioningToNextRound] = useState(false);

  // Handle transitions between app states
  const handleStartGame = () => {
    setAppState(APP_STATES.RULES);
  };

  const handleStartFirstRound = () => {
    // First show countdown and then switch to game state
    setShowCountdown(true);
    // The actual game state change will happen in handleCountdownComplete
  };

  // Función para mostrar la ruleta
  const showRouletteAnswer = () => {
    setShowRoulette(true);
  };
  
  // Botón para iniciar la fase de respuesta (reemplaza al timer de lectura)
  const handleStartAnswering = () => {
    setShowAnswerAlert(true);
  };

  // Maneja cuando termina la alerta de "Pueden responder"
  const handleAnswerAlertComplete = () => {
    setShowAnswerAlert(false);
    setShowAnswerTimer(true);
    setTimerKey((prev) => prev + 1);
  };

  // Maneja cuando termina el tiempo de respuesta
  const handleAnswerTimeUp = () => {
    setShowAnswerTimer(false);
    setShowTimeUpAlert(true); // Mostrar la alerta de tiempo agotado
  };

  // Maneja cuando termina la alerta de tiempo agotado
  const handleTimeUpAlertComplete = () => {
    setShowTimeUpAlert(false);
    showRouletteAnswer(); // Mostrar la ruleta después
  };

  // Maneja cuando se quiere saltar el timer de respuesta
  const handleSkipTimer = () => {
    setShowAnswerTimer(false);
    showRouletteAnswer(); // Ir directamente a la ruleta sin mostrar alerta de tiempo agotado
  };

  // Maneja cuando termina la animación de la ruleta
  const handleRouletteComplete = () => {
    setShowNextButton(true);
    playCorrect();
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    const currentRoundQuestions =
      questions[`round${currentRound}`].easy.length +
      questions[`round${currentRound}`].medium.length +
      questions[`round${currentRound}`].hard.length;

    if (nextQuestion < currentRoundQuestions) {
      setCurrentQuestion(nextQuestion);
      setShowRoulette(false);
      setShowNextButton(false);
      setShowAnswerTimer(false);
      setShowTimeUpAlert(false);
      setTimerKey((prev) => prev + 1);
    } else {
      if (currentRound < 3) {
        // Store the next round number
        setNextRound(currentRound + 1);
        // Show round end screen
        setShowRoundEnd(true);
      } else {
        console.log("Juego terminado");
        // Here you could implement game end logic or return to home
        setAppState(APP_STATES.HOME);
      }
    }
  };

  const handleStartNextRound = () => {
    // Set flag to indicate we're moving to the next round
    setIsTransitioningToNextRound(true);
    // Actually increase the current round BEFORE showing countdown
    setCurrentRound(nextRound);
    setShowRoundEnd(false);
    setShowCountdown(true);
  };
  
  const handleCountdownComplete = () => {
    setShowCountdown(false);
    
    // If coming from Rules screen, change to Game state
    if (appState === APP_STATES.RULES) {
      setAppState(APP_STATES.GAME);
    }
    
    // Reset game state for a new round/question
    setCurrentQuestion(0);
    setShowRoulette(false);
    setShowNextButton(false);
    setShowAnswerTimer(false);
    setShowTimeUpAlert(false);
    setShowRoundEnd(false);
    setIsTransitioningToNextRound(false);
    setTimerKey(prev => prev + 1);
  };

  const getCurrentQuestion = () => {
    const roundData = questions[`round${currentRound}`];
    const easyQuestions = roundData.easy;
    const mediumQuestions = roundData.medium;
    const hardQuestions = roundData.hard;

    if (currentQuestion < easyQuestions.length) {
      return easyQuestions[currentQuestion];
    } else if (
      currentQuestion <
      easyQuestions.length + mediumQuestions.length
    ) {
      return mediumQuestions[currentQuestion - easyQuestions.length];
    } else {
      return hardQuestions[
        currentQuestion - easyQuestions.length - mediumQuestions.length
      ];
    }
  };
  
  const testRoundEnd = () => {
    setNextRound(currentRound + 1); // Set next round when testing
    setShowRoundEnd(true);
  };
  
  const testCountdown = () => {
    setShowCountdown(true);
  };

  // For debugging
  useEffect(() => {
    console.log(`Current round: ${currentRound}, Next round: ${nextRound}, Question: ${currentQuestion}`);
  }, [currentRound, nextRound, currentQuestion]);

  return (
    <div className="app">
      <header className="header">
        {appState === APP_STATES.GAME && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2000 }}>
            <button onClick={testRoundEnd} style={{ marginRight: '10px' }}>Test Round End</button>
            <button onClick={testCountdown}>Test Countdown</button>
            <div style={{ color: 'white', marginTop: '5px' }}>
              Round: {currentRound}, Question: {currentQuestion + 1}
            </div>
          </div>
        )}
      </header>

      <main>
        {appState === APP_STATES.HOME && (
          <Home onStartGame={handleStartGame} />
        )}

        {appState === APP_STATES.RULES && !showCountdown && (
          <Rules onStartFirstRound={handleStartFirstRound} />
        )}

        {appState === APP_STATES.GAME && !showRoundEnd && !showCountdown && (
          <>
            <Question question={getCurrentQuestion()} highlighted={showRoulette} />

            {!showRoulette && !showAnswerAlert && !showAnswerTimer && !showTimeUpAlert && (
              <ButtonContainer>
                <ControlButton onClick={handleStartAnswering}>
                  Comenzar a responder
                </ControlButton>
              </ButtonContainer>
            )}

            {!showRoulette && !showAnswerAlert && showAnswerTimer && !showTimeUpAlert && (
              <>
                <Timer
                  key={timerKey}
                  initialTime={30} // Solo el temporizador de 30 segundos
                  onTimeUp={handleAnswerTimeUp}
                />

                <ButtonContainer>
                  <ControlButton onClick={handleSkipTimer}>
                    Todos han respondido
                  </ControlButton>
                </ButtonContainer>
              </>
            )}

            {showAnswerAlert && (
              <AnswerAlert onComplete={handleAnswerAlertComplete} />
            )}

            {showTimeUpAlert && (
              <TimeUpAlert onComplete={handleTimeUpAlertComplete} />
            )}

            {showRoulette && (
              <ModalOverlay>
                <div>
                  <RouletteAnswer
                    options={getCurrentQuestion().options}
                    correctAnswer={getCurrentQuestion().correctAnswer}
                    onComplete={handleRouletteComplete}
                  />
                  {showNextButton && (
                    <ButtonContainer>
                      <ControlButton onClick={handleNextQuestion}>
                        Siguiente Pregunta
                      </ControlButton>
                    </ButtonContainer>
                  )}
                </div>
              </ModalOverlay>
            )}
          </>
        )}

        {appState === APP_STATES.GAME && showRoundEnd && (
          <RoundEnd
            roundNumber={currentRound}
            onStartNextRound={handleStartNextRound}
          />
        )}

        {/* The CountdownModal can appear in either Rules or Game state */}
        {showCountdown && (
          <CountdownModal onComplete={handleCountdownComplete} />
        )}
      </main>

      <footer className="footer">
        <img
          src="/src/assets/images/escuela.png"
          alt="Logo Escuela"
          className="footer-logo"
        />
        <img
          src="/src/assets/images/alfa.png"
          alt="Logo ALFA"
          className="footer-logo alfa"
        />
        <img
          src="/src/assets/images/rosario.png"
          alt="Logo Universidad"
          className="footer-logo"
        />
      </footer>
    </div>
  );
}

export default App;