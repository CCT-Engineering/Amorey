import React, { useState } from 'react';
// import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import Characteristic from './Characteristic.jsx';
import local from '../../../styles/RatingsReviews/WriteNewReview.css';

const WriteNewReview = ({ current, details }) => {
  const starText = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
  const [currentStarText, setCurrentStarText] = useState('');
  const [letterCount, setLetterCount] = useState(50);

  const updateLetterCount = (input) => {
    setLetterCount(50 - input.length);
  };

  return (
    <div className={local.modal}>
      <div className={local.reviewForm}>
        <form id="newReview" className="form">
          <h2>Write Your Review</h2>
          <h4>{`About the ${current}`}</h4>
          <h6 className="rating">{`Overall Rating *"  ${currentStarText}"`}</h6>
          <a onClick={() => setCurrentStarText(starText[0])}>★</a>
          <a onClick={() => setCurrentStarText(starText[1])}>★</a>
          <a onClick={() => setCurrentStarText(starText[2])}>★</a>
          <a onClick={() => setCurrentStarText(starText[3])}>★</a>
          <a onClick={() => setCurrentStarText(starText[4])}>★</a>
          <h6>
            <label htmlFor="radioYes">Yes</label>
            <input type="radio" name="recommend" id="radioYes" checked="checked" />
            <label htmlFor="radioNo">No</label>
            <input type="radio" name="recommend" id="radioNo" />
            Do You recommend this product?
          </h6>
          {details && Object.keys(details).map((detail, index) => <Characteristic detail={detail} index={index} />)}
          <h6>
            <input placeholder="Example: Best purchase ever!" />
            {' Summary'}
          </h6>
          <h6>
            <input placeholder="Why did you like the product or not?" minLength="50" maxLength="1000" onChange={() => updateLetterCount(event.target.value)} required />
            {' Body*'}
          </h6>
          <p>{letterCount > 0 ? `Minimum required characters left: [${letterCount}]` : 'Minimum reached'}</p>
          <h6>
            <input placeholder="Example: Jackson11!" maxLength="60" required />
            {' Username*'}
          </h6>
          <p>For privacy reasons, do not use your full name or email address</p>
          <h6>
            <input type="email" placeholder="jackson11@email.com" maxLength="60" required />
            {' Email Address*'}
          </h6>
          <p>For authentication reasons, you will not be emailed</p>
          <button type="button">Upload Images</button>
          <button type="submit">Submit Review!</button>
        </form>
      </div>
    </div>
  );
};

export default WriteNewReview;
