import React from 'react';
import local from '../../../styles/RatingsReviews/Image/Index.css';

const WriteNewReview = ({ url, close }) => {
  return (
    <div className={local.modal}>
      <button type="button" onClick={() => close(false)}>X</button>
      <img src={url} alt="JakeDaGawd" />
    </div>
  );
};

export default WriteNewReview;
