import React, { useState } from 'react';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/QuestionsAnswers/AnswerEntry.css';

const AnswerEntry = ({ answer, darkMode }) => {
  const unrated = !(localStorage.getItem(answer.id) === 'true');
  const [expand, setExpand] = useState(false);
  const [canRateReview, setRateReview] = useState(unrated);

  const rateReview = (rating) => {
    if (rating === 'putReport') {
      localStorage.setItem(review.review_id, 'true');
      updateReview(review.review_id, rating);
    } else if (canRateReview) {
      localStorage.setItem(review.review_id, 'true');
      setRateReview(false);
      updateReview(review.review_id, rating);
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
          <div>
            {`by ${answer.answerer_name} |`}
            &nbsp;
          </div>
          <div>Helpful?</div>
          <button
            type="button"
            aria-label="Put Helpful"
            tabIndex={0}
            className={darkMode ? local.helpfulDark : local.helpful}
            style={{ color: canRateReview ? null : 'gold' }}
            onClick={() => rateReview('putHelpful')}
            onKeyPress={buildHandleEnterKeyPress(() => rateReview('putHelpful'))}
          >
            YES
          </button>
          <div>{`(${answer.helpfulness}) | `}</div>
          <button
            type="button"
            aria-label="Put Report"
            tabIndex={0}
            className={darkMode ? local.reportDark : local.report}
            onClick={() => rateReview('putReport')}
            onKeyPress={buildHandleEnterKeyPress(() => rateReview('putReport'))}
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerEntry;
