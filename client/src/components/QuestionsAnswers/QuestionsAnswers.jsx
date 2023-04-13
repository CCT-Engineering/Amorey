import React, { useState } from 'react';
import requests from '../../requests.js';
import local from '../../styles/QuestionsAnswers/QuestionsAnswers.css';

const QuestionsAnswers = ({
  current, questions, getQuestions, darkMode
}) => {
  const hello = 'hi';

  return (
    <>
      <h5 className={local.header}>QUESTIONS & ANSWERS</h5>
      <div className={local.mainBody}>
        {hello}
      </div>
    </>
  );
};

export default QuestionsAnswers;
