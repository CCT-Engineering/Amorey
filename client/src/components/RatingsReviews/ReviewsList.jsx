import React, {useState} from 'react';
import ReviewEntry from './ReviewEntry.jsx';
import WriteNewReview from './WriteNewReview.jsx';
import local from '../../styles/RatingsReviews.css';

const ReviewsList = ({reviews, sort}) => {
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
        renderAmount++;
        return <ReviewEntry review={review} key={index}/>;
      }
    }
  };

  return (
    <div className={local.reviewList}>
      {reviews ?
        reviews.map((review, index) => renderReviewEntries(review, index))
        : <div>No Reviews</div>}
      <button className={local.reviewButton1} onClick={loadMoreEntries}>MORE REVIEWS</button>
      <button className={local.reviewButton2}>ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewsList;