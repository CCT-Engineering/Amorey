import React from 'react';
import local from '../../styles/QuestionsAnswers/AnswerEntry.css';

const AnswerEntry = ({ answer }) => (
  <div className={local.answer}>
    <h4 className={local.summary}>A:</h4>
    <div className={local.answerBody}>
      <div className={local.header}>
        {answer.body}
      </div>
    </div>
  </div>
);

export default AnswerEntry;
