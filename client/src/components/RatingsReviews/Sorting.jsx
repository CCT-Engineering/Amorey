import React from 'react';

const Sorting = ({reviews, changeSort}) => {

  const handleClick = () => {
    changeSort(event.target.value);
  };

  return (
    <div>
      <h4>{reviews.length} reviews, sorted by
        <select id='sortMethod' onChange={handleClick}>
          <option value='relevant'>relevance</option>
          <option value='newest'>newest</option>
          <option value='helpful'>helpful</option>
        </select>
      </h4>
    </div>
  );
};

export default Sorting;