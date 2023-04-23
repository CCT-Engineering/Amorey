import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import local from '../../styles/QuestionsAnswers/AnswersList.css';

const AnswersList = ({ renderedAnswers, updateQuestions, darkMode }) => (
  <div className={local.questionsList}>
    {renderedAnswers.map((answer) => {
      const answerID = answer.id || answer.answer_id;
      return (
        <AnswerEntry
          key={`Answer${answerID}`}
          answer={answer}
          updateQuestions={updateQuestions}
          darkMode={darkMode}
        />
      );
    })}
  </div>
);

export default AnswersList;
