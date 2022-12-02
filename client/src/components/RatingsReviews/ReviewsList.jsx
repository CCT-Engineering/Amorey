import React from 'react';
import WriteNewReview from './WriteNewReview.jsx';

const ReviewsList = ({reviews}) => {
  console.log(reviews);
  return (
    <div>test
      <div>{reviews}</div>
      <button>MORE REVIEWS</button>
      <button>ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewsList;