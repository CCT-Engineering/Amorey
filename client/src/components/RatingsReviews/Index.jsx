import React from 'react';
import ReviewsList from './ReviewsList.jsx';
import Sorting from './Sorting.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import testData from '../../testData.jsx';

const Index = () => {
  const [meta, setMeta] = React.useState(testData.metaData);
  const [reviews, setReviews] = React.useState(testData.reviewData);

  return (
    <div style={{backgroundColor: 'BlanchedAlmond'}}>
      <h4>RATINGS & REVIEWS</h4>
      <div><RatingBreakdown ratings={meta.ratings} recommended={meta.recommended}/></div>
      <div><ProductBreakdown characteristics={meta.characteristics}/></div>
      <div><Sorting reviews={reviews[0].results}/></div>
      <div><ReviewsList reviews={reviews[0].results}/></div>
    </div>
  );
};

export default Index;