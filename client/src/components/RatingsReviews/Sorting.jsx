import React from 'react';
import local from '../../styles/RatingsReviews/Sorting.css';

const Sorting = ({
  current, sort, setSort, filters, getReviews, query, setQuery, setOrder, darkMode,
}) => {
  const changeSort = () => {
    if (current.id) {
      setOrder(event.target.value);
      getReviews(event.target.value);
    }
  };

  const clearSort = () => setSort([0, 0, 0, 0, 0]);

  const updateQuery = () => setQuery(event.target.value);

  const clearQuery = () => {
    document.getElementById('searchQuery').value = '';
    setQuery('');
  };

  const displayfilters = () => {
    return !sort.includes(1) ? (
      <p className={local.starQuery}>
        <button className={local.hiddenButton} type="button" disabled>Clear Filters</button>
      </p>
    ) : (
      <p className={local.starQuery}>
        Currently Searching:
        {sort[0] ? ' 1' : null}
        {sort[1] ? ' 2' : null}
        {sort[2] ? ' 3' : null}
        {sort[3] ? ' 4' : null}
        {sort[4] ? ' 5' : null}
        {' Stars '}
        <button className={darkMode ? local.clearSortDark : local.clearSort} aria-label="Clear Sort" type="button" onClick={clearSort}>Clear Filters</button>
      </p>
    );
  };

  return (
    <h4 className={local.mainBody}>
      <div className={local.header}>
        <div>
          {`${filters.length} reviews, sorted by`}
          <select className={darkMode ? local.sortMethodDark : local.sortMethod} role="menu" aria-label="Sort Method" id="sortMethod" onChange={(changeSort)}>
            <option aria-label="Relevant" value="relevant">relevance</option>
            <option aria-label="Newest" value="newest">newest</option>
            <option aria-label="Helpful" value="helpful">helpful</option>
          </select>
        </div>
        <label htmlFor="searchQuery">
          {' Enter a search query '}
          <input
            id="searchQuery"
            className={darkMode ? local.queryInputDark : local.queryInput}
            aria-label="Search Query"
            placeholder="Narrow your search"
            value={query}
            onChange={updateQuery}
          />
        </label>
      </div>
      <div className={local.body}>
        {displayfilters()}
        <p className={local.wordQuery}>{query.length ? <button className={darkMode ? local.clearQueryDark : local.clearQuery} aria-label="Clear Query" type="button" onClick={clearQuery}>Clear Query</button> : null }</p>
      </div>
    </h4>
  );
};

export default Sorting;
