import React from 'react';

const renderCharacteristic = (key, index, characteristics) => {
  console.log('here');
  return <div>Test</div>;
};

const ProductBreakdown = ({characteristics}) => {

  return (
    <div>
      {Object.keys(characteristics).map((key, index) => {
        renderCharacteristic(key, index, characteristics)
      })}
    </div>
  );
};

export default ProductBreakdown;