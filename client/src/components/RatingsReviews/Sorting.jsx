import React from 'react';

const Sorting = ({numberOfReviews}) => {
  // numberOfReviews ? console.log(numberOfReviews) : console.log('none');
  return (
    <div>
      <h4>{numberOfReviews ? numberOfReviews.length : 0} reviews, sorted by
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