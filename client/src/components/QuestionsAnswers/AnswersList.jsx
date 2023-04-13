import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import local from '../../styles/QuestionsAnswers/AnswersList.css';

const AnswersList = ({ renderedAnswers }) => (
  <div className={local.questionsList}>
    {renderedAnswers.map((answerItem) => (
      <AnswerEntry
        key={`Answer${answerItem.id}`}
        answer={answerItem}
      />
    ))}
  </div>
);

export default AnswersList;
