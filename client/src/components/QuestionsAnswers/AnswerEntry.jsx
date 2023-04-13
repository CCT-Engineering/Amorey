import React, { useState } from 'react';
import { buildHandleEnterKeyPress } from '../../util';
import date from '../../util/formatDate.js';
import local from '../../styles/QuestionsAnswers/AnswerEntry.css';

const AnswerEntry = ({ answer, updateQuestions, darkMode }) => {
  const unrated = !(localStorage.getItem(`A${answer.id}`) === 'true');
  const [canRateAnswer, setCanRateAnswer] = useState(unrated);

  const markAnswer = (action) => {
    localStorage.setItem(`A${answer.id}`, 'true');
    if (action === 'putReport') {
      updateQuestions(answer.id, action);
    } else if (canRateAnswer) {
      setCanRateAnswer(false);
      updateQuestions(answer.id, action);
    }
  };

  return (
    <div className={local.answer}>
      <h4>A:</h4>
      <div className={local.answerBody}>
        <div className={local.header}>
          {answer.body}
        </div>
        <div className={local.footer}>
          <div className={local.answerBy}>
            {`by ${answer.answerer_name} - ${date(answer.date)}`}
            &nbsp;
          </div>
          <div>| Helpful?</div>
          <button
            type="button"
            aria-label="Put Helpful"
            tabIndex={0}
            className={darkMode ? local.helpfulDark : local.helpful}
            style={{ color: canRateAnswer ? null : 'gold' }}
            onClick={() => markAnswer('putHelpfulAnswer')}
            onKeyPress={buildHandleEnterKeyPress(() => markAnswer('putHelpfulAnswer'))}
          >
            YES
          </button>
          <div>{`(${answer.helpfulness}) | `}</div>
          <button
            type="button"
            aria-label="Put Report"
            tabIndex={0}
            className={darkMode ? local.reportDark : local.report}
            onClick={() => markAnswer('putReportAnswer')}
            onKeyPress={buildHandleEnterKeyPress(() => markAnswer('putReportAnswer'))}
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerEntry;
