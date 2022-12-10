import React, { useState, useEffect, forwardRef } from 'react';
import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import requests from '../../requests.js';
import local from '../../styles/RatingsReviews/Index.css';

const Index = forwardRef(({ current, metadata, stars }, ref) => {
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState([0, 0, 0, 0, 0]);

  const renderReviews = (sortMethod = 'relevant') => {
    requests.getReviews(current.id, sortMethod, (data) => {
      setReviews(data.results);
      setSort([0, 0, 0, 0, 0]);
    });
  };

  const changeSearch = (star) => {
    const starSorting = sort.slice();
    starSorting[star - 1] = !starSorting[star - 1];
    if (starSorting[0] && starSorting[1] && starSorting[2] && starSorting[3] && starSorting[4]) {
      setSort([0, 0, 0, 0, 0]);
    } else {
      setSort(starSorting);
    }
  };

  const updateReview = (review, helpful) => {
    if (helpful) {
      requests.putHelpful(review, () => {
        renderReviews();
      });
    } else {
      requests.putReport(review, () => {
        renderReviews();
      });
    }
  };

  useEffect(() => renderReviews(), [metadata]);

  return (
    <div ref={ref} className={local.ratingsReviews}>
      <h5 className={local.header}>RATINGS & REVIEWS</h5>
      <div className={local.ratingsReviewsMain}>
        <div className={local.ratings}>
          {metadata?.product_id && (
            <div>
              <RatingBreakdown
                ratings={metadata.ratings}
                recommend={metadata.recommended}
                stars={stars}
                filter={changeSearch}
                sort={sort}
              />
              <ProductBreakdown details={metadata.characteristics} />
            </div>
          )}
        </div>
        <div className={local.reviews}>
          {reviews.length && (
            <div className={local.reviewMain}>
              <ReviewsList
                reviews={reviews}
                renderReviews={renderReviews}
                sort={sort}
                newSort={setSort}
                changeSearch={renderReviews}
                update={updateReview}
                current={current}
                details={metadata.characteristics}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Index;
