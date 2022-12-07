import React from 'react';
import local from '../../styles/Overview/ProductInfo.css';

function ProductInfo({
  current, price, origPrice, onSale,
}) {
  const priceStyle = {
    color: `${onSale ? 'red' : 'inherit'}`,
  };

  return (
    <div className={local.productInfo}>
      <h5>{current.category}</h5>
      <h2>{current.name}</h2>
      <h6>
        <span style={priceStyle}>
          $
          {price}
          &nbsp;
        </span>
        <span className={local.oldPrice}>{onSale ? `$${origPrice}` : ''}</span>
      </h6>
    </div>
  );
}

export default ProductInfo;
