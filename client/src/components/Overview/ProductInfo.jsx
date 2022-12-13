import React, { useState, useEffect, forwardRef } from 'react';
import local from '../../styles/Overview/ProductInfo.css';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress } from '../../util';

const ProductInfo = forwardRef(({
  current, price, origPrice, onSale, stars, setFavorites, currentStyles, favorites, reviewsQty,
}, ref) => {
  const [currentIsFav, setCurrentIsFav] = useState(false);
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

  const isCurrentFav = (favs) => {
    let favAlreadyInFavs = false;
    favs.forEach((fav) => {
      if (fav.id === current.id) {
        favAlreadyInFavs = true;
      }
    });
    return favAlreadyInFavs;
  };

  useEffect(() => {
    setCurrentIsFav(isCurrentFav(favorites));
  }, [current, favorites]);

  const addToOutfit = () => {
    setFavorites((prevFavs) => {
      const favAlreadyInFavs = isCurrentFav(prevFavs);
      return favAlreadyInFavs ? prevFavs : [...prevFavs,
        {
          id: current.id,
          name: current.name,
          category: current.category,
          default_price: current.default_price,
          pic: currentStyles[0].photos[0].thumbnail_url,
          stars,
        }];
    });
  };

  const removeFromOutfit = () => {
    setFavorites((prevFavs) => {
      return prevFavs.filter((prevFav) => prevFav.id !== current.id);
    });
  };

  const addRemoveToOutfit = (e) => {
    e.preventDefault();
    const nothing = currentIsFav ? removeFromOutfit() : addToOutfit();
    setCurrentIsFav(!currentIsFav);
    return nothing;
  };

  return (
    <div className={local.productInfo}>
      {reviewsQty ? <StarDisplay stars={stars} /> : ''}
      <div
        role="button"
        tabIndex={0}
        className={local.reviewsLink}
        onClick={scrollToReviews}
        onKeyPress={buildHandleEnterKeyPress(scrollToReviews)}
      >
        {`Read All ${reviewsQty} Reviews`}
      </div>
      <h5>{current.category}</h5>
      <div className={local.productName}>
        <h2>{current.name}</h2>
        <button
          type="button"
          aria-label="add or remove to outfit"
          className={currentIsFav ? local.addToOutfitFav : local.addToOutfit}
          onClick={addRemoveToOutfit}
          onKeyPress={buildHandleEnterKeyPress(addRemoveToOutfit)}
        />
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
