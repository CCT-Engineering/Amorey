import React from 'react';
import local from '../../../styles/RatingsReviews/NewReview/Body.css';

const Body = ({ letterCount, updateLetterCount }) => (
  <>
    <h6>
      <input
        placeholder="Why did you like the product or not?"
        minLength="50"
        maxLength="1000"
        onChange={() => updateLetterCount(event.target.value)}
        required
      />
      {' Body'}
    </h6>
    <p className={local.bodyPrompt}>{letterCount > 0 ? `Minimum required characters left: [${letterCount}]` : 'Minimum reached'}</p>
  </>
);

export default Body;
