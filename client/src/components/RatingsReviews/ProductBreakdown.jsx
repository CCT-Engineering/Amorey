import React from 'react';
import characteristic from '../../util/characteristics.js';
import local from '../../styles/RatingsReviews/ProductBreakdown.css';

const renderRatings = (item) => {
  const dividers = characteristic[item][3] === 'Perfect';
  return (
    <>
      <div className={local.ratingName}>{characteristic[item][1]}</div>
      {dividers && <div className={local.ratingName}>{characteristic[item][3]}</div>}
      <div className={local.ratingName}>{characteristic[item][5]}</div>
    </>
  );
};

const renderDetail = (item, index, detail) => {
  const dividers = characteristic[item][3] === 'Perfect';
  return (
    <div key={index}>
      <div className={local.characteristic}>{item}</div>
      <div className={local.barDimensions}>
        <div className={local.barMarker} style={{ left: dividers ? `${33}%` : `${20}%` }}>|</div>
        <div className={local.barDisplay} style={{ left: `${Number(detail.value) * 20}%` }}>▼</div>
        <div className={local.barMarker} style={{ left: dividers ? `${66}%` : `${80}%` }}>|</div>
      </div>
      <div className={local.ratings}>{renderRatings(item)}</div>
    </div>
  );
};

const ProductBreakdown = ({ details }) => {
  return (
    <div className={local.main}>
      {Object.keys(details).map((item, index) => renderDetail(item, index, details[item]))}
    </div>
  );
};

export default ProductBreakdown;
