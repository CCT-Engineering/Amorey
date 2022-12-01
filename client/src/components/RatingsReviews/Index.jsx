import React from 'react';
import WriteNewReview from './WriteNewReview.jsx';
import ReviewsList from './ReviewsList.jsx';
import Sorting from './Sorting.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const Index = () => {

  return (
    <div>
      <h4>RATINGS & REVIEWS</h4>
      <div><RatingBreakdown/></div>
      <div><ProductBreakdown/></div>
      <div><Sorting/></div>
      <div><ReviewsList/></div>
      <div><WriteNewReview/></div>
    </div>
  );
};

export default Index;