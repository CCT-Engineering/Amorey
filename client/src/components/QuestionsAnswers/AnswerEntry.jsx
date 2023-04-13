import React from 'react';
import local from '../../styles/QuestionsAnswers/AnswerEntry.css';

const AnswerEntry = ({ answer, darkMode }) => (
  <div id="answers" className={darkMode ? local.mainBodyDark : local.mainBody}>
    <div className={local.header}>
      <h4 className={local.summary}>{`Q: ${question.question_body}`}</h4>
    </div>
  </div>
);

export default AnswerEntry;
