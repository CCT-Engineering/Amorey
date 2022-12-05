import React, {useState, useEffect} from 'react';
import ReviewsList from './ReviewsList.jsx';
import Sorting from './Sorting.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import requests from '../../requests.js';
import local from '../../styles/RatingsReviews.css';

const Index = ({currentId, metadata, stars}) => {
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState([1, 1, 1, 1, 1]);
  useEffect(() => renderReviews(), []);

  const renderReviews = (sortMethod = 'relevant') => {
    requests.getReviews(currentId, sortMethod, (data) => {
      setReviews(data.results);
    });
  };

  return (
    <div className={local.ratingsReviews}>
      <h5 className={local.header}>RATINGS & REVIEWS</h5>
      <div className={local.ratingsReviewsMain}>
        <div className={local.ratings}>{metadata.product_id
          ? <div>
              <RatingBreakdown ratings={metadata.ratings} recommend={metadata.recommended} stars={stars} sort={setSort}/>
              <ProductBreakdown details={metadata.characteristics}/>
            </div>
          : <div>No Product Metadata available</div>}
        </div>
        <div className={local.reviews}>
          {reviews.length ?
            <div className={local.reviewMain}>
              <Sorting reviews={reviews} changeSort={renderReviews}/>
              <ReviewsList reviews={reviews} sort={sort}/>
            </div>
            : <div>No Review Data available</div>}
        </div>
      </div>
    </div>
  );
};

export default Index;