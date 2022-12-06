import React from 'react';
import local from '../../styles/RatingsReviews/Sorting.css';

const Sorting = ({ reviews, changeSort }) => {
  const handleClick = () => {
    changeSort(event.target.value);
  };

  return (
    <div>
      <h4 className={local.sortMain}>
        {reviews.length}
        <span className={local.sortText}>reviews, sorted by</span>
        <select className={local.sortMethod} id="sortMethod" onChange={handleClick}>
          <option value="relevant">relevance</option>
          <option value="newest">newest</option>
          <option value="helpful">helpful</option>
        </select>
      </h4>
    </div>
  );
};

export default Sorting;
