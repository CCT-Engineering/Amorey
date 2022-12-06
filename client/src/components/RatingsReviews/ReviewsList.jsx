import React, { useState } from 'react';
import ReviewEntry from './ReviewEntry.jsx';
// import WriteNewReview from './WriteNewReview.jsx';
import local from '../../styles/RatingsReviews/ReviewList.css';

const ReviewsList = ({ reviews, sort, update }) => {
  const [renderLimit, setRenderLimit] = useState(2);
  let renderAmount = 0;

  const loadMoreEntries = () => {
    event.preventDefault();
    if (renderLimit + 2 <= reviews.length) {
      setRenderLimit(renderLimit + 2);
    } else if (renderLimit < reviews.length) {
      setRenderLimit(reviews.length);
    } else {
      console.log('Showing All Reviews');
    }
  };

  const renderReviewEntries = (review, index) => {
    if (renderAmount < renderLimit) {
      if (sort[review.rating - 1]) {
        renderAmount += 1;
        return <ReviewEntry review={review} key={index} update={update} />;
      }
    }
    return null;
  };

  return (
    <div>
      {reviews && reviews.map((review, index) => renderReviewEntries(review, index))}
      <button className={local.loadReviews} type="button" onClick={loadMoreEntries}>MORE REVIEWS</button>
      <button className={local.addReview} type="button">ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewsList;
