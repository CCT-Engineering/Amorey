import React from 'react';
import local from '../../styles/RatingsReviews.css';

const handleClick = (index) => {
  event.preventDefault();
  // console.log('here: ', index);
};

const reviewGraph = (ratings, starCount) => {
  const totalStars = Object.keys(ratings).reduce((total, key) => {
    return total + Number(ratings[key]);
  }, 0);
  const percent = (ratings[starCount] / totalStars).toFixed(2) * 100;

  return (
    <div className={local.barDimensions}>
      <div className={local.barProgress} style={{ width: `${percent}%` }} />
    </div>
  );
};

const recommenedPercent = (recommend) => {
  const approve = Number(recommend.true);
  const reject = Number(recommend.false);
  return Math.floor((approve / (approve + reject)) * 100);
};

const RatingBreakdown = ({ ratings, recommend, stars }) => {
  return (
    <div className={local.ratingMain}>
      <h1>
        <span className={local.starCount}>
          {(Math.round(stars * 4) / 4).toFixed(1)}
        </span>
        <span className={local.starDisplay}>
          *display
          {stars}
          *
        </span>
      </h1>
      <div className={local.ratingPercent}>
        {recommenedPercent(recommend)}
        % of reviews recommend this product
      </div>
      <div className={local.starTable}>
        <div className={local.graph}>
          5
          <p className={local.graphText}> Stars</p>
          {reviewGraph(ratings, 5)}
        </div>
        <div className={local.graph}>
          4
          <p className={local.graphText}> Stars</p>
          {reviewGraph(ratings, 4)}
        </div>
        <div className={local.graph}>
          3
          <p className={local.graphText}> Stars</p>
          {reviewGraph(ratings, 3)}
        </div>
        <div className={local.graph}>
          2
          <p className={local.graphText}> Stars</p>
          {reviewGraph(ratings, 2)}
        </div>
        <div className={local.graph}>
          1
          <p className={local.graphText}> Stars</p>
          {reviewGraph(ratings, 1)}
        </div>
      </div>
    </div>
  );
};

export default RatingBreakdown;
