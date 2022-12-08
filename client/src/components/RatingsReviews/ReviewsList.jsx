import React, { useState } from 'react';
import ReviewEntry from './ReviewEntry.jsx';
import WriteNewReview from './WriteNewReview.jsx';
import local from '../../styles/RatingsReviews/ReviewList.css';

const ReviewsList = ({ reviews, sort, update }) => {
  const [renderLimit, setRenderLimit] = useState(2);
  const [modal, showModal] = useState(false);

  let renderAmount = 0;

  const handleClick = () => {
    showModal(!modal);
  };

  const loadMoreEntries = () => {
    event.preventDefault();
    if (renderLimit + 2 <= reviews.length) {
      setRenderLimit(renderLimit + 2);
    } else if (renderLimit < reviews.length) {
      setRenderLimit(reviews.length);
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
      {modal && <WriteNewReview />}
      <div className={local.reviewList}>
        {reviews && reviews.map((review, index) => renderReviewEntries(review, index))}
        {!reviews.length && <div>Be the first to review this product!</div>}
      </div>
      {reviews.length > 2 && renderAmount < reviews.length && (
        <button className={local.moreReviews} type="button" onClick={loadMoreEntries}>MORE REVIEWS</button>)}
      <button className={local.addReview} type="button" onClick={handleClick}>ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewsList;
