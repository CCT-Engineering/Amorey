import React, { useState, forwardRef } from 'react';
import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import requests from '../../requests.js';
import local from '../../styles/RatingsReviews/Index.css';

const Index = forwardRef(({
  current, metadata, reviews, getReviews, stars,
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

  const updateReview = (review, helpful) => {
    if (helpful) {
      requests.putHelpful(review, () => {
        getReviews('newest');
        setSort([0, 0, 0, 0, 0]);
      });
    } else {
      requests.putReport(review, () => {
        getReviews('newest');
        setSort([0, 0, 0, 0, 0]);
      });
    }
  };

  return (
    <div ref={ref} className={local.ratingsReviews}>
      <h5 className={local.header}>RATINGS & REVIEWS</h5>
      <div className={local.ratingsReviewsMain}>
        <div className={local.ratings}>
          <div>
            <RatingBreakdown
              ratings={metadata.ratings}
              recommend={metadata.recommended}
              stars={stars}
              changeSearch={changeSearch}
              sort={sort}
            />
            <ProductBreakdown traits={metadata.characteristics} />
          </div>
        </div>
        <div className={local.reviews}>
          <div className={local.reviewMain}>
            <ReviewsList
              current={current}
              reviews={reviews}
              getReviews={getReviews}
              sort={sort}
              setSort={setSort}
              updateReview={updateReview}
              traits={metadata.characteristics}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Index;
