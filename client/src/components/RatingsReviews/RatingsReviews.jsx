import React, { useState, forwardRef } from 'react';
import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import requests from '../../requests.js';
import local from '../../styles/RatingsReviews/RatingsReviews.css';

const RatingsReviews = forwardRef(({
  current, metadata, reviews, getReviews, stars, setOrder, darkMode,
}, ref) => {
  const [sort, setSort] = useState([0, 0, 0, 0, 0]);
  const changeSearch = (star) => {
    const starSorting = sort.slice();
    starSorting[star - 1] = Number(!starSorting[star - 1]);
    if (!starSorting.includes(0)) {
      setSort([0, 0, 0, 0, 0]);
    } else {
      setSort(starSorting);
    }
  };

  const updateReview = (review, rating) => {
    requests[rating](review, () => {
      getReviews();
    });
  };

  return (
    <>
      <h5 className={local.header}>RATINGS & REVIEWS</h5>
      <div ref={ref} className={local.mainBody}>
        <div className={local.ratings}>
          <RatingBreakdown
            ratings={metadata.ratings}
            recommend={metadata.recommended}
            stars={stars}
            changeSearch={changeSearch}
            sort={sort}
            darkMode={darkMode}
          />
          <ProductBreakdown traits={metadata.characteristics} darkMode={darkMode} />
        </div>
        <div className={local.reviews}>
          <ReviewsList
            current={current}
            reviews={reviews}
            getReviews={getReviews}
            sort={sort}
            setSort={setSort}
            updateReview={updateReview}
            traits={metadata.characteristics}
            setOrder={setOrder}
            darkMode={darkMode}
          />
        </div>
      </div>
    </>
  );
});

export default RatingsReviews;
