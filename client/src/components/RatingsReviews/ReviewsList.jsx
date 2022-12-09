import React, { useState, useEffect } from 'react';
import Sorting from './Sorting.jsx';
import ReviewEntry from './ReviewEntry.jsx';
import NewReview from './NewReview/Index.jsx';
import local from '../../styles/RatingsReviews/ReviewList.css';

const ReviewsList = ({
  reviews, sort, changeSort, update, current, details,
}) => {
  const [renderLimit, setRenderLimit] = useState(2);
  const [filtered, setFiltered] = useState([]);
  const [modal, showModal] = useState(false);
  let renderAmount = 0;

  const generateFilter = (temp = []) => {
    reviews.forEach((review) => {
      if (sort[review.rating - 1]) {
        temp.push(review);
      }
    });
    setFiltered(temp);
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
      renderAmount += 1;
      return <ReviewEntry review={review} key={index} update={update} />;
    }
    return null;
  };

  useEffect(() => generateFilter(), [sort]);

  return (
    <div>
      <Sorting reviews={filtered} changeSort={changeSort} />
      <div className={local.reviewList}>
        {filtered && filtered.map((review, index) => renderReviewEntries(review, index))}
        {!filtered.length && <div>Currently No Reviews To Display</div>}
      </div>
      {filtered.length > 2 && renderAmount < filtered.length && (
        <button className={local.moreReviews} type="button" onClick={loadMoreEntries}>MORE REVIEWS</button>)}
      <button className={local.addReview} type="button" onClick={() => showModal(!modal)}>ADD A REVIEW +</button>
      {modal && <NewReview current={current} details={details} />}
    </div>
  );
};

export default ReviewsList;
