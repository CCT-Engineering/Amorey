import React from 'react';

const Sorting = ({reviews}) => {

  return (
    <div>
      <h4>{reviews.length} reviews, sorted by
        <select>
          <option>relevance</option>
          <option>newest</option>
          <option>helpful</option>
        </select>
      </h4>
    </div>
  );
};

export default Sorting;