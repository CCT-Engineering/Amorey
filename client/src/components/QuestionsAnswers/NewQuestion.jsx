import React, { useState } from 'react';
import requests from '../../requests.js';
import global from '../../styles/global.css';
import local from '../../styles/QuestionsAnswers/NewQuestion.css';

const NewQuestion = ({
  current, getReviews, setShowModal, darkMode,
}) => {
  const QUESTION_MIN = 50;
  const QUESTION_MAX = 1000;
  const NAME_MIN = 1;
  const NAME_MAX = 60;
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [questionLetterCount, setQuestionLetterCount] = useState(0);
  const [nameLetterCount, setNameLetterCount] = useState(0);

  const handleQuestionChange = (value) => {
    setQuestionLetterCount(value.length);
    setQuestion(value);
  };

  const handleNameChange = (value) => {
    setNameLetterCount(value.length);
    setName(value);
  };

  const collectFormData = (e) => {
    e.preventDefault();
    if (rating) {
      const newReview = {
        product_id: current.id,
        summary,
        name,
        photos,
      };
      console.log(newReview);
      showModal(false);
      requests.postReview(newReview, () => {
        getReviews('newest');
      });
    } else {
      alert('Please enter a rating for the current product');
    }
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
        <form id="newQuestion" onSubmit={collectFormData}>
          <div className={global.modalLogo} aria-label="Form Logo" role="img" alt="AMOREY" />
          <h3 className={local.title}>
            {'Ask Your Question About: '}
            <div className={darkMode ? local.productDark : local.product}>{current.name}</div>
          </h3>
          <h6>
            <div className={local.header}>
              Your Question:&nbsp;&nbsp;
              {getCharCountMsg(questionLetterCount, QUESTION_MIN)}
            </div>
          </h6>
          <textarea
            aria-label="Question Input"
            className={local.inputField}
            placeholder="What is your question?"
            rows="3"
            cols="50"
            minLength={QUESTION_MIN}
            maxLength={QUESTION_MAX}
            onChange={(e) => handleQuestionChange(e.target.value)}
            required
          />
          <h6>
            <div className={local.header}>
              Your Nickname:&nbsp;&nbsp;
              {getCharCountMsg(nameLetterCount, NAME_MIN)}
            </div>
          </h6>
          <input
            aria-label="Nickname Input"
            placeholder="Example: Jackson11!"
            size="30"
            minLength={NAME_MIN}
            maxLength={NAME_MAX}
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />
          <p>
            For privacy reasons, do not use your full name or email address
          </p>
          <h6>
            <div className={local.header}>
              Your Email Address:
            </div>
          </h6>
          <input
            aria-label="Email Input"
            type="email"
            placeholder="jackson11@email.com"
            size="30"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p>
            For authentication only. You will not be emailed.
          </p>
          <div>
            <button className={local.submit} aria-label="Submit Question" type="submit">Submit Question!</button>
            <button className={local.cancel} aria-label="Cancel Question" type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewQuestion;
