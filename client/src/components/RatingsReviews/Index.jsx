import React, {useState, useEffect} from 'react';
import ReviewsList from './ReviewsList.jsx';
import Sorting from './Sorting.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import requests from '../../requests.js';

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
    <div style={{backgroundColor: 'BlanchedAlmond'}}>
      <h4>RATINGS & REVIEWS</h4>
      {metadata.product_id ?
        <div>
          <RatingBreakdown ratings={metadata.ratings} recommend={metadata.recommended} stars={stars}/>
          <ProductBreakdown details={metadata.characteristics}/>
        </div>
        : <div>No Product Metadata available</div>}
      {reviews.length ?
        <div>
          <Sorting reviews={reviews} changeSort={renderReviews}/>
          <ReviewsList reviews={reviews} sort={sort}/>
        </div>
        : <div>No Review Data available</div>}
    </div>
  );
};

export default Index;