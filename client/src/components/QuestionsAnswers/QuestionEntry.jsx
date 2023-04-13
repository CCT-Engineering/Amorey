import React, { useState } from 'react';
import local from '../../styles/QuestionsAnswers/QuestionEntry.css';

const QuestionEntry = ({ question, darkMode }) => {
  const [renderLimit, setRenderLimit] = useState(2);

  const sortAnswers = (answerArr, sort = 'helpfulness') => (
    Object.values(answerArr).sort((a, b) => {
      if (sort === 'helpfulness') {
        return b.helpfulness - a.helpfulness;
      }
      return new Date(b.date) - new Date(a.date);
    }).slice(0, renderLimit)
  );

  const sortedAnswers = sortAnswers(question.answers, 'helpfulness');

  const windowScroll = () => {
    const AnswerList = document.getElementById('answers');
    window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
    AnswerList.scroll({ top: AnswerList.scrollHeight, behavior: 'smooth' });
  };

  const loadMoreQuestions = () => {
    setTimeout(() => { windowScroll(); }, 100);
    setRenderLimit(Math.min(renderLimit + 2, sortedAnswers.length));
  };

  return (
    <div id="answers" className={darkMode ? local.mainBodyDark : local.mainBody}>
      <div className={local.header}>
        <h4 className={local.summary}>{`Q: ${question.question_body}`}</h4>
      </div>
    </div>
  );
};

export default QuestionEntry;
