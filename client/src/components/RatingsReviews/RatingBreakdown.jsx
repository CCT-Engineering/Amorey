import React from 'react';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/RatingsReviews/RatingBreakdown.css';

const RatingBreakdown = ({
  ratings, recommend, stars, filter, sort,
}) => {
  const handleClick = (index) => {
    event.preventDefault();
    filter(index);
  };
  const reviewGraph = (starCount) => {
    const totalStars = Object.keys(ratings).reduce((total, key) => {
      return total + Number(ratings[key]);
    }, 0);
    const percent = (ratings[starCount] / totalStars).toFixed(2) * 100;

    return (
      <div
        role="button"
        tabIndex={0}
        className={local.graphDimensions}
        onClick={() => handleClick(starCount, sort)}
        onKeyPress={buildHandleEnterKeyPress(handleClick)}
      >
        <div
          className={local.graphDisplay}
          style={{ width: `${percent}%`, border: sort[starCount - 1] ? 'solid 1px gold' : '' }}
        />
      </div>
    );
  };

  const recommenedPercent = () => {
    const approve = Number(recommend.true);
    const reject = Number(recommend.false);
    return Math.floor((approve / (approve + reject)) * 100);
  };

  return (
    <div className={local.ratingMain}>
      <h1 className={local.starHeader}>
        <div className={local.starRating}>
          {stars && (Math.round(stars * 4) / 4).toFixed(1)}
        </div>
        <StarDisplay stars={stars} />
      </h1>
      <div className={local.recommend}>
        {recommend && recommenedPercent()}
        % of reviews recommend this product
      </div>
      <div className={local.graph}>
        <p className={local.graphText}>5 Stars</p>
        {ratings && reviewGraph(5)}
      </div>
      <div className={local.graph}>
        <p className={local.graphText}>4 Stars</p>
        {ratings && reviewGraph(4)}
      </div>
      <div className={local.graph}>
        <p className={local.graphText}>3 Stars</p>
        {ratings && reviewGraph(3)}
      </div>
      <div className={local.graph}>
        <p className={local.graphText}>2 Stars</p>
        {ratings && reviewGraph(2)}
      </div>
      <div className={local.graph}>
        <p className={local.graphText}>1 Stars</p>
        {ratings && reviewGraph(1)}
      </div>
    </div>
  );
};

export default RatingBreakdown;
