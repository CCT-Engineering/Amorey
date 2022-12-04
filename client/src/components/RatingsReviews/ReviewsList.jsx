import React, {useState} from 'react';
import ReviewEntry from './ReviewEntry.jsx';
import WriteNewReview from './WriteNewReview.jsx';



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
    <div>
      {reviews ?
        reviews.map((review, index) => renderReviewEntries(review, index))
        : <div>No Reviews</div>}
      <button onClick={loadMoreEntries}>MORE REVIEWS</button>
      <button>ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewsList;