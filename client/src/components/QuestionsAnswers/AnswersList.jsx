import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import local from '../../styles/QuestionsAnswers/AnswersList.css';

const AnswersList = ({ renderedAnswers, updateQuestions, darkMode }) => (
  <div className={local.questionsList}>
    {renderedAnswers.map((answerItem) => (
      <AnswerEntry
        key={`Answer${answerItem.id}`}
        answer={answerItem}
        updateQuestions={updateQuestions}
        darkMode={darkMode}
      />
    ))}
  </div>
);

export default AnswersList;
