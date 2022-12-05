import React from 'react';
import local from '../../styles/RatingsReviews.css';

function renderGraphRatings(item) {
  let string = '';
  if (item === 'Size') {
    string = 'A size too small     Perfect     A size too wide';
  } else if (item === 'Width') {
    string = 'Too narrow     Perfect     Too wide';
  } else if (item === 'Comfort') {
    string = 'Uncomfortable          Perfect';
  } else if (item === 'Quality') {
    string = 'Poor          Perfect';
  } else if (item === 'Length') {
    string = 'Runs Short     Perfect     Runs Long';
  } else if (item === 'Fit') {
    string = 'Runs tight     Perfect     Runs long';
  }
  return string;
}

function renderDetail(item, index, detail) {
  return (
    <div key={index}>
      <div className={local.characteristicName}>{item}</div>
      <div className={local.characteristicGraph}>
        {Number(detail.value).toFixed(1)}
        out of 5
      </div>
      <div className={local.characteristicDetail}>
        {renderGraphRatings(item)}
      </div>
    </div>
  );
}

function ProductBreakdown({ details }) {
  return (
    <div className={local.characteristicMain}>
      {Object.keys(details).map((item, index) => renderDetail(item, index, details[item]))}
    </div>
  );
}

export default ProductBreakdown;
