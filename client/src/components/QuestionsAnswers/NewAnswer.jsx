import React, { useState } from 'react';
import requests from '../../requests.js';
import global from '../../styles/global.css';
import local from '../../styles/QuestionsAnswers/NewAnswer.css';

const NewAnswer = ({
  current, question, setShowModal, getAnswers, darkMode,
}) => {
  const ANSWER_MIN = 10;
  const ANSWER_MAX = 1000;
  const NAME_MIN = 1;
  const NAME_MAX = 60;
  const [answer, setAnswer] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answerLetterCount, setAnswerLetterCount] = useState(0);
  const [nameLetterCount, setNameLetterCount] = useState(0);

  const handleAnswerChange = (value) => {
    setAnswerLetterCount(value.length);
    setAnswer(value);
  };

  const handleNameChange = (value) => {
    setNameLetterCount(value.length);
    setName(value);
  };

  const collectFormData = (e) => {
    e.preventDefault();
    const newAnswer = {
      product_id: current.id,
      body: answer,
      email,
      name,
    };
    setShowModal(false);
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    const userAnswer = { [answer + name]: new Date().toISOString() };
    localStorage.setItem('userAnswers', JSON.stringify({ ...userAnswers, ...userAnswer }));
    requests.postAnswer(newAnswer, question.question_id, () => {
      getAnswers();
    });
  };

  const getCharCountMsg = (letterCount, min) => {
    let message = '';
    if (letterCount < min) {
      message = `Minimum required characters left: [${min - letterCount}]`;
    }
    return (
      <span className={local.minChars}>{message}</span>
    );
  };

  return (
    <div className={global.modalBackground}>
      <div className={darkMode ? global.modalBodyDark : global.modalBody}>
        <form id="newAnswer" onSubmit={collectFormData}>
          <div className={global.modalLogo} aria-label="Form Logo" role="img" alt="AMOREY" />
          <h3 className={local.title}>Submit your Answer</h3>
          <h3 className={darkMode ? local.subtitleDark : local.subtitle}>
            <span>
              {`${current.name}: `}
              <span style={{ fontStyle: 'italic' }}>{question.question_body}</span>
            </span>
          </h3>
          <h6>
            <div className={local.header}>
              Your Answer:&nbsp;&nbsp;
              {getCharCountMsg(answerLetterCount, ANSWER_MIN)}
            </div>
          </h6>
          <textarea
            aria-label="Answer Input"
            className={local.inputField}
            placeholder="What is your answer?"
            rows="3"
            cols="50"
            minLength={ANSWER_MIN}
            maxLength={ANSWER_MAX}
            onChange={(e) => handleAnswerChange(e.target.value)}
            required
          />
          <h6>
            <div className={local.header}>
              Your Nickname:&nbsp;&nbsp;
              {getCharCountMsg(nameLetterCount, NAME_MIN)}
            </div>
          </h6>
          <input
            className={local.input}
            aria-label="Nickname Input"
            placeholder="Example: Jackson11!"
            size="30"
            minLength={NAME_MIN}
            maxLength={NAME_MAX}
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />
          <p className={local.note}>
            For privacy reasons, do not use your full name or email address
          </p>
          <h6>
            <div className={local.header}>
              Your Email Address:
            </div>
          </h6>
          <input
            className={local.input}
            aria-label="Email Input"
            type="email"
            placeholder="jackson11@email.com"
            size="30"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className={local.note}>
            For authentication only. You will not be emailed.
          </p>
          <div className={local.buttons}>
            <button className={local.submit} aria-label="Submit Answer" type="submit">Submit Answer!</button>
            <button className={local.cancel} aria-label="Cancel Answer" type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAnswer;
