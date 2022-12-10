import React, { forwardRef } from 'react';
import local from '../../styles/Overview/ProductInfo.css';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress } from '../../util';

const ProductInfo = forwardRef(({
  current, price, origPrice, onSale, stars, setFavorites, currentStyles,
}, ref) => {
  const priceStyle = {
    color: `${onSale ? 'red' : 'inherit'}`,
  };

  const scrollToReviews = (e) => {
    e.preventDefault();
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const addToOutfit = (e) => {
    e.preventDefault();
    const newFav = {
      id: current.id,
      name: current.name,
      category: current.category,
      default_price: current.default_price,
      pic: currentStyles[0].photos[0].thumbnail_url,
      stars,
    };
    setFavorites((prevFavs) => [...prevFavs, newFav]);
  };

  return (
    <div className={local.productInfo}>
      <StarDisplay stars={stars} />
      <div
        role="button"
        tabIndex={0}
        className={local.reviewsLink}
        onClick={scrollToReviews}
        onKeyPress={buildHandleEnterKeyPress(scrollToReviews)}
      >
        Read All Reviews
      </div>
      <h5>{current.category}</h5>
      <div className={local.productName}>
        <h2>{current.name}</h2>
        <button
          type="button"
          className={local.addToOutfit}
          onClick={addToOutfit}
          onKeyPress={buildHandleEnterKeyPress(addToOutfit)}
        >
          ♡
        </button>
      </div>
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
