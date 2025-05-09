// src/components/Question/Question.jsx
import React from 'react';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const Option = styled.div`
  background-color: ${props => (props.highlighted ? '#f8f9fa' : 'white')};
  padding: 15px;
  margin: 8px 0;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #ddd;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const QuestionImage = styled.div`
  margin: 20px 0;
  max-width: 100%;
  text-align: center;
  
  img {
    max-width: 100%;
    max-height: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Question = ({ question, highlighted }) => {
  return (
    <QuestionContainer>
      <QuestionText>{question.text}</QuestionText>
      
      {/* Mostrar imagen si existe en la pregunta */}
      {question.imageUrl && (
        <QuestionImage>
          <img src={question.imageUrl} alt="Imagen relacionada con la pregunta" />
        </QuestionImage>
      )}
      
      <OptionsContainer>
        {question.options.map((option, index) => (
          <Option 
            key={index} 
            highlighted={highlighted && index === question.correctAnswer}
          >
            {option}
          </Option>
        ))}
      </OptionsContainer>
    </QuestionContainer>
  );
};

export default Question;