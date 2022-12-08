import React, { useState } from 'react';
import { buildHandleEnterKeyPress } from '../../../util';
// import global from '../../../styles/global.css';

const StarRating = () => {
  const starText = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
  const [currentStarText, setCurrentStarText] = useState('');

  return (
    <>
      <h6 className="rating">
        Overall Rating
        {currentStarText ? `:  "${currentStarText}"` : null}
      </h6>
      <a
        role="button"
        tabIndex={0}
        className="star1"
        onClick={() => setCurrentStarText(starText[0])}
        onKeyPress={buildHandleEnterKeyPress(() => setCurrentStarText(starText[0]))}
        required
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star2"
        onClick={() => setCurrentStarText(starText[1])}
        onKeyPress={buildHandleEnterKeyPress(() => setCurrentStarText(starText[1]))}
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star3"
        onClick={() => setCurrentStarText(starText[2])}
        onKeyPress={buildHandleEnterKeyPress(() => setCurrentStarText(starText[2]))}
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star4"
        onClick={() => setCurrentStarText(starText[3])}
        onKeyPress={buildHandleEnterKeyPress(() => setCurrentStarText(starText[3]))}
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star5"
        onClick={() => setCurrentStarText(starText[4])}
        onKeyPress={buildHandleEnterKeyPress(() => setCurrentStarText(starText[4]))}
      >
        ★
      </a>
    </>
  );
};

export default StarRating;
