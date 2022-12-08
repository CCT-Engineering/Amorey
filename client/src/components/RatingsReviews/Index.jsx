import React, { useState, useEffect } from 'react';
import ReviewsList from './ReviewsList.jsx';
import Sorting from './Sorting.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import requests from '../../requests.js';
import local from '../../styles/RatingsReviews/Index.css';

const Index = ({
  currentId, metadata, stars, current,
}) => {
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState([1, 1, 1, 1, 1]);

  const renderReviews = (sortMethod = 'relevant') => {
    requests.getReviews(currentId, sortMethod, (data) => {
      setReviews(data.results);
    });
  };

  const filterSearch = (starCount) => {
    const temp = sort.slice();
    temp[starCount - 1] = !temp[starCount - 1];
    setSort(temp);
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

  useEffect(() => renderReviews(), []);

  return (
    <div className={local.ratingsReviews}>
      <h5 className={local.header}>RATINGS & REVIEWS</h5>
      <div className={local.ratingsReviewsMain}>
        <div className={local.ratings}>
          {metadata?.product_id && (
            <div>
              <RatingBreakdown
                ratings={metadata.ratings}
                recommend={metadata.recommended}
                stars={stars}
                filter={filterSearch}
                sort={sort}
              />
              <ProductBreakdown details={metadata.characteristics} />
            </div>
          )}
        </div>
        <div className={local.reviews}>
          {reviews.length && (
            <div className={local.reviewMain}>
              <Sorting reviews={reviews} changeSort={renderReviews} />
              <ReviewsList
                reviews={reviews}
                sort={sort}
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
};

export default Index;
