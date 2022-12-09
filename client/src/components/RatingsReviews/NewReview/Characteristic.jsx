import React, { useState } from 'react';
import characteristic from '../../../util/characteristics.js';

const Characteristic = ({ detail, index, update }) => {
  const [rating, setRating] = useState(0);

  const updateRating = (value) => {
    setRating(value);
    update(detail, value);
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
        <input type="radio" name={detail} value={1} onClick={() => updateRating(1)} required />
      </label>
      <label htmlFor={detail}>
        2
        <input type="radio" name={detail} value={2} onClick={() => updateRating(2)} />
      </label>
      <label htmlFor={detail}>
        3
        <input type="radio" name={detail} value={3} onClick={() => updateRating(3)} />
      </label>
      <label htmlFor={detail}>
        4
        <input type="radio" name={detail} value={4} onClick={() => updateRating(4)} />
      </label>
      <label htmlFor={detail}>
        5
        <input type="radio" name={detail} value={5} onClick={() => updateRating(5)} />
      </label>
    </div>
  );
};

export default Characteristic;
