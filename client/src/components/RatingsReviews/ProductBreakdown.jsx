import React from 'react';

const renderCharacteristic = (characteristics) => {
  Object.keys(characteristics).map((key, index) => {
    return <div>{key}</div>
  })
};

const ProductBreakdown = ({characteristics}) => {
  // console.log(characteristics)
  return (
    <div>
      {renderCharacteristic(characteristics)}
    </div>
  );
};

export default ProductBreakdown;