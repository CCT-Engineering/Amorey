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

  return (
    <div className={local.main}>
      <div className={local.header}>
        <div className={local.rating}>{`${review.rating}★★★★★`}</div>
        <div className={local.user}>{`${review.reviewer_name}, ${date(review.date)}`}</div>
      </div>
      <h4 className={local.summary}>{review.summary}</h4>
      {review.body.length < 250 || expand
        ? <p className={local.body}>{review.body}</p>
        : (
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
        )}
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
