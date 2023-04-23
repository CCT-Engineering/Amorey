import React, { useState } from 'react';
import { buildHandleEnterKeyPress } from '../../util';
import date from '../../util/formatDate.js';
import Thumbnail from '../SharedComponents/Thumbnail.jsx';
import local from '../../styles/QuestionsAnswers/AnswerEntry.css';

const AnswerEntry = ({ answer, updateQuestions, darkMode }) => {
  const answerID = answer.id || answer.answer_id;
  const unrated = !(localStorage.getItem(`A${answerID}`) === 'true');
  const [canRateAnswer, setCanRateAnswer] = useState(unrated);

  const markAnswer = (action) => {
    localStorage.setItem(`A${answerID}`, 'true');
    if (action === 'putReportAnswer') {
      updateQuestions(answerID, action);
    } else if (canRateAnswer) {
      setCanRateAnswer(false);
      updateQuestions(answerID, action);
    }
  };

  console.log('answer:', answer);

  return (
    <div className={local.answer}>
      <div className={local.answerBody}>
        <div className={local.header}>
          <h4 className={local.aLetter}>A:</h4>
          {answer.body}
        </div>
        {answer.photos ? answer.photos.map((photoURL, i) => (
          <Thumbnail photo={photoURL} key={`Answer Photo ${answerID + i}`} />
        )) : null}
        <div className={local.footer}>
          <div className={local.answerBy}>
            {`by ${answer.answerer_name} - ${date(answer.date)}`}
            &nbsp;
          </div>
          <div>| Helpful?</div>
          <button
            type="button"
            aria-label="Mark Answer Helpful"
            tabIndex={0}
            className={darkMode ? local.textBtnDark : local.textBtn}
            style={{ color: canRateAnswer ? null : 'gold' }}
            onClick={() => markAnswer('putHelpfulAnswer')}
            onKeyPress={buildHandleEnterKeyPress(() => markAnswer('putHelpfulAnswer'))}
          >
            YES
          </button>
          <div>{`(${answer.helpfulness}) | `}</div>
          <button
            type="button"
            aria-label="Report Answer"
            tabIndex={0}
            className={darkMode ? local.textBtnDark : local.textBtn}
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
