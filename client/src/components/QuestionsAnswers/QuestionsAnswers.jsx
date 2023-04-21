import React, { useState, useEffect } from 'react';
import QuestionsList from './QuestionsList.jsx';
import NewQuestion from './NewQuestion.jsx';
import requests from '../../requests.js';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/QuestionsAnswers/QuestionsAnswers.css';

const QuestionsAnswers = ({
  current, questions, getQuestions, darkMode,
}) => {
  const [renderLimit, setRenderLimit] = useState(2);
  const [userQuestions] = useState(
    JSON.parse(localStorage.getItem('userQuestions')) || [],
  );
  const [sortedQuestions, setSortedQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  console.log('userQuestions:', userQuestions);

  const sortQuestions = (questionArr, sort = 'helpfulness') => (
    questionArr.sort((a, b) => {
      if (sort === 'helpfulness') {
        return b.question_helpfulness - a.question_helpfulness;
      }
      return new Date(b.question_date) - new Date(a.question_date);
    })
  );

  useEffect(() => {
    setSortedQuestions(sortQuestions(questions).slice(0, renderLimit));
  }, [questions, renderLimit]);

  useEffect(() => { setRenderLimit(2); }, [current]);

  const sortedUserQuestions = sortQuestions(userQuestions, 'newest');

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
      {((sortedUserQuestions?.length || 0) + (sortedQuestions?.length || 0))
        ? (
          <QuestionsList
            renderedQuestions={[...sortedUserQuestions, ...sortedQuestions.slice(0, renderLimit)]}
            updateQuestions={updateQuestions}
            darkMode={darkMode}
          />
        )
        : <div>Currently No Questions To Display</div>}
      {renderLimit < (questions.length - userQuestions.length) && (
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
