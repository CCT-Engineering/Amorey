import React from 'react';

const renderCharacteristic = (item, index) => {
  return (
    <div key={index}>
      <div>{item}</div>
      <div>*graph*</div>
      <div>*conditional rating fields*</div>
    </div>
  );
};

const ProductBreakdown = ({characteristics}) => {

  return (
    <div>
      {Object.keys(characteristics).map((item, index) => renderCharacteristic(item, index))}
    </div>
  );
};

export default ProductBreakdown;