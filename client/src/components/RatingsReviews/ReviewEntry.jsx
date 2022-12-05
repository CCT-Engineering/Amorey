import React from 'react';
import local from '../../styles/RatingsReviews.css';

const formatDate = (date) => {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date[8] === '0' ? date.substring(9, 10) : date.substring(8, 10);
  let string = '';
  if (month === '01') {
    string = `January ${day}, ${year}`;
  } else if (month === '02') {
    string = `Feburary ${day}, ${year}`;
  } else if (month === '03') {
    string = `March ${day}, ${year}`;
  } else if (month === '04') {
    string = `April ${day}, ${year}`;
  } else if (month === '05') {
    string = `May ${day}, ${year}`;
  } else if (month === '06') {
    string = `June ${day}, ${year}`;
  } else if (month === '07') {
    string = `July ${day}, ${year}`;
  } else if (month === '08') {
    string = `August ${day}, ${year}`;
  } else if (month === '09') {
    string = `September ${day}, ${year}`;
  } else if (month === '10') {
    string = `October ${day}, ${year}`;
  } else if (month === '11') {
    string = `November ${day}, ${year}`;
  } else {
    string = `December ${day}, ${year}`;
  }
  return string;
};

const ReviewEntry = ({ review }) => {
  const handleClick = () => {
    event.preventDefault();
    console.log('hi Jake');
  };

  return (
    <div className={local.reviewEntry}>
      <div className={local.reviewHeader}>
        <span className={local.reviewRating}>
          {review.rating}
          ★★★★★
        </span>
        <span className={local.reviewUser}>
          {review.reviewer_name}
          ,
          {formatDate(review.date)}
        </span>
      </div>
      <h4 className={local.reviewSummary}>{review.summary}</h4>
      <p className={local.reviewBody}>{review.body}</p>
      <div className={local.reviewRecommend}>
        {review.recommend && '✓ I recommend this product'}
      </div>
      <div className={local.reviewRecommend}>
        {review.response && 'Response:\n' + review.response}
      </div>
      <div className={local.reviewOptions}>
        Helpful?
        <a className={local.reviewHelpful} onClick={handleClick}>YES</a>
        ({review.helpfulness})  |
        <a className={local.reviewReport} onClick={handleClick}>Report</a>
      </div>
    </div>
  );
};

export default ReviewEntry;
