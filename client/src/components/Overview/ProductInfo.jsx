import React, { forwardRef } from 'react';
import local from '../../styles/Overview/ProductInfo.css';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress } from '../../util';

const ProductInfo = forwardRef(({
  current, price, origPrice, onSale, stars,
}, ref) => {
  const priceStyle = {
    color: `${onSale ? 'red' : 'inherit'}`,
  };

  const handleClick = (e) => {
    e.preventDefault();
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  return (
    <div className={local.productInfo}>
      <StarDisplay stars={stars} />
      <div
        role="button"
        tabIndex={0}
        className={local.reviewsLink}
        onClick={handleClick}
        onKeyPress={buildHandleEnterKeyPress(handleClick)}
      >
        Read All Reviews
      </div>
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
});

export default ProductInfo;
