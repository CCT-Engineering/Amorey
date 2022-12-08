import React, { useState } from 'react';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/RatingsReviews/ReviewEntry.css';
import date from '../../util/formatDate.js';

const ReviewEntry = ({ review, update }) => {
  const [expand, setExpand] = useState(false);
  const handleClick = (helpful) => {
    event.preventDefault();
    update(review.review_id, helpful);
  };

  const handleExpand = () => {
    event.preventDefault();
    setExpand(true);
  };

  const renderReviewBody = () => {
    let body;
    if (review.body.length < 250 || expand) {
      body = <p className={local.body}>{review.body}</p>;
    } else {
      body = (
        <div>
          <p className={local.body}>{`${review.body.substring(0, 250)}...`}</p>
          <a
            role="button"
            tabIndex={0}
            className={local.expand}
            onClick={handleExpand}
            onKeyPress={buildHandleEnterKeyPress(handleExpand)}
          >
            Show more
          </a>
        </div>
      );
    }
    return body;
  };

  const renderReviewStars = () => {
    let stars = '';
    while (stars.length < review.rating) {
      stars += '★';
    }
    return stars;
  };

  return (
    <div className={local.main}>
      <div className={local.header}>
        <div className={local.rating}>{renderReviewStars()}</div>
        <div className={local.user}>{`${review.reviewer_name}, ${date(review.date)}`}</div>
      </div>
      <h4 className={local.summary}>{review.summary}</h4>
      {renderReviewBody()}
      <div>
        {review.recommend && '✓ I recommend this product'}
      </div>
      <div className={local.response}>
        {review.response && (
          <div>
            Response:
            <div>{review.response}</div>
          </div>
        )}
      </div>
      {review.photos?.map((image, index) => <img key={index} src={image.url} alt={index} height="48px" width="48px" />)}
      <div className={local.footer}>
        Helpful?
        <a
          role="button"
          tabIndex={0}
          className={local.helpful}
          onClick={() => handleClick(true)}
          onKeyPress={buildHandleEnterKeyPress(() => handleClick(true))}
        >
          YES
        </a>
        {`(${review.helpfulness}) | `}
        <a
          role="button"
          tabIndex={0}
          className={local.report}
          onClick={() => handleClick(false)}
          onKeyPress={buildHandleEnterKeyPress(() => handleClick(false))}
        >
          Report
        </a>
      </div>
    </div>
  );
};

export default ReviewEntry;
