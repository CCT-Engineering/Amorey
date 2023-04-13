import React, { useState } from 'react';
import QuestionEntry from './QuestionEntry.jsx';
import local from '../../styles/QuestionsAnswers/QuestionsAnswers.css';

const QuestionsAnswers = ({
  current, questions, getQuestions, darkMode,
}) => {
  const [renderLimit, setRenderLimit] = useState(2);
  const [userQuestions, setUserQuestions] = useState(
    JSON.parse(localStorage.getItem('userQuestions')) || [],
  );
  let renderAmount = 0;

  const sortQuestions = (questionArr, sort = 'helpfulness') => (
    questionArr.sort((a, b) => {
      if (sort === 'helpfulness') {
        return b.question_helpfulness - a.question_helpfulness;
      }
      return new Date(b.question_date) - new Date(a.question_date);
    }).slice(0, renderLimit)
  );

  const sortedUserQuestions = sortQuestions(userQuestions, 'newest');
  const sortedQuestions = sortQuestions(questions, 'helpfulness');

  const windowScroll = () => {
    const QuestionList = document.getElementById('questions');
    window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
    QuestionList.scroll({ top: QuestionList.scrollHeight, behavior: 'smooth' });
  };

  const loadMoreQuestions = () => {
    setTimeout(() => { windowScroll(); }, 100);
    setRenderLimit(Math.min(renderLimit + 2, sortedQuestions.length));
  };

  return (
    <div id="questions" className={local.mainBody}>
      <h5 className={local.header}>QUESTIONS & ANSWERS</h5>
      {!((sortedUserQuestions?.length || 0) + (sortedQuestions?.length || 0))
        && <div>Currently No Questions To Display</div>}
      {sortedUserQuestions.map((questionItem) => (
        <QuestionEntry
          key={`Question${questionItem.question_id}`}
          question={questionItem}
          darkMode={darkMode}
        />
      ))}
      {sortedQuestions.map((questionItem) => (
        <QuestionEntry
          key={`Question${questionItem.question_id}`}
          question={questionItem}
          darkMode={darkMode}
        />
      ))}
      {renderLimit < sortedQuestions.length && (
        <button
          className={darkMode ? local.moreReviewsDark : local.moreReviews}
          aria-label="More Questions"
          type="button"
          onClick={loadMoreQuestions}
        >
          MORE QUESTIONS
        </button>
      )}
    </div>
  );
};

export default QuestionsAnswers;
