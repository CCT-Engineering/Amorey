import React, { useState } from 'react';
import Thumbnail from '../SharedComponents/Thumbnail.jsx';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/RatingsReviews/ReviewEntry.css';
import date from '../../util/formatDate.js';

const ReviewEntry = ({ review, updateReview, darkMode }) => {
  const unrated = !(localStorage.getItem(review.review_id) === 'true');
  const [expand, setExpand] = useState(false);
  const [canRateReview, setRateReview] = useState(unrated);

  const rateReview = (rating) => {
    if (rating === 'putReport') {
      localStorage.setItem(review.review_id, 'true');
      updateReview(review.review_id, rating);
    } else if (canRateReview) {
      localStorage.setItem(review.review_id, 'true');
      setRateReview(false);
      updateReview(review.review_id, rating);
    }
  };

  const expandBody = () => setExpand(!expand);

  const renderReviewBody = () => {
    return review.body.length < 250 || expand
      ? <p className={local.body}>{review.body}</p>
      : (
        <div>
          <p className={local.body}>{`${review.body.substring(0, 250)}...`}</p>
          <button
            type="button"
            aria-label="Expand Body"
            tabIndex={0}
            className={darkMode ? local.expandDark : local.expand}
            onClick={expandBody}
            onKeyPress={buildHandleEnterKeyPress(expandBody)}
          >
            Show more
          </button>
        </div>
      );
  };

  return (
    <div className={darkMode ? local.mainBodyDark : local.mainBody}>
      <div className={local.header}>
        <div className={local.rating}>
          <StarDisplay stars={review.rating} darkMode={darkMode} />
        </div>
        <div className={local.user}>{`${review.reviewer_name}, ${date(review.date)}`}</div>
      </div>
      <h4 className={local.summary}>{review.summary}</h4>
      {renderReviewBody()}
      {review.photos ? review.photos.map((photo, index) => (
        <Thumbnail photo={photo.url} key={`${review.review_id + index}`} />
      )) : null}
      <div>
        {review.recommend && <div className={local.recommend}>✓ I recommend this product</div>}
      </div>
      {review.response && (
        <div className={darkMode ? local.responseDark : local.response}>
          <div className={local.responseHeader}>Response:</div>
          <div>{review.response}</div>
        </div>
      )}
      <div className={local.footer}>
        Helpful?
        <button
          type="button"
          aria-label="Put Helpful"
          tabIndex={0}
          className={darkMode ? local.helpfulDark : local.helpful}
          style={{ color: canRateReview ? null : 'gold' }}
          onClick={() => rateReview('putHelpful')}
          onKeyPress={buildHandleEnterKeyPress(() => rateReview('putHelpful'))}
        >
          YES
        </button>
        {`(${review.helpfulness}) | `}
        <button
          type="button"
          aria-label="Put Report"
          tabIndex={0}
          className={darkMode ? local.reportDark : local.report}
          onClick={() => rateReview('putReport')}
          onKeyPress={buildHandleEnterKeyPress(() => rateReview('putReport'))}
        >
          Report
        </button>
      </div>
    </div>
  );
};

export default ReviewEntry;
