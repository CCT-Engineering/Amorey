import React, { useState, useEffect, forwardRef } from 'react';
import local from '../../styles/Overview/ProductInfo.css';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress } from '../../util';

const ProductInfo = forwardRef(({
  current, price, origPrice, onSale, stars, setFavorites, currentStyles, favorites,
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

  const heartStyle = {
    // content: '&#x2665',
    content: 'O',
    background: 'FireBrick',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebKitTextStroke: '1px #444',
  };

  const isCurrentFav = (favs) => {
    let favAlreadyInFavs = false;
    favs.forEach((fav) => {
      // console.log('current.id:', current.id, 'fav.id', fav.id);
      if (fav.id === current.id) {
        favAlreadyInFavs = true;
      }
    });
    // console.log('favAlreadyInFavs:', favAlreadyInFavs)
    return favAlreadyInFavs;
  };

  // isCurrentFav(favorites);

  useEffect(() => {
    console.log('isCurrentFav(favorites):', isCurrentFav(favorites))
    let newState = isCurrentFav(favorites)
    setCurrentIsFav(newState);
    console.log('useEffect currentIsFav:', currentIsFav);
  }, [current]);

  const addToOutfit = (e) => {
    e.preventDefault();
    setCurrentIsFav(true);
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
          aria-label="add to your outfit"
          className={currentIsFav ? local.addToOutfitFav : local.addToOutfit}
          onClick={addToOutfit}
          onKeyPress={buildHandleEnterKeyPress(addToOutfit)}
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
