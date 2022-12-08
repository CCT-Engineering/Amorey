import React, { useState } from 'react';
import characteristic from '../../../util/characteristics.js';

const Characteristic = ({ detail, index }) => {
  const [rating, setRating] = useState(0);

  const updateRating = (value) => {
    setRating(value);
  };

  return (
    <div>
      <h6 key={index}>
        {`${detail}*`}
        {rating
          ? `:  "${characteristic[`${detail}`](rating)}"`
          : null }
      </h6>
      <label htmlFor={detail}>1</label>
      <input type="radio" name={`${detail}`} onClick={() => updateRating(1)} />
      <label htmlFor={detail}>2</label>
      <input type="radio" name={`${detail}`} onClick={() => updateRating(2)} />
      <label htmlFor={detail}>3</label>
      <input type="radio" name={`${detail}`} onClick={() => updateRating(3)} />
      <label htmlFor={detail}>4</label>
      <input type="radio" name={`${detail}`} onClick={() => updateRating(4)} />
      <label htmlFor={detail}>5</label>
      <input type="radio" name={`${detail}`} onClick={() => updateRating(5)} />
    </div>
  );
};

export default Characteristic;
