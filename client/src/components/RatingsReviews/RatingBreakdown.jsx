import React from 'react';

const reviewGraph = (ratings, starCount) => {
  const totalStars = Object.keys(ratings).reduce((total, key) => {
    return total + Number(ratings[key])
  }, 0)
  return `${ratings[starCount]} out of ${totalStars}`;
};

const recommenedPercent = (recommend) => {
  const approve = Number(recommend.true);
  const reject = Number(recommend.false);
  return Math.floor(approve / (approve + reject) * 100);
};

const handleClick = (index) => {
  event.preventDefault();
  console.log('here: ', index)
}
const RatingBreakdown = ({ratings, recommend, stars, setSort}) => {

  return (
    <div style={{backgroundColor: 'lightgreen'}}>
      <h2>{(Math.round(stars * 4) / 4).toFixed(1)} *display {stars}*</h2>
      <span>
        {recommenedPercent(recommend)}% of reviews recommend this product
      </span>
      <div>
        5 stars <a onClick={() => handleClick(4)}>{reviewGraph(ratings, 5)}</a>
      </div>
      <div>
        4 stars <a onClick={() => handleClick(3)}>{reviewGraph(ratings, 4)}</a>
      </div>
      <div>
        3 stars <a onClick={() => handleClick(2)}>{reviewGraph(ratings, 3)}</a>
      </div>
      <div>
        2 stars <a onClick={() => handleClick(1)}>{reviewGraph(ratings, 2)}</a>
      </div>
      <div>
        1 stars <a onClick={() => handleClick(0)}>{reviewGraph(ratings, 1)}</a>
      </div>
    </div>
  );
};

export default RatingBreakdown;