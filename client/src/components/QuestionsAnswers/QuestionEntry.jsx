import React, { useState, useEffect } from 'react';
import AnswersList from './AnswersList.jsx';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/QuestionsAnswers/QuestionEntry.css';

const QuestionEntry = ({ question, updateQuestions, darkMode }) => {
  const unrated = !(localStorage.getItem(`Q${question.question_id}`) === 'true');
  const [renderLimit, setRenderLimit] = useState(2);
  const [sortedAnswers, setSortedAnswers] = useState([]);
  const [canRateQuestion, setCanRateQuestion] = useState(unrated);

  const sortAnswers = (answerArr, sort = 'helpfulness') => (
    Object.values(answerArr).sort((a, b) => {
      if (sort === 'helpfulness') {
        return b.helpfulness - a.helpfulness;
      }
      return new Date(b.date) - new Date(a.date);
    }).slice(0, renderLimit)
  );

  useEffect(() => {
    setSortedAnswers(sortAnswers(question.answers).slice(0, renderLimit));
  }, [question.answers, renderLimit]);

  const windowScroll = () => {
    const questionDiv = document.getElementById('question');
    const questionDivBottom = questionDiv.geBoundingClientRect().bottom;
    const scrollAmount = questionDivBottom - window.innerHeight;

    if (scrollAmount > 0) {
      window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const loadMoreAnswers = () => {
    setTimeout(() => { windowScroll(); }, 100);
    setRenderLimit(Math.min(renderLimit + 2, Object.values(question.answers).length));
  };

  const markQuestion = (action) => {
    localStorage.setItem(`Q${question.question_id}`, 'true');
    if (action === 'putReportQuestion') {
      updateQuestions(question.question_id, action);
    } else if (canRateQuestion) {
      setCanRateQuestion(false);
      updateQuestions(question.question_id, action);
    }
  };

  return (
    <div id="question" className={darkMode ? local.mainBodyDark : local.mainBody}>
      <div className={local.header}>
        <h4 className={local.summary}>{`Q: ${question.question_body}`}</h4>
        <div className={local.questionActionBar}>
          <div>Helpful?</div>
          <button
            type="button"
            aria-label="Mark Question Helpful"
            tabIndex={0}
            className={darkMode ? local.helpfulDark : local.helpful}
            style={{ color: canRateQuestion ? null : 'gold' }}
            onClick={() => markQuestion('putHelpfulQuestion')}
            onKeyPress={buildHandleEnterKeyPress(() => markQuestion('putHelpfulQuestion'))}
          >
            YES
          </button>
          <div>{`(${question.question_helpfulness}) | `}</div>
          <button
            type="button"
            aria-label="Report Question"
            tabIndex={0}
            className={darkMode ? local.reportDark : local.report}
            onClick={() => markQuestion('putReportQuestion')}
            onKeyPress={buildHandleEnterKeyPress(() => markQuestion('putReportQuestion'))}
          >
            Report
          </button>
        </div>
      </div>
      {(sortedAnswers?.length || 0)
        ? (
          <AnswersList
            renderedAnswers={sortedAnswers.slice(0, renderLimit)}
            updateQuestions={updateQuestions}
            darkMode={darkMode}
          />
        )
        : <div className={local.noAnswers}>Currently No Answers To Display</div>}
      {renderLimit < Object.values(question.answers).length && (
        <button
          className={darkMode ? local.moreAnswersDark : local.moreAnswers}
          aria-label="More Answers"
          type="button"
          onClick={loadMoreAnswers}
        >
          MORE ANSWERS
        </button>
      )}
    </div>
  );
};

export default QuestionEntry;
