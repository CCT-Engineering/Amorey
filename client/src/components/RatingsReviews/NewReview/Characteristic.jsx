import React, { useState } from 'react';
import characteristic from '../../../util/characteristics.js';
import local from '../../../styles/RatingsReviews/NewReview/Characteristic.css';

const Characteristic = ({ trait, index, update }) => {
  const [rating, setRating] = useState(0);

  const updateRating = (value) => {
    setRating(value);
    update(trait, value);
  };

  return (
    <div className={local.main} key={index}>
      <h6 className={local.header}>
        {`${trait}`}
        {rating
          ? `:  "${characteristic[trait][rating]}"`
          : null }
      </h6>
      <label className={local.rating} htmlFor={trait}>
        1
        <input type="radio" name={trait} onClick={() => updateRating(1)} required />
      </label>
      <label className={local.rating} htmlFor={trait}>
        2
        <input type="radio" name={trait} onClick={() => updateRating(2)} />
      </label>
      <label className={local.rating} htmlFor={trait}>
        3
        <input type="radio" name={trait} onClick={() => updateRating(3)} />
      </label>
      <label className={local.rating} htmlFor={trait}>
        4
        <input type="radio" name={trait} onClick={() => updateRating(4)} />
      </label>
      <label className={local.rating} htmlFor={trait}>
        5
        <input type="radio" name={trait} onClick={() => updateRating(5)} />
      </label>
    </div>
  );
};

export default Characteristic;
