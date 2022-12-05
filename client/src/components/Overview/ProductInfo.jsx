import React from 'react';
import local from '../../styles/Overview.css';

const ProductInfo = ({current, price, origPrice, onSale}) => {

  const priceStyle = {
    color: `${onSale ? 'red' : 'inherit'}`
  }

  return (
    <div className={local.productInfo}>
      <h6>{current.category}</h6>
      <h2>{current.name}</h2>
      <h6>
        <span style={priceStyle}>${price} </span>
        <span className={local.oldPrice}>{onSale ? `$${origPrice}` : ''}</span>
      </h6>
    </div>
  )
}

export default ProductInfo;