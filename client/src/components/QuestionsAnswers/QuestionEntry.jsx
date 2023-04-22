import React, { useState, useEffect } from 'react';
import AnswersList from './AnswersList.jsx';
import NewAnswer from './NewAnswer.jsx';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/QuestionsAnswers/QuestionEntry.css';
import requests from '../../requests.js';

const QuestionEntry = ({
  current, question, updateQuestions, darkMode,
}) => {
  const unrated = !(localStorage.getItem(`Q${question.question_id}`) === 'true');
  const [renderLimit, setRenderLimit] = useState(2);
  const [answers, setAnswers] = useState(question.answers ? Object.values(question.answers) : []);
  const [sortedAnswers, setSortedAnswers] = useState([]);
  const [canRateQuestion, setCanRateQuestion] = useState(unrated);
  const [showModal, setShowModal] = useState(false);

  const sortAnswers = (answerArr, sort = 'helpfulness') => (
    answerArr.sort((a, b) => {
      if (sort === 'helpfulness' && b.helpfulness !== a.helpfulness) {
        return b.helpfulness - a.helpfulness;
      }
      return new Date(b.date) - new Date(a.date);
    }).slice(0, renderLimit)
  );

  const getAnswers = () => {
    requests.getAnswers(question.question_id, (data) => {
      setAnswers(data.results);
    });
  };

  // useEffect(() => {
  //   setAnswers(question.answers ? Object.values(question.answers) : []);
  // }, []);

  useEffect(() => {
    setSortedAnswers(sortAnswers(answers).slice(0, renderLimit));
  }, [answers, renderLimit]);

  const windowScroll = () => {
    const questionDiv = document.getElementById('question');
    const questionDivBottom = questionDiv.getBoundingClientRect().bottom;
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
    setRenderLimit(Math.min(renderLimit + 2, answers.length));
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

  const handleAddAnswer = () => {
    setShowModal(true);
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
          {' | '}
          <div className={local.addButtonContainer}>
            <button
              type="button"
              aria-label="Add Answer"
              tabIndex={0}
              className={darkMode ? local.reportDark : local.report}
              onClick={handleAddAnswer}
              onKeyPress={buildHandleEnterKeyPress(handleAddAnswer)}
            >
              Add Answer
            </button>
            {showModal && (
              <NewAnswer
                current={current}
                question={question}
                setShowModal={setShowModal}
                getAnswers={getAnswers}
                darkMode={darkMode}
              />
            )}
          </div>
        </div>
      </div>
      {(answers?.length || 0)
        ? (
          <AnswersList
            renderedAnswers={sortedAnswers.slice(0, renderLimit)}
            updateQuestions={updateQuestions}
            darkMode={darkMode}
          />
        )
        : <div className={local.noAnswers}>Currently No Answers To Display</div>}
      {renderLimit < answers.length && (
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
