import React from 'react';
import characteristic from '../../util/characteristics.js';
import local from '../../styles/RatingsReviews/ProductBreakdown.css';

const renderGraphRatings = (item) => {
  return (
    <>
      <div>{characteristic[item][1]}</div>
      <div>{characteristic[item][3]}</div>
      <div>{characteristic[item][5]}</div>
    </>
  );
};

const renderDetail = (item, index, detail) => {
  return (
    <div key={index}>
      <div className={local.characteristic}>{item}</div>
      <div className={local.graph}>
        <div className={local.barDimensions}>
          <div className={local.barDisplay} style={{ width: `${Number(detail.value) * 20}%` }} />
        </div>
      </div>
      <div className={local.ratings}>
        {renderGraphRatings(item)}
      </div>
    </div>
  );
};

const ProductBreakdown = ({ details }) => {
  console.log(details);
  return (
    <div className={local.main}>
      {Object.keys(details).map((item, index) => renderDetail(item, index, details[item]))}
    </div>
  );
};

export default ProductBreakdown;
