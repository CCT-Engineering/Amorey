import React from 'react';

const renderReviewGraph = (ratings, starCount) => {
  const totalStars = Object.keys(ratings).reduce((previous, key) => {
    return previous + Number(ratings[key])
  }, 0)
  return `${ratings[starCount]} out of ${totalStars}`;
};

const calculateRecommenedPercent = (recommend) => {
  const approve = Number(recommend.true);
  const reject = Number(recommend.false);
  return Math.floor(approve / (approve + reject) * 100);
};

const RatingBreakdown = ({ratings, recommend, stars}) => {

  return (
    <div>
      <h2>{(Math.round(stars * 4) / 4).toFixed(1)} *display {stars}*</h2>
      <span>{calculateRecommenedPercent(recommend)}% of reviews recommend this product</span>
      <div>5 stars {renderReviewGraph(ratings, 5)}</div>
      <div>4 stars {renderReviewGraph(ratings, 4)}</div>
      <div>3 stars {renderReviewGraph(ratings, 3)}</div>
      <div>2 stars {renderReviewGraph(ratings, 2)}</div>
      <div>1 stars {renderReviewGraph(ratings, 1)}</div>
    </div>
  );
};

export default RatingBreakdown;