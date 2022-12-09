import React, { useState } from 'react';
import { buildHandleEnterKeyPress } from '../../../util';

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
        style={{ color: currentStar > 0 ? 'gold' : null }}
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
        style={{ color: currentStar > 1 ? 'gold' : null }}
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star3"
        onClick={() => updateStars(3)}
        onKeyPress={buildHandleEnterKeyPress(() => updateStars(3))}
        style={{ color: currentStar > 2 ? 'gold' : null }}
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star4"
        onClick={() => updateStars(4)}
        onKeyPress={buildHandleEnterKeyPress(() => updateStars(4))}
        style={{ color: currentStar > 3 ? 'gold' : null }}
      >
        ★
      </a>
      <a
        role="button"
        tabIndex={0}
        className="star5"
        onClick={() => updateStars(5)}
        onKeyPress={buildHandleEnterKeyPress(() => updateStars(5))}
        style={{ color: currentStar > 4 ? 'gold' : null }}
      >
        ★
      </a>
    </>
  );
};

export default StarRating;