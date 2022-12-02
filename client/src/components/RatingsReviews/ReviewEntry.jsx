import React from 'react';

const ReviewEntry = ({review}) => {

  return (
    <div>
      <div>
        {review.rating} ★★★★★
        {review.reviewer_name},
        {review.date} *FORMAT*
      </div>
      <h4>{review.summary}</h4>
      <div>{review.body}</div>
      <div>{review.recommend && '✓ I recommend this product'}</div>
      <div>{review.response && 'Response:\n' + review.response}</div>
      <div>Helpful? YES ({review.helpfulness}) | <a>Report</a></div>
      <div>-------------------------------------------------------------------</div>
    </div>
  );
};

export default ReviewEntry;