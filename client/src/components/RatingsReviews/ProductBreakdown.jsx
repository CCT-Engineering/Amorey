import React from 'react';
import local from '../../styles/RatingsReviews.css';

const renderDetail = (item, index, detail) => {
  return (
    <div key={index}>
      <div className={local.characteristicName}>{item}</div>
      <div className={local.characteristicGraph}>{
        Number(detail.value).toFixed(1)} out of 5
      </div>
      <div className={local.characteristicDetail}>
        {renderGraphRatings(item)}
      </div>
    </div>
  );
};

const renderGraphRatings = (item) => {
  if (item === 'Size') {
    return 'A size too small     Perfect     A size too wide';
  } else if (item === 'Width') {
    return 'Too narrow     Perfect     Too wide';
  } else if (item === 'Comfort') {
    return 'Uncomfortable          Perfect';
  } else if (item === 'Quality') {
    return 'Poor          Perfect';
  } else if (item === 'Length') {
    return 'Runs Short     Perfect     Runs Long';
  } else if (item === 'Fit') {
    return 'Runs tight     Perfect     Runs long';
  }
};

// const renderGraphRatings = (item) => {
//   return item === 'Size' ? 'A size too small     Perfect     A size too wide' : item === 'Width' ? 'Too narrow     Perfect     Too wide' : item === 'Comfort' ? 'Uncomfortable          Perfect' : item === 'Quality' ? 'Poor          Perfect' : item === 'Length' ? 'Runs short     Perfect     Runs long' : item === 'Fit' ? 'Runs tight     Perfect     Runs loose' : '';
// };

const ProductBreakdown = ({details}) => {
  return (
    <div className={local.characteristicMain}>
      {Object.keys(details).map((item, index) => renderDetail(item, index, details[item]))}
    </div>
  );
};

export default ProductBreakdown;