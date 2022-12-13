import React, { useState } from 'react';
import Thumbnail from '../SharedComponents/Thumbnail.jsx';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/RatingsReviews/ReviewEntry.css';
import date from '../../util/formatDate.js';

const ReviewEntry = ({ review, updateReview }) => {
  const unrated = !(localStorage.getItem(review.review_id) === 'true');
  const [expand, setExpand] = useState(false);
  const [canRateReview, setRateReview] = useState(unrated);

  const rateReview = (rating) => {
    if (canRateReview || rating === 'putReport') {
      localStorage.setItem(review.review_id, 'true');
      setRateReview(false);
      updateReview(review.review_id, rating);
    }
  };

  const expandBody = () => setExpand(!expand);

  const renderReviewBody = () => {
    return review.body.length < 250 || expand
      ? <p id="test" className={local.body}>{review.body}</p>
      : (
        <div>
          <p id="test" className={local.body}>{`${review.body.substring(0, 250)}...`}</p>
          <a
            role="button"
            aria-label="Expand Body"
            tabIndex={0}
            className={local.expand}
            onClick={expandBody}
            onKeyPress={buildHandleEnterKeyPress(expandBody)}
          >
            Show more
          </a>
        </div>
      );
  };

  return (
    <div className={local.mainBody}>
      <div className={local.header}>
        <div className={local.rating}><StarDisplay stars={review.rating} /></div>
        <div className={local.user}>{`${review.reviewer_name}, ${date(review.date)}`}</div>
      </div>
      <h4 className={local.summary}>{review.summary}</h4>
      {renderReviewBody()}
      <div>
        {review.recommend && <div className={local.recommend}>✓ I recommend this product</div>}
      </div>
      {review.response && (
        <div className={local.response}>
          <div className={local.responseHeader}>Response:</div>
          <div>{review.response}</div>
        </div>
      )}
      {review.photos ? review.photos.map((photo, index) => (
        <Thumbnail photo={photo.url} key={`${photo.url + index}`} />
      )) : null}
      <div className={local.footer}>
        Helpful?
        <a
          role="button"
          aria-label="Put Helpful"
          tabIndex={0}
          className={local.helpful}
          style={{ color: canRateReview ? null : 'gold' }}
          onClick={() => rateReview('putHelpful')}
          onKeyPress={buildHandleEnterKeyPress(() => rateReview('putHelpful'))}
        >
          YES
        </a>
        {`(${review.helpfulness}) | `}
        <a
          role="button"
          aria-label="Put Report"
          tabIndex={0}
          className={local.report}
          onClick={() => rateReview('putReport')}
          onKeyPress={buildHandleEnterKeyPress(() => rateReview('putReport'))}
        >
          Report
        </a>
      </div>
    </div>
  );
};

export default ReviewEntry;
