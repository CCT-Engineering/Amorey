import React from 'react';

const Sorting = ({numberOfReviews}) => {

  return (
    <div>
      <h4>{numberOfReviews.length} reviews, sorted by
        <ul>
          <li>relevance</li>
          <li>newest</li>
          <li>helpful</li>
        </ul>
      </h4>
    </div>
  );
};

export default Sorting;