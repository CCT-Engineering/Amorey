import React, { useState } from 'react';
import { buildHandleEnterKeyPress } from '../../../util';
// import global from '../../../styles/global.css';

const StarRating = () => {
  const starText = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
  const [currentStar, setCurrentStar] = useState(0);
  const [currentStarText, setCurrentStarText] = useState('');

  const updateStars = (starCount) => {
    setCurrentStar(starCount);
    setCurrentStarText(starText[starCount - 1]);
  };

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
        onClick={() => updateStars(1)}
        onKeyPress={buildHandleEnterKeyPress(() => updateStars(1))}
        style={{ backgroundColor: currentStar > 0 ? 'red' : null }}
        required
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star2"
        onClick={() => updateStars(2)}
        onKeyPress={buildHandleEnterKeyPress(() => updateStars(2))}
        style={{ backgroundColor: currentStar > 1 ? 'red' : null }}
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star3"
        onClick={() => updateStars(3)}
        onKeyPress={buildHandleEnterKeyPress(() => updateStars(3))}
        style={{ backgroundColor: currentStar > 2 ? 'red' : null }}
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star4"
        onClick={() => updateStars(4)}
        onKeyPress={buildHandleEnterKeyPress(() => updateStars(4))}
        style={{ backgroundColor: currentStar > 3 ? 'red' : null }}
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star5"
        onClick={() => updateStars(5)}
        onKeyPress={buildHandleEnterKeyPress(() => updateStars(5))}
        style={{ backgroundColor: currentStar > 4 ? 'red' : null }}
      >
        ★
      </a>
    </>
  );
};

export default StarRating;
