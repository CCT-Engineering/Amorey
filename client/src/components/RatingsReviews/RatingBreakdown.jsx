import React from 'react';
import local from '../../styles/RatingsReviews/RatingBreakdown.css';

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
    <div className={local.graphDimensions}>
      <div className={local.graphDisplay} style={{ width: `${percent}%` }} />
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
      <h1 className={local.starHeader}>
        <div className={local.starRating}>
          {(Math.round(stars * 4) / 4).toFixed(1)}
        </div>
        <div className={local.starDimensions}>
          <div className={local.starDisplay} style={{ width: `${stars * 20}%` }}></div>
        </div>
      </h1>
      <div className={local.recommend}>
        {recommenedPercent(recommend)}
        % of reviews recommend this product
      </div>
      {/* <div className={local.starTable}> */}
        <div className={local.graph}>
          <p className={local.graphText}>5 Stars</p>
          {reviewGraph(ratings, 5)}
        </div>
        <div className={local.graph}>
          <p className={local.graphText}>4 Stars</p>
          {reviewGraph(ratings, 4)}
        </div>
        <div className={local.graph}>
          <p className={local.graphText}>3 Stars</p>
          {reviewGraph(ratings, 3)}
        </div>
        <div className={local.graph}>
          <p className={local.graphText}>2 Stars</p>
          {reviewGraph(ratings, 2)}
        </div>
        <div className={local.graph}>
          <p className={local.graphText}>1 Stars</p>
          {reviewGraph(ratings, 1)}
        {/* </div> */}
      </div>
    </div>
  );
};

export default RatingBreakdown;
