import React from 'react';
import local from '../../styles/RatingsReviews.css';

const reviewGraph = (ratings, starCount) => {
  const totalStars = Object.keys(ratings).reduce((total, key) => {
    return total + Number(ratings[key]);
  }, 0);
  return `${ratings[starCount]} out of ${totalStars}`;
};

const recommenedPercent = (recommend) => {
  const approve = Number(recommend.true);
  const reject = Number(recommend.false);
  return Math.floor((approve / (approve + reject)) * 100);
};

const handleClick = (index) => {
  event.preventDefault();
  // console.log('here: ', index);
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
      <div className={local.starChart}>
        <span className={local.starListing}>
          5 stars
        </span>
        <a className={local.starGraph} onClick={() => handleClick(4)}>
        {reviewGraph(ratings, 5)}</a>
      </div>
      <div className={local.starChart}>
        <span className={local.starListing}>4 stars</span>
        <a className={local.starGraph} onClick={() => handleClick(3)}>
        {reviewGraph(ratings, 4)}</a>
      </div>
      <div className={local.starChart}>
        <span className={local.starListing}>3 stars</span>
        <a className={local.starGraph} onClick={() => handleClick(2)}>
        {reviewGraph(ratings, 3)}</a>
      </div>
      <div className={local.starChart}>
        <span className={local.starListing}>2 stars</span>
        <a className={local.starGraph} onClick={() => handleClick(1)}>
        {reviewGraph(ratings, 2)}</a>
      </div>
      <div className={local.starChart}>
        <span className={local.starListing}>1 stars</span>
        <a className={local.starGraph} onClick={() => handleClick(0)}>
        {reviewGraph(ratings, 1)}</a>
      </div>
    </div>
  );
};

export default RatingBreakdown;
