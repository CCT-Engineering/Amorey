import React, { useState } from 'react';
import requests from '../../requests.js';
import local from '../../styles/QuestionsAnswers/QuestionsAnswers.css';

const QuestionsAnswers = ({
  current, questions, getQuestions, darkMode
}) => {
  const [renderLimit, setRenderLimit] = useState(5);
  const [userQuestions, setUserQuestions] = useState(
    JSON.parse(localStorage.getItem('userQuestions')) || [],
  );

  const filterQuestions = (sort = 'helpfulness') => {
    questions.sort((a, b) => {
      if (sort === 'helpfulness') {
        return b.question_helpfulness - a.question_helpfulness;
      }
      return new Date(b.question_date) - new Date(a.question_date);
    }).slice(0, renderLimit);
  };

  console.log('filteredQuestions:', filterQuestions());

  return (
    <>
      <h5 className={local.header}>QUESTIONS & ANSWERS</h5>
      <div className={local.mainBody}>
        {'hello'}
      </div>
    </>
  );
};

export default QuestionsAnswers;
