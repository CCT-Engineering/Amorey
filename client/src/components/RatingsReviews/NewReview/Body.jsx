import React from 'react';
import local from '../../../styles/RatingsReviews/NewReview/Body.css';

const Body = ({ letterCount, updateLetterCount }) => (
  <h6>
    <textarea
      className={local.inputField}
      placeholder="Why did you like the product or not?"
      rows="3"
      cols="50"
      minLength="50"
      maxLength="1000"
      onChange={() => updateLetterCount(event.target.value)}
      required
    />
    <div className={local.header}>
      Body:
      <p className={local.headerPrompt}>{letterCount > 0 ? `Minimum required characters left: [${letterCount}]` : 'Minimum reached'}</p>
    </div>
  </h6>
);

export default Body;
