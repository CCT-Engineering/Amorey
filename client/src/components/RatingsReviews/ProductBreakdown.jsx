import React from 'react';

const renderDetail = (item, index, detail) => {
  return (
    <div key={index}>
      <div>{item}</div>
      <div>{Number(detail.value).toFixed(1)} out of 5</div>
      <div>{renderGraphRatings(item)}</div>
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

const ProductBreakdown = ({details}) => {
  return (
    <div style={{backgroundColor: 'indianred'}}>
      {Object.keys(details).map((item, index) => renderDetail(item, index, details[item]))}
    </div>
  );
};

export default ProductBreakdown;