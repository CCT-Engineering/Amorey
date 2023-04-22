import React, { useState, useEffect } from 'react';
import QuestionsList from './QuestionsList.jsx';
import NewQuestion from './NewQuestion.jsx';
import requests from '../../requests.js';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/QuestionsAnswers/QuestionsAnswers.css';

function areDatesWithinRange(dateString1, dateString2, range) {
  // range is the maximum time in secs between dateString1 and dateString2
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  const timestamp1 = date1.getTime();
  const timestamp2 = date2.getTime();

  const difference = Math.abs(timestamp1 - timestamp2);

  return difference <= range * 1000;
}

const QuestionsAnswers = ({
  current, questions, getQuestions, darkMode,
}) => {
  const [renderLimit, setRenderLimit] = useState(2);
  const [userQuestions] = useState(
    JSON.parse(localStorage.getItem('userQuestions')) || {},
  );
  const [sortedQuestions, setSortedQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  console.log('userQuestions:', userQuestions);
  console.log('sortedQuestions:', sortedQuestions);

  const sortQuestions = (questionArr, sort = 'helpfulness') => (
    questionArr.sort((a, b) => {
      const aUserDate = userQuestions[a.question_body + a.asker_name];
      const bUserDate = userQuestions[b.question_body + b.asker_name];
      if (aUserDate && !bUserDate && areDatesWithinRange(aUserDate, a.question_date, 87000)) {
        return -1;
      }
      if (bUserDate && !aUserDate && areDatesWithinRange(bUserDate, b.question_date, 87000)) {
        return 1;
      }
      if (sort === 'helpfulness' && b.question_helpfulness !== a.question_helpfulness) {
        return b.question_helpfulness - a.question_helpfulness;
      }
      return new Date(b.question_date) - new Date(a.question_date);
    })
  );

  useEffect(() => {
    setSortedQuestions(sortQuestions(questions).slice(0, renderLimit));
  }, [questions, renderLimit]);

  useEffect(() => { setRenderLimit(2); }, [current]);

  const windowScroll = () => {
    const questionsDiv = document.getElementById('questions');
    const questionsDivBottom = questionsDiv.getBoundingClientRect().bottom;
    const scrollAmount = questionsDivBottom - window.innerHeight;

    if (scrollAmount > 0) {
      window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const loadMoreQuestions = () => {
    setTimeout(() => windowScroll(), 100);
    setRenderLimit(Math.min(renderLimit + 2, questions.length));
  };

  const updateQuestions = (review, rating) => {
    requests[rating](review, () => getQuestions());
  };

  const handleAddQuestion = () => {
    setShowModal(true);
  };

  return (
    <div id="questions" className={local.mainBody}>
      <h5 className={local.header}>QUESTIONS & ANSWERS</h5>
      {(sortedQuestions?.length || 0)
        ? (
          <QuestionsList
            current={current}
            renderedQuestions={sortedQuestions.slice(0, renderLimit)}
            updateQuestions={updateQuestions}
            darkMode={darkMode}
          />
        )
        : <div>Currently No Questions To Display</div>}
      {renderLimit < questions.length && (
        <button
          className={darkMode ? local.buttonDark : local.button}
          aria-label="More Questions"
          type="button"
          onClick={loadMoreQuestions}
        >
          MORE QUESTIONS
        </button>
      )}
      <div className={local.addButtonContainer}>
        <button
          className={darkMode ? local.buttonDark : local.button}
          aria-label="Add Question"
          type="button"
          onClick={handleAddQuestion}
          onKeyPress={buildHandleEnterKeyPress(handleAddQuestion)}
        >
          ADD A QUESTION +
        </button>
        {showModal && (
          <NewQuestion
            current={current}
            setShowModal={setShowModal}
            getQuestions={getQuestions}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionsAnswers;
