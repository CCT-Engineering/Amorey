import React, { useState } from 'react';
import { buildHandleEnterKeyPress } from '../../../util';
import local from '../../../styles/RatingsReviews/NewReview/Rating.css';

const Rating = ({ setRating }) => {
  const starText = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
  const [currentStar, setCurrentStar] = useState(0);

  const updateStars = (starCount) => {
    setRating(starCount);
    setCurrentStar(starCount);
  };

  return (
    <div className={local.main}>
      <h6 className={local.header}>
        Overall Rating
        {currentStar ? `:  "${starText[currentStar - 1]}"` : null}
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
        name="rating"
        value={3}
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
    </div>
  );
};

export default Rating;
