import React from 'react';
import local from '../../styles/RatingsReviews/Sorting.css';

const Sorting = ({
  sort, newSort, reviews, changeSearch,
}) => {
  const handleClick = (search) => {
    if (search) {
      changeSearch(event.target.value);
    } else {
      newSort([1, 1, 1, 1, 1]);
    }
  };

  const displayfilters = () => {
    if (sort[0] && sort[1] && sort[2] && sort[3] && sort[4]) {
      return null;
    }
    return (
      <p>
        Currently Searching:  Stars
        <button type="button" onClick={() => handleClick(false)}>Clear Filters</button>
      </p>
    );
  };

  return (
    <h4 className={local.sortMain}>
      {`${reviews.length} reviews, sorted by`}
      <select className={local.sortMethod} id="sortMethod" onChange={(() => handleClick(true))}>
        <option value="relevant">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
      {displayfilters()}
    </h4>
  );
};

export default Sorting;
