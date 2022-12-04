import React from 'react';

const formatDate = (date) => {
  const year = date.substring(0,4);
  const month = date.substring(5,7);
  const day = date[8] === '0' ? date.substring(9,10) : date.substring(8,10);
  if (month === '01') {
    return `January ${day}, ${year}`;
  } else if (month === '02') {
    return `Feburary ${day}, ${year}`;
  } else if (month === '03') {
    return `March ${day}, ${year}`;
  } else if (month === '04') {
    return `April ${day}, ${year}`;
  } else if (month === '05') {
    return `May ${day}, ${year}`;
  } else if (month === '06') {
    return `June ${day}, ${year}`;
  } else if (month === '07') {
    return `July ${day}, ${year}`;
  } else if (month === '08') {
    return `August ${day}, ${year}`;
  } else if (month === '09') {
    return `September ${day}, ${year}`;
  } else if (month === '10') {
    return `October ${day}, ${year}`;
  } else if (month === '11') {
    return `November ${day}, ${year}`;
  } else {
    return `December ${day}, ${year}`;
  }
};

const ReviewEntry = ({review}) => {

  return (
    <div style={{backgroundColor: 'lightblue'}}>
      <div>
        <a>{review.rating} ★★★★★</a>
        <a>{review.reviewer_name}, {formatDate(review.date)}</a>
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