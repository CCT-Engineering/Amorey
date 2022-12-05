import React from 'react';
import local from '../../styles/RatingsReviews/ProductBreakdown.css';

const renderGraphRatings = (item) => {
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
};

const renderDetail = (item, index, detail) => {
  console.log(Number(detail.value).toFixed(1));
  return (
    <div key={index}>
      <div className={local.characteristic}>{item}</div>
      {/* <div className={local.characteristicGraph}>
        {Number(detail.value).toFixed(1)}
        out of 5
      </div> */}
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
  return (
    <div className={local.main}>
      {Object.keys(details).map((item, index) => renderDetail(item, index, details[item]))}
    </div>
  );
};

export default ProductBreakdown;
