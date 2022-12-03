import React from 'react';
import ReviewsList from './ReviewsList.jsx';
import Sorting from './Sorting.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import requests from '../../requests.js';
import testData from '../../testData.jsx';

const Index = ({currentId, metadata}) => {
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    renderReviews();
  }, []);

  const renderReviews = () => {
    requests.getReviews(currentId, 'newest', (data) => {
      setReviews(data);
    });
  };

  return (
    <div style={{backgroundColor: 'BlanchedAlmond'}}>
      <h4>RATINGS & REVIEWS</h4>
      {metadata.product_id !== undefined ?
      <div>
        <div>
          <RatingBreakdown ratings={metadata.ratings} recommended={metadata.recommended}/>
        </div>
        <div>
          <ProductBreakdown characteristics={metadata.characteristics}/>
        </div>
        <div>
          <Sorting reviews={reviews}/>
        </div>
        <div>
          <ReviewsList reviews={reviews}/>
        </div>
      </div>
      : <div></div>}
    </div>
  );
};

export default Index;