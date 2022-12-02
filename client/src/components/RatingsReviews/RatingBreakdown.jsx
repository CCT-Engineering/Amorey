import React from 'react';

const renderReviewGraph = () => {
  return "*Display Bar Output*";
};

const determineAverage = (ratings) => {
  let totalStars = 0
  let ratingsCount = 0;

  for (const key in ratings) {
    totalStars += key * ratings[key];
    ratingsCount += ratings[key];
  }
  return totalStars / ratingsCount;
};

const RatingBreakdown = ({ratings, recommended}) => {

  return (
    <div>
      <h2>{determineAverage(ratings)} ★★★★★</h2>
      <span>{recommended[0] * 10}% of reviews recommend this product</span>
      <div>5 stars {renderReviewGraph(ratings[5])}</div>
      <div>4 stars {renderReviewGraph(ratings[4])}</div>
      <div>3 stars {renderReviewGraph(ratings[3])}</div>
      <div>2 stars {renderReviewGraph(ratings[2])}</div>
      <div>1 stars {renderReviewGraph(ratings[1])}</div>
    </div>
  );
};

export default RatingBreakdown;