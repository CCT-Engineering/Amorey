import React from 'react';
import local from '../../styles/RatingsReviews/Sorting.css';

const Sorting = ({
  sort, newSort, reviews, changeSearch, query, setQuery,
}) => {
  const handleClick = (search) => {
    if (search) {
      changeSearch(event.target.value);
    } else {
      newSort([0, 0, 0, 0, 0]);
    }
  };

  const updateQuery = () => {
    setQuery(event.target.value);
  };

  const displayfilters = () => {
    if (!sort.includes(1)) {
      return null;
    }
    return (
      <p>
        Currently Searching:
        {sort[0] ? ' 1' : null}
        {sort[1] ? ' 2' : null}
        {sort[2] ? ' 3' : null}
        {sort[3] ? ' 4' : null}
        {sort[4] ? ' 5' : null}
        {' Stars'}
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
      <label htmlFor="searchQuery">
        {' Enter a search query'}
        <input name="searchQuery" placeholder="Narrow your search" onChange={updateQuery} />
      </label>
      <div>
        {displayfilters()}
        {query.length > 2 ? <p>{`Current search query: ${query}`}</p> : null}
      </div>
    </h4>
  );
};

export default Sorting;
