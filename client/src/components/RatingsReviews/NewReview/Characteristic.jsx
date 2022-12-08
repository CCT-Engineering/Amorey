import React, { useState } from 'react';
import characteristic from '../../../util/characteristics.js';

const Characteristic = ({ detail, index }) => {
  const [rating, setRating] = useState(0);

  const updateRating = (value) => {
    setRating(value);
  };

  return (
    <div key={index}>
      <h6>
        {`${detail}`}
        {rating
          ? `:  "${characteristic[detail][rating]}"`
          : null }
      </h6>
      <label htmlFor={detail}>
        1
        <input type="radio" name={detail} onClick={() => updateRating(1)} required />
      </label>
      <label htmlFor={detail}>
        2
        <input type="radio" name={detail} onClick={() => updateRating(2)} />
      </label>
      <label htmlFor={detail}>
        3
        <input type="radio" name={detail} onClick={() => updateRating(3)} />
      </label>
      <label htmlFor={detail}>
        4
        <input type="radio" name={detail} onClick={() => updateRating(4)} />
      </label>
      <label htmlFor={detail}>
        5
        <input type="radio" name={detail} onClick={() => updateRating(5)} />
      </label>
    </div>
  );
};

export default Characteristic;
