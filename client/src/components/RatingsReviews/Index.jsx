import React, {useState, useEffect} from 'react';
import ReviewsList from './ReviewsList.jsx';
import Sorting from './Sorting.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import requests from '../../requests.js';

const Index = ({currentId, metadata}) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => renderReviews(), []);

  const renderReviews = (sortMethod = 'relevance') => {
    requests.getReviews(currentId, sortMethod, (data) => {
      setReviews(data.results);
    });
  };

  return (
    <div style={{backgroundColor: 'BlanchedAlmond'}}>
      <h4>RATINGS & REVIEWS</h4>
      {metadata.product_id ?
        <div>
          <RatingBreakdown ratings={metadata.ratings} recommended={metadata.recommended}/>
          <ProductBreakdown characteristics={metadata.characteristics}/>
        </div>
        : <div>No Product Metadata available</div>}
      {reviews.length ?
        <div>
          <Sorting reviews={reviews}/>
          <ReviewsList reviews={reviews}/>
        </div>
        : <div>No Review Data available</div>}
    </div>
  );
};

export default Index;