import React from 'react';

const renderReviewGraph = (starCount) => {
  return starCount;
};

const calculateAverageStars = (ratings) => {
  let totalStars = 0
  let ratingsCount = 0;

  for (const key in ratings) {
    totalStars += key * ratings[key];
    ratingsCount += Number(ratings[key]);
  }
  const average = totalStars / ratingsCount;
  //formula for star chart filled in to nearest quarter star
  // Math.round(average * 4) / 4).toFixed(2)
  return (Math.round(average * 4) / 4).toFixed(1);
};

const calculateRecommenedPercent = (recommend) => {
  const approve = Number(recommend.true);
  const reject = Number(recommend.false);
  return Math.floor(approve / (approve + reject) * 100);
};

const RatingBreakdown = ({ratings, recommend, stars}) => {

  return (
    <div>
      <h2>{calculateAverageStars(ratings)} *display {stars}*</h2>
      <span>{calculateRecommenedPercent(recommend)}% of reviews recommend this product</span>
      <div>5 stars {renderReviewGraph(ratings[5])}</div>
      <div>4 stars {renderReviewGraph(ratings[4])}</div>
      <div>3 stars {renderReviewGraph(ratings[3])}</div>
      <div>2 stars {renderReviewGraph(ratings[2])}</div>
      <div>1 stars {renderReviewGraph(ratings[1])}</div>
    </div>
  );
};

export default RatingBreakdown;