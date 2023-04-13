import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';
import local from '../../styles/QuestionsAnswers/QuestionsList.css';

const QuestionsList = ({ renderedQuestions, darkMode }) => (
  <div className={local.questionsList}>
    {renderedQuestions.map((questionItem) => (
      <QuestionEntry
        key={`Question${questionItem.question_id}`}
        question={questionItem}
        darkMode={darkMode}
      />
    ))}
  </div>
);

export default QuestionsList;
