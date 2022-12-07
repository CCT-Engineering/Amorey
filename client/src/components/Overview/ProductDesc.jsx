import React from 'react';
import local from '../../styles/Overview/ProductDesc.css';

function ProductDesc({ current }) {
  return (
    <div className={local.productDesc}>
      <div className={local.sloganDesc}>
        <h4>{current.slogan}</h4>
        <p className={local.desc}>{current.description}</p>
      </div>
    </div>
  );
}

export default ProductDesc;
