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
      return <p className={local.starQuery} />;
    }
    return (
      <p className={local.starQuery}>
        Currently Searching:
        {sort[0] ? ' 1' : null}
        {sort[1] ? ' 2' : null}
        {sort[2] ? ' 3' : null}
        {sort[3] ? ' 4' : null}
        {sort[4] ? ' 5' : null}
        {' Stars '}
        <button className={local.clearButton} type="button" onClick={() => handleClick(false)}>Clear Filters</button>
      </p>
    );
  };

  return (
    <h4 className={local.sortMain}>
      <div className={local.sortHeader}>
        <div className={local.queryInput}>
          {`${reviews.length} reviews, sorted by`}
          <select className={local.sortMethod} id="sortMethod" onChange={(() => handleClick(true))}>
            <option value="relevant">relevance</option>
            <option value="newest">newest</option>
            <option value="helpful">helpful</option>
          </select>
          {displayfilters()}
        </div>
        <label htmlFor="searchQuery">
          {' Enter a search query '}
          <input name="searchQuery" placeholder="Narrow your search" onChange={updateQuery} />
          <div className={local.searchFilters}>
            {query.length > 2
              ? (
                <p className={local.wordQuery}>
                  {`Current search query: ${query.length < 20
                    ? query
                    : (`${query.substring(0, 20)}...`)}`}
                </p>
              )
              : null}
          </div>
        </label>
      </div>
    </h4>
  );
};

export default Sorting;
