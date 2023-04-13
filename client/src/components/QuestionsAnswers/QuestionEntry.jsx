import React, { useState, useEffect } from 'react';
import local from '../../styles/QuestionsAnswers/QuestionEntry.css';

const QuestionEntry = ({ question, darkMode }) => {
  const [renderLimit, setRenderLimit] = useState(2);
  const [sortedAnswer, setSortedAnswers] = useState([]);

  const sortAnswers = (answerArr, sort = 'helpfulness') => (
    Object.values(answerArr).sort((a, b) => {
      if (sort === 'helpfulness') {
        return b.helpfulness - a.helpfulness;
      }
      return new Date(b.date) - new Date(a.date);
    }).slice(0, renderLimit)
  );

  const sortedAnswers = sortAnswers(question.answers, 'helpfulness');

  useEffect(() => {
    console.log('renderLimit:', renderLimit);
    setSortedAnswers(sortAnswers(question.answers).slice(0, renderLimit));
  }, [question.answers, renderLimit]);

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
    setRenderLimit(Math.min(renderLimit + 2, question.answers.length));
  };

  return (
    <div id="question" className={darkMode ? local.mainBodyDark : local.mainBody}>
      <div className={local.header}>
        <h4 className={local.summary}>{`Q: ${question.question_body}`}</h4>
      </div>
    </div>
  );
};

export default QuestionEntry;
