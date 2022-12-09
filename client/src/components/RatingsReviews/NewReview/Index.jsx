import React, { useState } from 'react';
import StarRating from './StarRating.jsx';
import Characteristic from './Characteristic.jsx';
import local from '../../../styles/RatingsReviews/NewReview/Index.css';

const WriteNewReview = ({ current, details }) => {
  const [letterCount, setLetterCount] = useState(50);

  const updateLetterCount = (input) => {
    setLetterCount(50 - input.length);
  };

  const numberOfPhotots = () => {
    if (event.target.files.length > 5) {
      document.getElementById('uploadPhoto').value = [];
      alert('Maximum of 5 photo uploads is allowed');
    }
  };

  return (
    <div className={local.modal}>
      <div className={local.reviewForm}>
        <form id="newReview" className="form">
          <h2>Write Your Review</h2>
          <h4>{`About the ${current}`}</h4>
          <StarRating />
          <h6>Do You recommend this product?</h6>
          <label htmlFor="recYes">
            Yes
            <input type="radio" name="recommend" id="recYes" required />
          </label>
          <label htmlFor="recNo">
            No
            <input type="radio" name="recommend" id="recNo" />
          </label>
          {details && (
            Object.keys(details).map((detail, index) => {
              return <Characteristic detail={detail} key={`${detail + index}`} />;
            })
          )}
          <h6>
            <input placeholder="Example: Best purchase ever!" />
            {' Summary (Optional)'}
          </h6>
          <h6>
            <input placeholder="Why did you like the product or not?" minLength="50" maxLength="1000" onChange={() => updateLetterCount(event.target.value)} required />
            {' Body'}
          </h6>
          <p>{letterCount > 0 ? `Minimum required characters left: [${letterCount}]` : 'Minimum reached'}</p>
          <h6>
            <input placeholder="Example: Jackson11!" maxLength="60" required />
            {' Username'}
          </h6>
          <p>For privacy reasons, do not use your full name or email address</p>
          <h6>
            <input type="email" placeholder="jackson11@email.com" maxLength="60" required />
            {' Email Address'}
          </h6>
          <p>For authentication reasons, you will not be emailed</p>
          <label htmlFor="uploadPhoto">
            Upload Images (Optional)
            <input id="uploadPhoto" type="file" name="uploadPhoto" accept="image/*" onChange={numberOfPhotots} multiple />
          </label>
          <button type="submit">Submit Review!</button>
        </form>
      </div>
    </div>
  );
};

export default WriteNewReview;
