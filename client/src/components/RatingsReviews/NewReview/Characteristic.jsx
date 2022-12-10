import React, { useState } from 'react';
import characteristic from '../../../util/characteristics.js';

const Characteristic = ({ trait, index, update }) => {
  const [rating, setRating] = useState(0);

  const updateRating = (value) => {
    setRating(value);
    update(trait, value);
  };

  return (
    <div key={index}>
      <h6>
        {`${trait}`}
        {rating
          ? `:  "${characteristic[trait][rating]}"`
          : null }
      </h6>
      <label htmlFor={trait}>
        1
        <input type="radio" name={trait} onClick={() => updateRating(1)} required />
      </label>
      <label htmlFor={trait}>
        2
        <input type="radio" name={trait} onClick={() => updateRating(2)} />
      </label>
      <label htmlFor={trait}>
        3
        <input type="radio" name={trait} onClick={() => updateRating(3)} />
      </label>
      <label htmlFor={trait}>
        4
        <input type="radio" name={trait} onClick={() => updateRating(4)} />
      </label>
      <label htmlFor={trait}>
        5
        <input type="radio" name={trait} onClick={() => updateRating(5)} />
      </label>
    </div>
  );
};

export default Characteristic;
