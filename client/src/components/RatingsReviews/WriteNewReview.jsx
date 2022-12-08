import React from 'react';
import local from '../../styles/RatingsReviews/WriteNewReview.css';

const WriteNewReview = () => {
  return (
    <div className={local.modal}>
      <div className={local.reviewForm}>
        Test
        <form>
          <input />
          <input />
          <input />
          <input />
          <input />
          <button type="submit">Submit Review!</button>
        </form>
      </div>
    </div>
  );
};

export default WriteNewReview;
