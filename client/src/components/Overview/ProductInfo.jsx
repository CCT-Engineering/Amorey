import React from 'react';
import local from '../../styles/Overview.css';

const ProductInfo = ({current}) => {

  return (
    <div className={local.productInfo}>
      <h6>{current.category}</h6>
      <h2>{current.name}</h2>
      <h6>${current.default_price}</h6>
    </div>
  )
}

export default ProductInfo;